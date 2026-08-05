using InventoryManagement.Application.DTOs.StockMovement;
using InventoryManagement.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace InventoryManagement.Infrastructure.Realtime;

public class SignalRStockMovementNotifier : IStockMovementNotifier
{
    private readonly IHubContext<StockMovementHub> _hubContext;

    public SignalRStockMovementNotifier(IHubContext<StockMovementHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyMovementCreatedAsync(StockMovementResponseDto movement)
    {
        await _hubContext.Clients.All.SendAsync("MovementCreated", movement);
    }

    public async Task NotifyMovementDeletedAsync(int movementId, int productId)
    {
        await _hubContext.Clients.All.SendAsync("MovementDeleted", new { movementId, productId });
    }
}
