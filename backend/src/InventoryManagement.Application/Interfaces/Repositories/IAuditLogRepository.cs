using InventoryManagement.Application.DTOs.Common;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IAuditLogRepository
{
    Task<PagedResult<AuditLog>> GetAllAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null, int? page = null, int? pageSize = null);
}
