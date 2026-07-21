namespace InventoryManagement.Application.DTOs.Product;

public class CreateProductDto
{
    public string ProductName { get; set; } = "";

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public string Barcode { get; set; } = "";

    public int StockQuantity { get; set; }

    public int CategoryId { get; set; }

    public string BrandName { get; set; } = "";

    public string Model { get; set; } = "";

    public bool IsActive { get; set; }

    public int SupplierId { get; set; }

    public int? LocationId { get; set; }
}
