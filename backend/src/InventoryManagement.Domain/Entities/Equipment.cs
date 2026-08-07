
namespace InventoryManagement.Domain.Entities;
public class Equipment
{
    public int Id { get; set; }
    public int EquipmentId { get; set; }
    public string EquipmentName { get; set; } = string.Empty;
    public string UserName {get;set;} = string.Empty;
    public DateTime TakenTime{get;set;}
    
}