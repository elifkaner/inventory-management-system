using InventoryManagement.Application.DTOs.Common;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IStockMovementRepository
{
    Task<PagedResult<StockMovement>> GetAllAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null,int? page = null, int? pageSize = null);

    Task<StockMovement?> GetByIdAsync(int id);

    Task<StockMovement> AddAsync(StockMovement stockMovement);

    Task<bool> DeleteAsync(int id);
}
