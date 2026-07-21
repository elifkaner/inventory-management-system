using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public record ProductSummaryStats(
    int TotalProducts,
    int CriticalStockCount,
    decimal TotalInventoryValue,
    decimal TotalProfitMargin,
    int ActiveProductCount);

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync(string? search = null, int? categoryId = null, int? page = null, int? pageSize = null);

    Task<Product?> GetByIdAsync(int id);

    Task<Product?> GetByBarcodeAsync(string Barcode);

    Task<Product> AddAsync(Product product);

    Task<Product?> UpdateAsync(int id, Product updatedProduct);

    Task<bool> DeleteAsync(int id);

    Task<ProductSummaryStats> GetSummaryStatsAsync(int criticalStockThreshold);
}
