using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class ModelRepository : IModelRepository
{
    private readonly AppDbContext _context;

    public ModelRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Model>> GetAllAsync(int? brandId = null)
    {
        var query = _context.Models.Include(m => m.Brand).AsQueryable();

        if (brandId.HasValue && brandId.Value > 0)
        {
            query = query.Where(m => m.BrandId == brandId.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Model?> GetByIdAsync(int id)
    {
        return await _context.Models.Include(m => m.Brand).FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<Model> AddAsync(Model model)
    {
        _context.Models.Add(model);

        await _context.SaveChangesAsync();

        return model;
    }

    public async Task<Model?> UpdateAsync(int id, string name, int brandId)
    {
        var model = await _context.Models.FirstOrDefaultAsync(m => m.Id == id);

        if (model == null)
        {
            return null;
        }

        model.Name = name;
        model.BrandId = brandId;

        await _context.SaveChangesAsync();

        return model;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var model = await _context.Models.FirstOrDefaultAsync(m => m.Id == id);

        if (model == null)
        {
            return false;
        }

        _context.Models.Remove(model);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> HasProductsAsync(int modelId)
    {
        return await _context.Products.AnyAsync(p => p.ModelId == modelId);
    }
}
