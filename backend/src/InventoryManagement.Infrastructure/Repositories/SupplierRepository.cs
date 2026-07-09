using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class SupplierRepository : ISupplierRepository
{
    private readonly AppDbContext _context;

    public SupplierRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Supplier>> GetAllAsync()
    {
        return await _context.Suppliers.ToListAsync();
    }

    public async Task<Supplier?> GetByIdAsync(int id)
    {
        return await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Supplier> AddAsync(Supplier supplier)
    {
        _context.Suppliers.Add(supplier);

        await _context.SaveChangesAsync();

        return supplier;
    }

    public async Task<bool> UpdateAsync(Supplier supplier)
    {
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var supplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id);

        if (supplier == null)
        {
            return false;
        }

        _context.Suppliers.Remove(supplier);

        await _context.SaveChangesAsync();

        return true;
    }
}
