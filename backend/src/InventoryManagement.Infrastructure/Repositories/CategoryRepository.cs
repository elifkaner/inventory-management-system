using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Category> AddAsync(Category category)
    {
        _context.Categories.Add(category);

        await _context.SaveChangesAsync();

        return category;
    }

    public async Task<Category?> UpdateAsync(int id, string name)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return null;
        }

        category.Name = name;

        await _context.SaveChangesAsync();

        return category;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return false;
        }

        _context.Categories.Remove(category);

        await _context.SaveChangesAsync();

        return true;
    }
}
