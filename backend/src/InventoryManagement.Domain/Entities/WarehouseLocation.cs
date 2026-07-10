namespace InventoryManagement.Domain.Entities;

public class WarehouseLocation
{
    public int Id { get; set; }

    public string Corridor { get; set; } = "";

    public string Shelf { get; set; } = "";

    public string Section { get; set; } = "";

    // Navigation Property
    public List<Product> Products { get; set; } = new();
}
