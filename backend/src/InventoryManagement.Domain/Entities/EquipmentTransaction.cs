namespace InventoryManagement.Domain.Entities;

public class EquipmentTransaction
{
    public int Id { get; set; }

    public int EquipmentId { get; set; }

    public string EmployeeName { get; set; } = string.Empty;

    // "CheckOut" (teslim alındı) | "CheckIn" (teslim edildi)
    public string Type { get; set; } = string.Empty;

    // "Working" | "Damaged" | "NeedsRepair"
    public string Condition { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public string? Notes { get; set; }

    // Bu kaydı sisteme giren kullanıcı (audit amaçlı). Opsiyonel: kullanıcı silinse bile hareket kaydı kalabilsin.
    public int? CreatedByUserId { get; set; }

    // Navigation Properties
    public Equipment? Equipment { get; set; }

    public User? CreatedByUser { get; set; }
}
