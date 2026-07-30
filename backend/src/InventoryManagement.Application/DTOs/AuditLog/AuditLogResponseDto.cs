namespace InventoryManagement.Application.DTOs.AuditLog;

public class AuditLogResponseDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string UserName { get; set; } = "";

    public string Action { get; set; } = "";

    public string EntityName { get; set; } = "";

    public string EntityId { get; set; } = "";

    public string OldValues { get; set; } = "";

    public string NewValues { get; set; } = "";

    public string ChangedColumns { get; set; } = "";

    public DateTime Timestamp { get; set; }

    public string? IpAddress { get; set; }

    public string? UserAgent { get; set; }

    public string? RequestId { get; set; }
}
