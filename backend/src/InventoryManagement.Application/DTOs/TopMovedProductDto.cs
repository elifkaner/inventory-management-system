namespace InventoryManagement.Application.DTOs;

public class TopMovedProductDto
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = "";

    public int TotalMovementCount { get; set; }

    public int TotalQuantityMoved { get; set; }
}
