using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IWarehouseLocationRepository
{
    Task<List<WarehouseLocation>> GetAllAsync();

    Task<WarehouseLocation?> GetByIdAsync(int id);

    Task<WarehouseLocation> AddAsync(WarehouseLocation location);

    Task<WarehouseLocation?> UpdateAsync(int id, WarehouseLocation updatedLocation);

    Task<bool> DeleteAsync(int id);
}
