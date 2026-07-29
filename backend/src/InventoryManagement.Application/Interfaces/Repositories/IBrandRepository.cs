using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IBrandRepository
{
    Task<List<Brand>> GetAllAsync();

    Task<Brand?> GetByIdAsync(int id);

    Task<Brand> AddAsync(Brand brand);

    Task<Brand?> UpdateAsync(int id, string name);

    Task<bool> DeleteAsync(int id);

    Task<bool> HasModelsAsync(int brandId);

    Task<bool> HasProductsAsync(int brandId);
}
