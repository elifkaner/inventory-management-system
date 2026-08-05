using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Application.Interfaces.Repositories;
using Microsoft.Extensions.Caching.Memory;

namespace InventoryManagement.Application.Services;
public class ReportService : IReportService
{
    private static readonly TimeSpan ReportCacheDuration = TimeSpan.FromMinutes(10);

    private readonly IReportRepository _reportRepository;
    private readonly IMemoryCache _cache;

    public ReportService(IReportRepository reportRepository, IMemoryCache cache)
    {
        _reportRepository = reportRepository;
        _cache = cache;
    }
    public async Task<List<CategoryDistributionDto>> GetCategoryDistributionAsync()
    {
        const string cacheKey = "report-category-distribution";

        if (_cache.TryGetValue(cacheKey, out List<CategoryDistributionDto>? cached) && cached != null)
        {
            return cached;
        }

        var reports = await _reportRepository.GetCategoryDistributionAsync();
        int total = reports.Sum(x => x.TotalProduct);

        foreach( var report in reports)
        {
            report.Percentage = (decimal)report.TotalProduct / total *100;
        }

        _cache.Set(cacheKey, reports, ReportCacheDuration);

        return reports;
    }

    public async Task<List<MonthlyMovementDto>> GetMonthlyMovementTrendAsync(int monthsBack = 6)
    {
        var cacheKey = $"report-monthly-movement-trend-{monthsBack}";

        if (_cache.TryGetValue(cacheKey, out List<MonthlyMovementDto>? cached) && cached != null)
        {
            return cached;
        }

        var trend = await _reportRepository.GetMonthlyMovementTrendAsync(monthsBack);

        _cache.Set(cacheKey, trend, ReportCacheDuration);

        return trend;
    }

    public async Task<List<TopMovedProductDto>> GetTopMovedProductsAsync(int topN = 10)
    {
        var cacheKey = $"report-top-moved-products-{topN}";

        if (_cache.TryGetValue(cacheKey, out List<TopMovedProductDto>? cached) && cached != null)
        {
            return cached;
        }

        var products = await _reportRepository.GetTopMovedProductsAsync(topN);

        _cache.Set(cacheKey, products, ReportCacheDuration);

        return products;
    }

    public async Task<List<SupplierDistributionDto>> GetSupplierDistributionAsync()
    {
        const string cacheKey = "report-supplier-distribution";

        if (_cache.TryGetValue(cacheKey, out List<SupplierDistributionDto>? cached) && cached != null)
        {
            return cached;
        }

        var reports = await _reportRepository.GetSupplierDistributionAsync();
        int total = reports.Sum(x => x.TotalProduct);

        foreach (var report in reports)
        {
            report.Percentage = total > 0 ? (decimal)report.TotalProduct / total * 100 : 0;
        }

        _cache.Set(cacheKey, reports, ReportCacheDuration);

        return reports;
    }

}
