using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AuditLogController : ControllerBase
{
    private readonly IAuditLogService _auditLogService;

    public AuditLogController(IAuditLogService auditLogService)
    {
        _auditLogService = auditLogService;
    }

    // GET /api/AuditLog?entityName=Product&userId=9&fromDate=2026-07-01&toDate=2026-07-31&page=1&pageSize=20
    [HttpGet]
    public async Task<IActionResult> GetAll(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null, [FromQuery] int? page = null, [FromQuery] int? pageSize = null)
    {
        var logs = await _auditLogService.GetAllAsync(entityName, userId, fromDate, toDate, page, pageSize);
        return Ok(logs);
    }

    // GET /api/AuditLog/export?entityName=Product&userId=9&fromDate=2026-07-01&toDate=2026-07-31
    [HttpGet("export")]
    public async Task<IActionResult> ExportLogs(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var csvBytes = await _auditLogService.ExportToCsvAsync(entityName, userId, fromDate, toDate);

        var fileName = $"sistem_gunlukleri_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv";

        return File(csvBytes, "text/csv", fileName);
    }
}
