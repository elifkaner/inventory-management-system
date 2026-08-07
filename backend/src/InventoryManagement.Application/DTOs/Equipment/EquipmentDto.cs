namespace InventoryManagement.Application.DTOs;
public class EquipmentDto
{
    public int Id { get; set; }
    public string EquipmentCode { get; set; } = string.Empty;
    public string EquipmentName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? CurrentHolderName { get; set; }
}
