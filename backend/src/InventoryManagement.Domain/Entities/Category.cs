namespace InventoryManagement.Domain.Entities;

public class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    // Navigation Property
    public List<Product> Products { get; set; } = new(); // bir kategorinin birden çok ürünü olabilir.
}
