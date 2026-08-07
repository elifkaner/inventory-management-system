namespace InventoryManagement.Application.DTOs;
public class CreateEquipmentDto
{
    public int EquipmentId { get; set; }
    public string EquipmentName { get; set; } = string.Empty;
    public string UserName {get;set;} = string.Empty;
    public DateTime TakenTime{get;set;}
    
}