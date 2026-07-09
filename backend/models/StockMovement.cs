namespace IlkDotNetApp.Models;

public class StockMovement
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string TransactionType { get; set; } = "";

    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Description { get; set; } = "";


    // Navigation Property
    public Product? Product { get; set; }
}