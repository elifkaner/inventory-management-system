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

    public async Task<bool> HasProductsAsync(int categoryId)
    {
        return await _context.Products.AnyAsync(p => p.CategoryId == categoryId);
    }

    public async Task<int> GetProductCountAsync(int categoryId)
    {
        return await _context.Products.CountAsync(p => p.CategoryId == categoryId);
    }

    // Ürünleri tek tek, ChangeTracker üzerinden taşıyoruz (toplu SQL ile değil) —
    // böylece AuditSaveChangesInterceptor her ürün için ayrı bir "Update, ChangedColumns:
    // CategoryId" kaydı düşebiliyor. Toplu SQL (ExecuteUpdateAsync) ChangeTracker'ı hiç
    // kullanmadığı için audit log bu değişiklikleri hiç göremezdi.
    public async Task ReassignProductsAsync(int fromCategoryId, int toCategoryId)
    {
        var products = await _context.Products.Where(p => p.CategoryId == fromCategoryId).ToListAsync();

        foreach (var product in products)
        {
            product.CategoryId = toCategoryId;
        }

        await _context.SaveChangesAsync();
    }
}
