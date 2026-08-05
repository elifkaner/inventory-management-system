using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IReportRepository
{
    Task<List<CategoryDistributionDto>> GetCategoryDistributionAsync();

    Task<List<MonthlyMovementDto>> GetMonthlyMovementTrendAsync(int monthsBack = 6);

    Task<List<TopMovedProductDto>> GetTopMovedProductsAsync(int topN = 10);

    Task<List<SupplierDistributionDto>> GetSupplierDistributionAsync();

}