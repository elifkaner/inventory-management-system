using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Services;
public class ReportService : IReportService
{
    private readonly IReportRepository _reportRepository;

    public ReportService(IReportRepository reportRepository)
    {
        _reportRepository = reportRepository;
    }
    public async Task<List<CategoryDistributionDto>> GetCategoryDistributionAsync()
    {
        var reports = await _reportRepository.GetCategoryDistributionAsync();
        int total = reports.Sum(x => x.TotalProduct);

        foreach( var report in reports)
        {
            report.Percentage = (decimal)report.TotalProduct / total *100;
        }
        return reports;

    }

    public async Task<List<MonthlyMovementDto>> GetMonthlyMovementTrendAsync(int monthsBack = 6)
    {
        return await _reportRepository.GetMonthlyMovementTrendAsync(monthsBack);
    }

    public async Task<List<TopMovedProductDto>> GetTopMovedProductsAsync(int topN = 10)
    {
        return await _reportRepository.GetTopMovedProductsAsync(topN);
    }

    public async Task<List<SupplierDistributionDto>> GetSupplierDistributionAsync()
    {
        var reports = await _reportRepository.GetSupplierDistributionAsync();
        int total = reports.Sum(x => x.TotalProduct);

        foreach (var report in reports)
        {
            report.Percentage = total > 0 ? (decimal)report.TotalProduct / total * 100 : 0;
        }

        return reports;
    }

}