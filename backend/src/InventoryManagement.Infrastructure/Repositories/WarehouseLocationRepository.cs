using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class WarehouseLocationRepository : IWarehouseLocationRepository
{
    private readonly AppDbContext _context;

    public WarehouseLocationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<WarehouseLocation>> GetAllAsync()
    {
        return await _context.WarehouseLocations.ToListAsync();
    }

    public async Task<WarehouseLocation?> GetByIdAsync(int id)
    {
        return await _context.WarehouseLocations.FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<WarehouseLocation> AddAsync(WarehouseLocation location)
    {
        _context.WarehouseLocations.Add(location);

        await _context.SaveChangesAsync();

        return location;
    }

    public async Task<WarehouseLocation?> UpdateAsync(int id, WarehouseLocation updatedLocation)
    {
        var location = await _context.WarehouseLocations.FirstOrDefaultAsync(l => l.Id == id);

        if (location == null)
        {
            return null;
        }

        location.Corridor = updatedLocation.Corridor;
        location.Shelf = updatedLocation.Shelf;
        location.Section = updatedLocation.Section;

        await _context.SaveChangesAsync();

        return location;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var location = await _context.WarehouseLocations.FirstOrDefaultAsync(l => l.Id == id);

        if (location == null)
        {
            return false;
        }

        _context.WarehouseLocations.Remove(location);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> HasProductsAsync(int locationId)
    {
        return await _context.Products.AnyAsync(p => p.LocationId == locationId);
    }
}
