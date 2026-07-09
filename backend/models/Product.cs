namespace IlkDotNetApp.Models;

public class Product
{
    public int Id { get; set; }

    public string ProductName { get; set; } = "";

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public string Barcode { get; set; } = "";

    public int StockQuantity { get; set; }

    public int CategoryId { get; set; }

    public int BrandId { get; set; }

    public bool IsActive { get; set; }

    public int SupplierId { get; set; }

    public Supplier? Supplier { get; set; }

    public Category? Category { get; set; }

    public List<StockMovement> StockMovements { get; set; } = new();
}