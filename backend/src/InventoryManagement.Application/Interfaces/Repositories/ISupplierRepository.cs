using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface ISupplierRepository
{
    Task<List<Supplier>> GetAllAsync();

    Task<Supplier?> GetByIdAsync(int id);

    Task<Supplier> AddAsync(Supplier supplier);

    Task<Supplier?> UpdateAsync(Supplier supplier);

    Task<bool> DeleteAsync(int id);

    Task<bool> HasProductsAsync(int supplierId);
}
