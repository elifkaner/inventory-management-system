using InventoryManagement.Application.Common;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    // GET /api/Reports/category-distribution
    [HttpGet("category-distribution")]
    public async Task<IActionResult> GetCategoryDistribution()
    {
        var reports = await _reportService.GetCategoryDistributionAsync();
        return Ok(reports);
    }

    // GET /api/Reports/monthly-movement-trend?monthsBack=6
    [HttpGet("monthly-movement-trend")]
    public async Task<IActionResult> GetMonthlyMovementTrend([FromQuery] int monthsBack = 6)
    {
        if (!PaginationHelper.TryValidateMonthsBack(monthsBack, out var validMonthsBack, out var monthsBackError))
        {
            return BadRequest(monthsBackError);
        }

        var trend = await _reportService.GetMonthlyMovementTrendAsync(validMonthsBack);
        return Ok(trend);
    }

    // GET /api/Reports/top-moved-products?topN=10
    [HttpGet("top-moved-products")]
    public async Task<IActionResult> GetTopMovedProducts([FromQuery] int topN = 10)
    {
        if (!PaginationHelper.TryValidateTopN(topN, out var validTopN, out var topNError))
        {
            return BadRequest(topNError);
        }

        var products = await _reportService.GetTopMovedProductsAsync(validTopN);
        return Ok(products);
    }

    // GET /api/Reports/supplier-distribution
    [HttpGet("supplier-distribution")]
    public async Task<IActionResult> GetSupplierDistribution()
    {
        var suppliers = await _reportService.GetSupplierDistributionAsync();
        return Ok(suppliers);
    }
}