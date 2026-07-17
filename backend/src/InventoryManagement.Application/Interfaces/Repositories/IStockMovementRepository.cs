using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IStockMovementRepository
{
    Task<List<StockMovement>> GetAllAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null);

    Task<StockMovement?> GetByIdAsync(int id);

    Task<StockMovement> AddAsync(StockMovement stockMovement);

    Task<StockMovement?> UpdateAsync(int id, StockMovement stockMovement);

    Task<bool> DeleteAsync(int id);
}
