namespace InventoryManagement.Application.DTOs.StockMovement;

public class UpdateStockMovementDto
{
    public int ProductId { get; set; }

    public string TransactionType { get; set; } = "";

    public decimal TransactionAmounth { get; set; }

    public int Quantity { get; set; }

    public string Description { get; set; } = "";
}
