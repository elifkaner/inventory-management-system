using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories
{
    public interface IPendingOrderRepository
    {
        Task<IEnumerable<PendingOrder>> GetAllWithProductAsync();
        Task<PendingOrder> GetByProductIdAsync(int productId);
        Task<PendingOrder> GetByIdAsync(int id);
        Task AddAsync(PendingOrder pendingOrder);
        void Update(PendingOrder pendingOrder);
        void Remove(PendingOrder pendingOrder);
        void RemoveRange(IEnumerable<PendingOrder> pendingOrders);
        Task<IEnumerable<PendingOrder>> GetListByProductIdAsync(int productId);
    }
}
