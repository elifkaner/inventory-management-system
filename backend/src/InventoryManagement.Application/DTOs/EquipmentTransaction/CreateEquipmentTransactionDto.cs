namespace InventoryManagement.Application.DTOs;
public class CreateEquipmentTransactionDto
{
    public int EquipmentId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Condition { get; set; } = string.Empty;
    public string? Notes { get; set; }
}
