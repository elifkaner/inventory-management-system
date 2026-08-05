using Microsoft.AspNetCore.SignalR;

namespace InventoryManagement.Infrastructure.Realtime;

// Sadece sunucudan istemciye tek yönlü yayın için kullanılıyor — istemcilerin
// çağırabileceği bir metod yok, bu yüzden gövdesi kasıtlı olarak boş.
public class StockMovementHub : Hub
{
}
