using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class StockMovementRepository : IStockMovementRepository
{
    private readonly AppDbContext _context;

    public StockMovementRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<StockMovement>> GetAllAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var query = _context.StockMovements
            .Include(s => s.Product)
            .Include(s => s.CreatedByUser)
            .AsQueryable();

        if (productId.HasValue)
        {
            query = query.Where(s => s.ProductId == productId.Value);
        }

        if (!string.IsNullOrWhiteSpace(transactionType))
        {
            query = query.Where(s => s.TransactionType == transactionType);
        }

        if (fromDate.HasValue)
        {
            query = query.Where(s => s.CreatedAt >= fromDate.Value);
        }

        if (toDate.HasValue)
        {
            query = query.Where(s => s.CreatedAt <= toDate.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<StockMovement?> GetByIdAsync(int id)
    {
        return await _context.StockMovements
            .Include(s => s.Product)
            .Include(s => s.CreatedByUser)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<StockMovement> AddAsync(StockMovement stockMovement)
    {
        _context.StockMovements.Add(stockMovement);

        await _context.SaveChangesAsync();

        return stockMovement;
    }

    public async Task<StockMovement?> UpdateAsync(int id, StockMovement updatedStockMovement)
    {
        var stockMovement = await _context.StockMovements.FirstOrDefaultAsync(s => s.Id == id);

        if (stockMovement == null)
        {
            return null;
        }

        stockMovement.ProductId = updatedStockMovement.ProductId;
        stockMovement.TransactionType = updatedStockMovement.TransactionType;
        stockMovement.TransactionAmounth = updatedStockMovement.TransactionAmounth;
        stockMovement.Quantity = updatedStockMovement.Quantity;
        stockMovement.Description = updatedStockMovement.Description;

        await _context.SaveChangesAsync();

        return stockMovement;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var stockMovement = await _context.StockMovements.FirstOrDefaultAsync(s => s.Id == id);

        if (stockMovement == null)
        {
            return false;
        }

        _context.StockMovements.Remove(stockMovement);

        await _context.SaveChangesAsync();

        return true;
    }
}
