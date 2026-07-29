namespace InventoryManagement.Domain.Entities;

public class Model
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public int BrandId { get; set; }

    // Navigation Properties
    public Brand? Brand { get; set; }

    public List<Product> Products { get; set; } = new();
}
