using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.DTOs;

namespace InventoryManagement.Application.Interfaces.Services;
public interface IReportService
{
    Task<List<CategoryDistributionDto>> GetCategoryDistributionAsync();

    Task<List<MonthlyMovementDto>> GetMonthlyMovementTrendAsync(int monthsBack = 6);

    Task<List<TopMovedProductDto>> GetTopMovedProductsAsync(int topN = 10);

    Task<List<SupplierDistributionDto>> GetSupplierDistributionAsync();
}