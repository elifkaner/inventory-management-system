using InventoryManagement.Application.DTOs.StockMovement;

namespace InventoryManagement.Application.Interfaces;

// StockMovementService'in, altyapı detayını (SignalR) bilmeden bağlı istemcilere
// gerçek zamanlı bildirim gönderebilmesini sağlayan soyutlama.
public interface IStockMovementNotifier
{
    Task NotifyMovementCreatedAsync(StockMovementResponseDto movement);

    Task NotifyMovementDeletedAsync(int movementId, int productId);
}
