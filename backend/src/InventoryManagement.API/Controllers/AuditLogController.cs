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

    // GET /api/AuditLog?entityName=Product&userId=9&fromDate=2026-07-01&toDate=2026-07-31
    [HttpGet]
    public async Task<IActionResult> GetAll(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var logs = await _auditLogService.GetAllAsync(entityName, userId, fromDate, toDate);
        return Ok(logs);
    }
}
