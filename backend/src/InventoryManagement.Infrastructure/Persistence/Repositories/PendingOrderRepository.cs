using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;

namespace InventoryManagement.Infrastructure.Repositories
{
    public class PendingOrderRepository : IPendingOrderRepository
    {
        private readonly AppDbContext _context;

        public PendingOrderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PendingOrder>> GetAllWithProductAsync()
        {
            return await _context.PendingOrders
                .Include(p => p.Product)
                    .ThenInclude(p => p.Category)
                .Include(p => p.Product)
                    .ThenInclude(p => p.Brand)
                .Include(p => p.Product)
                    .ThenInclude(p => p.Supplier)
                .OrderByDescending(p => p.OrderDate)
                .ToListAsync();
        }

        public async Task<PendingOrder> GetByProductIdAsync(int productId)
        {
            return await _context.PendingOrders.FirstOrDefaultAsync(p => p.ProductId == productId);
        }

        public async Task<PendingOrder> GetByIdAsync(int id)
        {
            return await _context.PendingOrders.FindAsync(id);
        }

        public async Task AddAsync(PendingOrder pendingOrder)
        {
            await _context.PendingOrders.AddAsync(pendingOrder);
            await _context.SaveChangesAsync();
        }

        public void Update(PendingOrder pendingOrder)
        {
            _context.PendingOrders.Update(pendingOrder);
            _context.SaveChanges();
        }

        public void Remove(PendingOrder pendingOrder)
        {
            _context.PendingOrders.Remove(pendingOrder);
            _context.SaveChanges();
        }

        public void RemoveRange(IEnumerable<PendingOrder> pendingOrders)
        {
            _context.PendingOrders.RemoveRange(pendingOrders);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<PendingOrder>> GetListByProductIdAsync(int productId)
        {
            return await _context.PendingOrders.Where(p => p.ProductId == productId).ToListAsync();
        }
    }
}
