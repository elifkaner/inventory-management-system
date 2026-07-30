using InventoryManagement.Application.DTOs.AuditLog;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class AuditLogService : IAuditLogService
{
    private readonly IAuditLogRepository _auditLogRepository;

    public AuditLogService(IAuditLogRepository auditLogRepository)
    {
        _auditLogRepository = auditLogRepository;
    }

    public async Task<List<AuditLogResponseDto>> GetAllAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var logs = await _auditLogRepository.GetAllAsync(entityName, userId, fromDate, toDate);
        return logs.Select(ToDto).ToList();
    }

    private static AuditLogResponseDto ToDto(AuditLog log) => new()
    {
        Id = log.Id,
        UserId = log.UserId,
        UserName = log.UserName,
        Action = log.Action,
        EntityName = log.EntityName,
        EntityId = log.EntityId,
        OldValues = log.OldValues,
        NewValues = log.NewValues,
        ChangedColumns = log.ChangedColumns,
        Timestamp = log.Timestamp,
        IpAddress = log.IpAddress,
        UserAgent = log.UserAgent,
        RequestId = log.RequestId
    };
}
