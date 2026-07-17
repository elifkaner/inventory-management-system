namespace InventoryManagement.Domain.Entities;

public class StockMovement
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string TransactionType { get; set; } = "";

    public decimal TransactionAmounth { get; set; }

    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Description { get; set; } = "";

    // Bu hareketi kaydeden kullanıcı (audit amaçlı). Opsiyonel: kullanıcı silinse bile hareket kaydı kalabilsin.
    public int? CreatedByUserId { get; set; }

    // Navigation Properties
    public Product? Product { get; set; }

    public User? CreatedByUser { get; set; }
}
