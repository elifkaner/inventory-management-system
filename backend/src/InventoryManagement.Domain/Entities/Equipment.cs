namespace InventoryManagement.Domain.Entities;

public class Equipment
{
    public int Id { get; set; }

    public string EquipmentCode { get; set; } = string.Empty;

    public string EquipmentName { get; set; } = string.Empty;

    // "Available" | "InUse" | "UnderMaintenance" | "Retired"
    public string Status { get; set; } = "Available";

    // Ekipman şu an kimde: teslim alındığında dolar, teslim edildiğinde boşalır.
    public string? CurrentHolderName { get; set; }

    public DateTime? LastMaintenanceDate { get; set; }

    public List<EquipmentTransaction> Transactions { get; set; } = new();
}
