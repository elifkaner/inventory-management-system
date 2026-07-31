namespace InventoryManagement.Domain.Entities;

public class Brand
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public int CategoryId { get; set; }

    public Category? Category { get; set;}

    // Navigation Properties
    public List<Model> Models { get; set; } = new(); // bir markanın birden çok modeli olabilir.

    public List<Product> Products { get; set; } = new();
}
