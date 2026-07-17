using InventoryManagement.Application.DTOs.WarehouseLocation;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class WarehouseLocationService : IWarehouseLocationService
{
    private readonly IWarehouseLocationRepository _locationRepository;

    public WarehouseLocationService(IWarehouseLocationRepository locationRepository)
    {
        _locationRepository = locationRepository;
    }

    public async Task<List<WarehouseLocationDto>> GetAllAsync()
    {
        var locations = await _locationRepository.GetAllAsync();

        return locations.Select(ToDto).ToList();
    }

    public async Task<WarehouseLocationDto?> GetByIdAsync(int id)
    {
        var location = await _locationRepository.GetByIdAsync(id);

        return location == null ? null : ToDto(location);
    }

    public async Task<WarehouseLocationDto> CreateAsync(CreateWarehouseLocationDto dto)
    {
        var location = new WarehouseLocation
        {
            Corridor = dto.Corridor,
            Shelf = dto.Shelf,
            Section = dto.Section
        };

        var created = await _locationRepository.AddAsync(location);

        return ToDto(created);
    }

    public async Task<WarehouseLocationDto?> UpdateAsync(int id, UpdateWarehouseLocationDto dto)
    {
        var location = new WarehouseLocation
        {
            Corridor = dto.Corridor,
            Shelf = dto.Shelf,
            Section = dto.Section
        };

        var updated = await _locationRepository.UpdateAsync(id, location);

        return updated == null ? null : ToDto(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var hasProducts = await _locationRepository.HasProductsAsync(id);

        if (hasProducts)
        {
            throw new InvalidOperationException("Bu depo konumuna bağlı ürünler var, önce onları silin ya da başka bir konuma taşıyın.");
        }

        return await _locationRepository.DeleteAsync(id);
    }

    private static WarehouseLocationDto ToDto(WarehouseLocation l)
    {
        return new WarehouseLocationDto
        {
            Id = l.Id,
            Corridor = l.Corridor,
            Shelf = l.Shelf,
            Section = l.Section
        };
    }
}
