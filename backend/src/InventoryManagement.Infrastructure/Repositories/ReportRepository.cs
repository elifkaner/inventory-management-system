using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Infrastructure.Persistence;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.DTOs.Category;
using Microsoft.EntityFrameworkCore;


namespace InventoryManagement.Infrastructure.Repositories;

public class ReportRepository :IReportRepository
{
    private readonly AppDbContext _context;
    public ReportRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryDistributionDto>> GetCategoryDistributionAsync()
    {
        var report = await _context.Products
        .AsNoTracking()
        .Where(x=>x.IsActive)
        .GroupBy(x => new {x.CategoryId, x.Category!.Name})
        .Select(x=> new CategoryDistributionDto {
            CategoryId = x.Key.CategoryId,
            CategoryName = x.Key.Name,
            TotalProduct = x.Count()
        })
        .ToListAsync();

        return report;
    }

    public async Task<List<MonthlyMovementDto>> GetMonthlyMovementTrendAsync(int monthsBack = 6)
    {
        var cutoffDate = DateTime.UtcNow.AddMonths(-monthsBack);

        var report = await _context.StockMovements
        .AsNoTracking()
        .Where(x => x.CreatedAt >= cutoffDate)
        .GroupBy(x => new { x.CreatedAt.Year, x.CreatedAt.Month })
        .Select(g => new MonthlyMovementDto
        {
            Year = g.Key.Year,
            Month = g.Key.Month,
            TotalIn = g.Where(x => x.TransactionType == "IN").Sum(x => x.Quantity),
            TotalOut = g.Where(x => x.TransactionType == "OUT").Sum(x => x.Quantity)
        })
        .OrderBy(x => x.Year)
        .ThenBy(x => x.Month)
        .ToListAsync();

        return report;
    }

    public async Task<List<TopMovedProductDto>> GetTopMovedProductsAsync(int topN = 10)
    {
        var report = await _context.StockMovements
        .AsNoTracking()
        .GroupBy(x => new { x.ProductId, x.Product!.ProductName })
        .Select(g => new TopMovedProductDto
        {
            ProductId = g.Key.ProductId,
            ProductName = g.Key.ProductName,
            TotalMovementCount = g.Count(),
            TotalQuantityMoved = g.Sum(x => x.Quantity)
        })
        .OrderByDescending(x => x.TotalQuantityMoved)
        .Take(topN)
        .ToListAsync();

        return report;
    }

    public async Task<List<SupplierDistributionDto>> GetSupplierDistributionAsync()
    {
        var report = await _context.Products
        .AsNoTracking()
        .Where(x => x.IsActive)
        .GroupBy(x => new { x.SupplierId, x.Supplier!.CompanyName })
        .Select(g => new SupplierDistributionDto
        {
            SupplierId = g.Key.SupplierId,
            SupplierName = g.Key.CompanyName,
            TotalProduct = g.Count()
        })
        .ToListAsync();

        return report;
    }
}
