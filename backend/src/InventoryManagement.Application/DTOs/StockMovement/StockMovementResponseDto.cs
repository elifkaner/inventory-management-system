namespace InventoryManagement.Application.DTOs.StockMovement;

public class StockMovementResponseDto
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string ProductName { get; set; } = "";

    public string TransactionType { get; set; } = "";

    public decimal TransactionAmounth { get; set; }

    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Description { get; set; } = "";
}
