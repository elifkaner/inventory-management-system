namespace InventoryManagement.Application.DTOs.WarehouseLocation;

public class WarehouseLocationDto
{
    public int Id { get; set; }

    public string Corridor { get; set; } = "";

    public string Shelf { get; set; } = "";

    public string Section { get; set; } = "";
}
