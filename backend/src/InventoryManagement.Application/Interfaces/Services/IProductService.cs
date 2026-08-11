using InventoryManagement.Application.DTOs.Common;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IProductService
{
    Task<PagedResult<ProductResponseDto>> GetAllProductsAsync(string? search = null, int? categoryId = null, int? brandId = null, int? modelId = null, int? supplierId = null, bool? isActive = null, int? page = null, int? pageSize = null);

    Task<ProductResponseDto?> GetProductByIdAsync(int id);

    Task<ProductResponseDto?> GetProductByBarcodeAsync(string Barcode);

    Task<ProductResponseDto> CreateProductAsync(Product product);

    Task<ProductResponseDto?> UpdateProductAsync(int id, Product updatedProduct);

    Task<bool> DeleteProductAsync(int id);

    Task<DashboardSummaryDto> GetSummaryAsync(bool includeFinancials);

    Task<byte[]> ExportToCsvAsync(string? search = null, int? categoryId = null, int? brandId = null, int? modelId = null, int? supplierId = null, bool? isActive = null);
}
