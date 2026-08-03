using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class BrandRepository : IBrandRepository
{
    private readonly AppDbContext _context;

    public BrandRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Brand>> GetAllAsync()
    {
       return await _context.Brands.Include(b => b.Category).ToListAsync();
    }

    public async Task<Brand?> GetByIdAsync(int id)
    {
        return await _context.Brands.Include(x=>x.Category).FirstOrDefaultAsync(b=>b.Id==id);
    }
    public async Task<Brand> AddAsync(Brand brand)
    {
        _context.Add(brand);
        await _context.SaveChangesAsync();
        return (await GetByIdAsync(brand.Id))!;
    }

    public async Task<Brand?> UpdateAsync(int id, string name, int categoryId)
    {
        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);

        if (brand == null)
        {
            return null;
        }

        brand.Name = name;
        brand.CategoryId = categoryId;

        await _context.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);

        if (brand == null)
        {
            return false;
        }

        _context.Brands.Remove(brand);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> HasModelsAsync(int brandId)
    {
        return await _context.Models.AnyAsync(m => m.BrandId == brandId);
    }

    public async Task<bool> HasProductsAsync(int brandId)
    {
        return await _context.Products.AnyAsync(p => p.BrandId == brandId);
    }
}
