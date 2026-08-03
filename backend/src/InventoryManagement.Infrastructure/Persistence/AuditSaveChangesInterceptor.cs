using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace InventoryManagement.Infrastructure.Persistence;

public class AuditSaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUser;

    public AuditSaveChangesInterceptor(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        var context = eventData.Context;

        if (context != null)
        {
            var auditEntries = new List<AuditLog>();

            foreach (var entry in context.ChangeTracker.Entries())
            {
                if (entry.Entity is AuditLog) continue;

                if (entry.State is not (EntityState.Added or EntityState.Modified or EntityState.Deleted))
                {
                    continue;
                }

                var entityName = entry.Entity.GetType().Name;
                var pk = entry.Properties.FirstOrDefault(x => x.Metadata.IsPrimaryKey());
                var entityId = pk?.CurrentValue?.ToString() ?? "?";

                var log = new AuditLog
                {
                    UserId = _currentUser.UserId,
                    UserName = _currentUser.UserName,
                    IpAddress = _currentUser.IpAddress,
                    UserAgent = _currentUser.UserAgent,
                    RequestId = _currentUser.RequestId,
                    Timestamp = DateTime.UtcNow,
                    EntityName = entityName,
                    EntityId = entityId,
                    Action = entry.State switch
                    {
                        EntityState.Added => "Create",
                        EntityState.Modified => "Update",
                        EntityState.Deleted => "Delete",
                        _ => "Unknown"
                    }
                };

                if (entry.State == EntityState.Added)
                {
                    var yenidegerler = new Dictionary<string, object?>();

                    foreach (var prop in entry.Properties)
                    {
                        yenidegerler[prop.Metadata.Name] = prop.CurrentValue;
                    }
                    log.NewValues = System.Text.Json.JsonSerializer.Serialize(yenidegerler);
                }
                else if (entry.State == EntityState.Modified)
                {
                    var degisenAlanlar = entry.Properties.Where(p=>p.IsModified).ToList();
                    
                    var eskiDegerler = new Dictionary<string, object?>();
                    var yeniDegerler = new Dictionary<string,object?>();

                    foreach (var prop in degisenAlanlar)
                    {
                        eskiDegerler[prop.Metadata.Name]=prop.OriginalValue;
                        yeniDegerler[prop.Metadata.Name]=prop.CurrentValue;
                    }
                    log.OldValues = System.Text.Json.JsonSerializer.Serialize(eskiDegerler);
                    log.NewValues = System.Text.Json.JsonSerializer.Serialize(yeniDegerler);
                    log.ChangedColumns = string.Join(",",degisenAlanlar.Select(x=>x.Metadata.Name));

                }


                else if (entry.State == EntityState.Deleted)
                {
                    var eskiDegerler = new Dictionary<string, object?>();

                    foreach (var prop in entry.Properties)
                    {
                        eskiDegerler[prop.Metadata.Name] = prop.OriginalValue;
                    }

                    log.OldValues = System.Text.Json.JsonSerializer.Serialize(eskiDegerler);
                }



                auditEntries.Add(log);
                
            }

            if (auditEntries.Count > 0)
            {
                context.Set<AuditLog>().AddRange(auditEntries);
            }
        }

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}