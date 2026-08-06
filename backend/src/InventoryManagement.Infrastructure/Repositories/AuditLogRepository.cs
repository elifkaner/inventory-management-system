using InventoryManagement.Application.DTOs.Common;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class AuditLogRepository : IAuditLogRepository
{
    private readonly AppDbContext _context;

    public AuditLogRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<AuditLog>> GetAllAsync(string? entityName = null, int? userId = null, DateTime? fromDate = null, DateTime? toDate = null, int? page = null, int? pageSize = null)
    {
        var query = _context.AuditLogs.AsQueryable();

        if (!string.IsNullOrWhiteSpace(entityName))
        {
            query = query.Where(a => a.EntityName == entityName);
        }

        if (userId.HasValue)
        {
            query = query.Where(a => a.UserId == userId.Value);
        }

        if (fromDate.HasValue)
        {
            // Query string'den bağlanan DateTime, Kind=Unspecified geliyor; "timestamp with time zone"
            // kolonuyla karşılaştırabilmek için Npgsql'in UTC olarak işaretlenmesini şart koşuyor.
            var fromDateUtc = DateTime.SpecifyKind(fromDate.Value, DateTimeKind.Utc);
            query = query.Where(a => a.Timestamp >= fromDateUtc);
        }

        if (toDate.HasValue)
        {
            var toDateUtc = DateTime.SpecifyKind(toDate.Value, DateTimeKind.Utc);
            query = query.Where(a => a.Timestamp <= toDateUtc);
        }

        query = query.OrderByDescending(a => a.Timestamp);

        var totalRecord = await query.CountAsync();

        if (page.HasValue && pageSize.HasValue)
        {
            query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);
        }

        var items = await query.ToListAsync();

        return new PagedResult<AuditLog>
        {
            Items = items,
            TotalRecord = totalRecord,
            PageNumber = page ?? 1,
            PageSize = pageSize ?? totalRecord
        };
    }
}
