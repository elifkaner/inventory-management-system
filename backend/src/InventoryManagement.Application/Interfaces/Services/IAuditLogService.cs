using InventoryManagement.Application.DTOs.AuditLog;
using InventoryManagement.Application.DTOs.Common;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IAuditLogService
{
    Task<PagedResult<AuditLogResponseDto>> GetAllAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null, int? page = null, int? pageSize = null);
}
