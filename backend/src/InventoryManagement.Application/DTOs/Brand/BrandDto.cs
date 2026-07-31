namespace InventoryManagement.Application.DTOs.Brand;

public class BrandDto
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = "";
}
