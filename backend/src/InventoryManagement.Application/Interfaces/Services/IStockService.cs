using InventoryManagement.Application.DTOs.StockMovement;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IStockService
{
    Task<List<StockMovementResponseDto>> GetAllAsync();

    Task<StockMovementResponseDto?> GetByIdAsync(int id);

    Task<StockMovementResponseDto> CreateAsync(CreateStockMovementDto dto);

    Task<StockMovementResponseDto?> UpdateAsync(int id, UpdateStockMovementDto dto);

    Task<bool> DeleteAsync(int id);
}
