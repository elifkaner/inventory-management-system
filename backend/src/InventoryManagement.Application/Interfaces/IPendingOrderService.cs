using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryManagement.Application.DTOs;

namespace InventoryManagement.Application.Interfaces
{
    public interface IPendingOrderService
    {
        Task<IEnumerable<PendingOrderDto>> GetAllPendingOrdersAsync();
        Task<PendingOrderDto> AddPendingOrderAsync(CreatePendingOrderDto dto);
        Task DeletePendingOrderAsync(int id);
        // We can also have an endpoint to delete by product ID when product arrives.
        Task DeletePendingOrdersByProductIdAsync(int productId);
    }
}
