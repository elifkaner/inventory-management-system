using InventoryManagement.Application.DTOs.AuditLog;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IAuditLogService
{
    Task<List<AuditLogResponseDto>> GetAllAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null);
}
