using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();

    Task<Product?> GetByIdAsync(int id);

    Task<Product> AddAsync(Product product);

    Task<Product?> UpdateAsync(int id, Product updatedProduct);

    Task<bool> DeleteAsync(int id);
}
