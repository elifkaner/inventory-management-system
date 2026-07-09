using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    // Tüm ürünleri getirir
    public async Task<List<ProductResponseDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetAllAsync();

        return products.Select(ToResponseDto).ToList();
    }

    // Id'ye göre ürün getirir
    public async Task<ProductResponseDto?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);

        return product == null ? null : ToResponseDto(product);
    }

    // Yeni ürün oluşturur
    public async Task<ProductResponseDto> CreateProductAsync(Product product)
    {
        var created = await _productRepository.AddAsync(product);

        return ToResponseDto(created);
    }

    // Ürün güncelleme
    public async Task<ProductResponseDto?> UpdateProductAsync(int id, Product updatedProduct)
    {
        var product = await _productRepository.UpdateAsync(id, updatedProduct);

        return product == null ? null : ToResponseDto(product);
    }

    // Ürün silme
    public Task<bool> DeleteProductAsync(int id)
    {
        return _productRepository.DeleteAsync(id);
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
            BrandId = p.BrandId,
            IsActive = p.IsActive,
            Supplier = p.Supplier != null ? p.Supplier.CompanyName : "",
            Category = p.Category != null ? p.Category.Name : ""
        };
    }
}
