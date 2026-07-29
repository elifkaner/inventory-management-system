using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IModelRepository
{
    Task<List<Model>> GetAllAsync(int? brandId = null);

    Task<Model?> GetByIdAsync(int id);

    Task<Model> AddAsync(Model model);

    Task<Model?> UpdateAsync(int id, string name, int brandId);

    Task<bool> DeleteAsync(int id);

    Task<bool> HasProductsAsync(int modelId);
}
