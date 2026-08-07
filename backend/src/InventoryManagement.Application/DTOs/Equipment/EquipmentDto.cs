namespace InventoryManagement.Application.DTOs;
public class EquipmentDto
{
    public int Id { get; set; }
    public int EquipmentId { get; set; }
    public string EquipmentName { get; set; } = string.Empty;
    public string UserName {get;set;} = string.Empty;
    public DateTime TakenTime{get;set;}
    
}