using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.Domain.Entities;

public class AuditLog
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string Action { get; set; } = string.Empty;

    public string EntityName { get; set; } = string.Empty;

    public string EntityId { get; set; } = string.Empty;

    public string OldValues { get; set; } = string.Empty;

    public string NewValues { get; set; } = string.Empty;

    public string ChangedColumns { get; set; } = string.Empty;

    public DateTime Timestamp  { get; set; }

    public string? IpAddress { get; set; } = string.Empty;

    public string? UserAgent { get; set; } = string.Empty;

    public string? RequestId { get; set; } = string.Empty;

}