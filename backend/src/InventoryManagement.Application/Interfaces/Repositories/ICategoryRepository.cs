using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();

    Task<Category?> GetByIdAsync(int id);

    Task<Category> AddAsync(Category category);

    Task<Category?> UpdateAsync(int id, string name);

    Task<bool> DeleteAsync(int id);

    Task<bool> HasProductsAsync(int categoryId);
}
