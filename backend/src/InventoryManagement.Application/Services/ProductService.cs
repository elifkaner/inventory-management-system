using System.Linq;
using System.Text;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class ProductService : IProductService
{
    private const int CriticalStockThreshold = 500;

    private readonly IProductRepository _productRepository;

    private readonly IStockMovementRepository _stockMovementRepository;

    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IProductRepository productRepository,
     IStockMovementRepository stockMovementRepository,
     IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _stockMovementRepository = stockMovementRepository;
        _unitOfWork = unitOfWork;
    }

    // Arama ve kategori filtresine göre ürünleri listeler
    public async Task<List<ProductResponseDto>> GetAllProductsAsync(string? search = null, int? categoryId = null, int? page = null, int? pageSize = null)
    {
        var products = await _productRepository.GetAllAsync(search, categoryId, page, pageSize);

        return products.Select(ToResponseDto).ToList();
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

        return summary;
    }

    // Listeyi (arama/kategori filtresi uygulanmış haliyle) CSV olarak dışa aktarır
    public async Task<byte[]> ExportToCsvAsync(string? search = null, int? categoryId = null)
    {
        // Sayfalama parametresi kasıtlı olarak yok — export, ekranda görünen sayfayı değil,
        // arama/filtreyle eşleşen TÜM ürünleri içermeli.
        var products = await GetAllProductsAsync(search, categoryId);

        var csv = new StringBuilder();
        csv.AppendLine("Id,Ürün Adı,Barkod,Kategori,Tedarikçi,Alış Fiyatı,Satış Fiyatı,Stok,Durum");

        foreach (var p in products)
        {
            csv.AppendLine(string.Join(",",
                p.Id,
                CsvEscape(p.ProductName),
                CsvEscape(p.Barcode),
                CsvEscape(p.Category),
                CsvEscape(p.Supplier),
                p.PurchasePrice.ToString(System.Globalization.CultureInfo.InvariantCulture),
                p.SalePrice.ToString(System.Globalization.CultureInfo.InvariantCulture),
                p.StockQuantity,
                p.IsActive ? "Aktif" : "Pasif"));
        }

        // Excel'in Türkçe karakterleri doğru göstermesi için UTF-8 BOM ekleniyor
        var preamble = Encoding.UTF8.GetPreamble();
        var body = Encoding.UTF8.GetBytes(csv.ToString());

        return preamble.Concat(body).ToArray();
    }

    private static readonly char[] FormulaTriggerChars = { '=', '+', '-', '@' };

    private static string CsvEscape(string value)
    {
        // Excel'de "=", "+", "-", "@" ile başlayan hücreler formül olarak çalıştırılabilir
        // (CSV/Formula Injection). Başına apostrof koyarak düz metin olmaya zorluyoruz.
        if (value.Length > 0 && FormulaTriggerChars.Contains(value[0]))
        {
            value = "'" + value;
        }

        if (value.Contains(',') || value.Contains('"') || value.Contains('\n'))
        {
            return "\"" + value.Replace("\"", "\"\"") + "\"";
        }

        return value;
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
            StockQuantity = p.StockQuantity,
            BrandName = p.BrandName,
            Model = p.Model,
            IsActive = p.IsActive,
            Supplier = p.Supplier != null ? p.Supplier.CompanyName : "",
            Category = p.Category != null ? p.Category.Name : "",
            Location = p.Location != null ? $"{p.Location.Corridor}-{p.Location.Shelf}-{p.Location.Section}" : ""
        };
    }
}
