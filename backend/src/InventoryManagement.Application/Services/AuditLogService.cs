using System.Text;
using InventoryManagement.Application.Common;
using InventoryManagement.Application.DTOs.AuditLog;
using InventoryManagement.Application.DTOs.Common;
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

    public async Task<PagedResult<AuditLogResponseDto>> GetAllAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null, int? page = null, int? pageSize = null)
    {
        var result = await _auditLogRepository.GetAllAsync(entityName, userId, fromDate, toDate, page, pageSize);

        return new PagedResult<AuditLogResponseDto>
        {
            Items = result.Items.Select(ToDto).ToList(),
            TotalRecord = result.TotalRecord,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
    }

    public async Task<byte[]> ExportToCsvAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var result = await GetAllAsync(entityName, userId, fromDate, toDate);
        var logs = result.Items;

        var csv = new StringBuilder();
        csv.AppendLine("Id,Kullanıcı,Rol,Aksiyon,Varlık,Varlık Id,Değişen Kolonlar,Tarih,IP Adresi");

        foreach (var log in logs)
        {
            csv.AppendLine(string.Join(",",
                log.Id,
                CsvHelper.Escape(log.UserName),
                CsvHelper.Escape(log.UserRole),
                CsvHelper.Escape(log.Action),
                CsvHelper.Escape(log.EntityName),
                CsvHelper.Escape(log.EntityId),
                CsvHelper.Escape(log.ChangedColumns),
                log.Timestamp.ToString("yyyy-MM-dd HH:mm"),
                CsvHelper.Escape(log.IpAddress ?? "")));
        }

        return CsvHelper.ToUtf8Bytes(csv.ToString());
    }

    private static AuditLogResponseDto ToDto(AuditLog log) => new()
    {
        Id = log.Id,
        UserId = log.UserId,
        UserName = log.UserName,
        UserRole = log.UserRole,
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
