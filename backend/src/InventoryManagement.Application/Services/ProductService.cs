using System.Linq;
using System.Text;
using InventoryManagement.Application.Common;
using InventoryManagement.Application.DTOs.Common;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace InventoryManagement.Application.Services;

public class ProductService : IProductService
{
    private const int CriticalStockThreshold = 500;

    private static readonly TimeSpan SummaryCacheDuration = TimeSpan.FromMinutes(2);

    private readonly IProductRepository _productRepository;

    private readonly IStockMovementRepository _stockMovementRepository;

    private readonly IUnitOfWork _unitOfWork;

    private readonly IMemoryCache _cache;

    public ProductService(IProductRepository productRepository,
     IStockMovementRepository stockMovementRepository,
     IUnitOfWork unitOfWork,
     IMemoryCache cache)
    {
        _productRepository = productRepository;
        _stockMovementRepository = stockMovementRepository;
        _unitOfWork = unitOfWork;
        _cache = cache;
    }

    // Arama ve kategori filtresine göre ürünleri listeler
    public async Task<PagedResult<ProductResponseDto>> GetAllProductsAsync(string? search = null, int? categoryId = null, int? page = null, int? pageSize = null)
    {
        var result = await _productRepository.GetAllAsync(search, categoryId, page, pageSize);

        return new PagedResult<ProductResponseDto>
        {
            Items = result.Items.Select(ToResponseDto).ToList(),
            TotalRecord = result.TotalRecord,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
    }

    // Id'ye göre ürün getirir
    public async Task<ProductResponseDto?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);

        return product == null ? null : ToResponseDto(product);
    }

    public async Task<ProductResponseDto?> GetProductByBarcodeAsync(string Barcode)
    {
        var product = await _productRepository.GetByBarcodeAsync(Barcode);

        return product == null ? null: ToResponseDto(product);
    }

    // Yeni ürün oluşturur
    public async Task<ProductResponseDto> CreateProductAsync(Product product)
    {
        await _unitOfWork.BeginTransactionAsync();
        try
        {
             
        var created = await _productRepository.AddAsync(product);

        if (created.StockQuantity > 0)
        {
            var stock = new StockMovement {
                    ProductId = product.Id,
                    TransactionType = "IN",
                    Quantity = product.StockQuantity,
                    Description = "İlk stok girişi",
                    CreatedAt = DateTime.UtcNow
            };
            await _stockMovementRepository.AddAsync(stock);
        }
        await _unitOfWork.CommitAsync();
        return ToResponseDto(created);
    }
    catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }

    }

    // Ürün güncelleme. Stok miktarına burada dokunulmaz — sadece StockMovement üzerinden değişir,
    // aksi halde stok geçmişiyle (audit) senkronu bozan bir "arka kapı" olurdu.
    public async Task<ProductResponseDto?> UpdateProductAsync(int id, Product updatedProduct)
    {
        var existingProduct = await _productRepository.GetByIdAsync(id);

        if (existingProduct == null)
        {
            return null;
        }

        updatedProduct.StockQuantity = existingProduct.StockQuantity;

        var product = await _productRepository.UpdateAsync(id, updatedProduct);

        return product == null ? null : ToResponseDto(product);
    }

    // Ürün silme
    public Task<bool> DeleteProductAsync(int id)
    {
        return _productRepository.DeleteAsync(id);
    }

    // Dashboard'daki özet KPI kartlarının verilerini hesaplar.
    // includeFinancials: sadece Admin rolü için true gelir; false ise parasal alanlar null kalır.
    public async Task<DashboardSummaryDto> GetSummaryAsync(bool includeFinancials)
    {
        var cacheKey = $"product-summary-{includeFinancials}";

        if (_cache.TryGetValue(cacheKey, out DashboardSummaryDto? cachedSummary) && cachedSummary != null)
        {
            return cachedSummary;
        }

        var stats = await _productRepository.GetSummaryStatsAsync(CriticalStockThreshold);

        var activeSalesRate = stats.TotalProducts > 0
            ? Math.Round((double)stats.ActiveProductCount / stats.TotalProducts * 100, 1)
            : 0;

        var summary = new DashboardSummaryDto
        {
            TotalProducts = stats.TotalProducts,
            CriticalStockCount = stats.CriticalStockCount,
            ActiveSalesRate = activeSalesRate
        };

        if (includeFinancials)
        {
            summary.TotalInventoryValue = stats.TotalInventoryValue;
            summary.TotalProfitMargin = stats.TotalProfitMargin;
        }

        _cache.Set(cacheKey, summary, SummaryCacheDuration);

        return summary;
    }

    // Listeyi (arama/kategori filtresi uygulanmış haliyle) CSV olarak dışa aktarır
    public async Task<byte[]> ExportToCsvAsync(string? search = null, int? categoryId = null)
    {
        // Sayfalama parametresi kasıtlı olarak yok — export, ekranda görünen sayfayı değil,
        // arama/filtreyle eşleşen TÜM ürünleri içermeli.
        var results = await GetAllProductsAsync(search, categoryId);
        var products = results.Items;

        var csv = new StringBuilder();
        csv.AppendLine("Id,Ürün Adı,Barkod,Kategori,Tedarikçi,Alış Fiyatı,Satış Fiyatı,Stok,Durum");

        foreach (var p in products)
        {
            csv.AppendLine(string.Join(",",
                p.Id,
                CsvHelper.Escape(p.ProductName),
                CsvHelper.Escape(p.Barcode),
                CsvHelper.Escape(p.Category),
                CsvHelper.Escape(p.Supplier),
                p.PurchasePrice.ToString(System.Globalization.CultureInfo.InvariantCulture),
                p.SalePrice.ToString(System.Globalization.CultureInfo.InvariantCulture),
                p.StockQuantity,
                p.IsActive ? "Aktif" : "Pasif"));
        }

        return CsvHelper.ToUtf8Bytes(csv.ToString());
    }

    private static ProductResponseDto ToResponseDto(Product p)
    {
        return new ProductResponseDto
        {
            Id = p.Id,
            ProductName = p.ProductName,
            PurchasePrice = p.PurchasePrice,
            SalePrice = p.SalePrice,
            Barcode = p.Barcode,
            SkuCode = p.SkuCode,
            StockQuantity = p.StockQuantity,
            BrandName = p.Brand != null ? p.Brand.Name : "",
            ModelName = p.Model != null ? p.Model.Name : "",
            IsActive = p.IsActive,
            Supplier = p.Supplier != null ? p.Supplier.CompanyName : "",
            Category = p.Category != null ? p.Category.Name : "",
            Location = p.Location != null ? $"{p.Location.Corridor}-{p.Location.Shelf}-{p.Location.Section}" : ""
        };
    }
}
