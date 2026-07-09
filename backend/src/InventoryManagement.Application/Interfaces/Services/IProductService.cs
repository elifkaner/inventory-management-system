using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IProductService
{
    Task<List<ProductResponseDto>> GetAllProductsAsync(string? search = null, int? categoryId = null);

    Task<ProductResponseDto?> GetProductByIdAsync(int id);

    Task<ProductResponseDto?> GetProductByBarcodeAsync(string Barcode);

    Task<ProductResponseDto> CreateProductAsync(Product product);

    Task<ProductResponseDto?> UpdateProductAsync(int id, Product updatedProduct);

    Task<bool> DeleteProductAsync(int id);

    Task<DashboardSummaryDto> GetSummaryAsync();

    Task<byte[]> ExportToCsvAsync(string? search = null, int? categoryId = null);
}
