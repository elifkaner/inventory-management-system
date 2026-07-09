namespace InventoryManagement.Application.DTOs.Product;

public class UpdateProductDto
{
    public string ProductName { get; set; } = "";

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public string Barcode { get; set; } = "";

    public int StockQuantity { get; set; }

    public int CategoryId { get; set; }

    public int BrandId { get; set; }

    public bool IsActive { get; set; }

    public int SupplierId { get; set; }
}
