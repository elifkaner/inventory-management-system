using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace InventoryManagement.Infrastructure.Persistence;

public class AuditSaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUser;

    // SavingChangesAsync'te toplanıp SavedChangesAsync'te tamamlanacak bekleyen audit kayıtları.
    // "Create" olanların gerçek Id'si, veritabanı INSERT'i çalışıp geri dönene kadar bilinmiyor.
    private List<PendingAudit>? _pendingAudits;

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
        _pendingAudits = new List<PendingAudit>();

        // Kimliği doğrulanmamış (ör. token yenileme gibi anonim) istekler "System" olarak
        // işaretleniyor — bunların yaptığı hiçbir değişiklik audit log'a yazılmıyor.
        var isSystemContext = _currentUser.UserName == "System";

        if (context != null && !isSystemContext)
        {
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

                Dictionary<string, object?>? newValuesForCreate = null;

                if (entry.State == EntityState.Added)
                {
                    var yenidegerler = new Dictionary<string, object?>();

                    foreach (var prop in entry.Properties)
                    {
                        yenidegerler[prop.Metadata.Name] = prop.CurrentValue;
                    }

                    log.NewValues = System.Text.Json.JsonSerializer.Serialize(yenidegerler);
                    newValuesForCreate = yenidegerler;
                }
                else if (entry.State == EntityState.Modified)
                {
                    var degisenAlanlar = entry.Properties.Where(p => p.IsModified).ToList();

                    var eskiDegerler = new Dictionary<string, object?>();
                    var yeniDegerler = new Dictionary<string, object?>();

                    foreach (var prop in degisenAlanlar)
                    {
                        eskiDegerler[prop.Metadata.Name] = prop.OriginalValue;
                        yeniDegerler[prop.Metadata.Name] = prop.CurrentValue;
                    }
                    log.OldValues = System.Text.Json.JsonSerializer.Serialize(eskiDegerler);
                    log.NewValues = System.Text.Json.JsonSerializer.Serialize(yeniDegerler);
                    log.ChangedColumns = string.Join(",", degisenAlanlar.Select(x => x.Metadata.Name));
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

                _pendingAudits.Add(new PendingAudit
                {
                    Entry = entry,
                    Log = log,
                    PrimaryKeyPropertyName = pk?.Metadata.Name,
                    NewValuesForCreate = newValuesForCreate
                });
            }
        }

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    public override async ValueTask<int> SavedChangesAsync(
        SaveChangesCompletedEventData eventData,
        int result,
        CancellationToken cancellationToken = default)
    {
        var context = eventData.Context;
        var pending = _pendingAudits;
        _pendingAudits = null;

        if (context != null && pending is { Count: > 0 })
        {
            foreach (var item in pending)
            {
                // "Create" (Added) kayıtlarda, SavingChangesAsync anında Id henüz veritabanı
                // tarafından atanmamıştı (EF Core geçici bir yer tutucu değer kullanıyordu).
                // Asıl INSERT artık tamamlandı, entry üzerindeki gerçek Id'yi şimdi okuyabiliriz.
                if (item.Log.Action == "Create" && item.PrimaryKeyPropertyName != null)
                {
                    var pk = item.Entry.Properties.FirstOrDefault(x => x.Metadata.Name == item.PrimaryKeyPropertyName);
                    var realId = pk?.CurrentValue?.ToString();

                    if (!string.IsNullOrEmpty(realId))
                    {
                        item.Log.EntityId = realId;

                        if (item.NewValuesForCreate != null)
                        {
                            item.NewValuesForCreate[item.PrimaryKeyPropertyName] = pk!.CurrentValue;
                            item.Log.NewValues = System.Text.Json.JsonSerializer.Serialize(item.NewValuesForCreate);
                        }
                    }
                }
            }

            context.Set<AuditLog>().AddRange(pending.Select(x => x.Log));

            // Asıl kayıt zaten tamamlandığı için burada ikinci, ayrı bir SaveChanges gerekiyor —
            // audit satırlarını, artık doğru Id'lerle, ayrı bir round-trip'te kalıcı hale getiriyoruz.
            await context.SaveChangesAsync(cancellationToken);
        }

        return await base.SavedChangesAsync(eventData, result, cancellationToken);
    }

    private class PendingAudit
    {
        public required Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry Entry { get; init; }
        public required AuditLog Log { get; init; }
        public string? PrimaryKeyPropertyName { get; init; }
        public Dictionary<string, object?>? NewValuesForCreate { get; init; }
    }
}
