namespace InventoryManagement.Application.DTOs.Product;

public class ProductResponseDto
{
    public int Id { get; set; }

    public string ProductName { get; set; } = "";

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public string Barcode { get; set; } = "";

    public int StockQuantity { get; set; }

    public string BrandName { get; set; } = "";

    public string Model { get; set; } = "";

    public bool IsActive { get; set; }

    public string Supplier { get; set; } = "";

    public string Category { get; set; } = "";

    public string Location { get; set; } = "";
}
