namespace InventoryManagement.Domain.Entities;

public class Product
{
    public int Id { get; set; }

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

    public Supplier? Supplier { get; set; }

    public Category? Category { get; set; }

    public WarehouseLocation? Location { get; set; }

    public List<StockMovement> StockMovements { get; set; } = new();
}
