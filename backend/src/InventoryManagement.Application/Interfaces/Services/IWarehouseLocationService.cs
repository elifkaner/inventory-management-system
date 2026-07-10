using InventoryManagement.Application.DTOs.WarehouseLocation;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IWarehouseLocationService
{
    Task<List<WarehouseLocationDto>> GetAllAsync();

    Task<WarehouseLocationDto?> GetByIdAsync(int id);

    Task<WarehouseLocationDto> CreateAsync(CreateWarehouseLocationDto dto);

    Task<WarehouseLocationDto?> UpdateAsync(int id, UpdateWarehouseLocationDto dto);

    Task<bool> DeleteAsync(int id);
}
