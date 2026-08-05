using InventoryManagement.Application.DTOs.WarehouseLocation;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace InventoryManagement.Application.Services;

public class WarehouseLocationService : IWarehouseLocationService
{
    private const string AllLocationsCacheKey = "warehouse-locations-all";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(10);

    private readonly IWarehouseLocationRepository _locationRepository;
    private readonly IMemoryCache _cache;

    public WarehouseLocationService(IWarehouseLocationRepository locationRepository, IMemoryCache cache)
    {
        _locationRepository = locationRepository;
        _cache = cache;
    }

    public async Task<List<WarehouseLocationDto>> GetAllAsync()
    {
        if (_cache.TryGetValue(AllLocationsCacheKey, out List<WarehouseLocationDto>? cached) && cached != null)
        {
            return cached;
        }

        var locations = await _locationRepository.GetAllAsync();
        var result = locations.Select(ToDto).ToList();

        _cache.Set(AllLocationsCacheKey, result, CacheDuration);

        return result;
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
        _cache.Remove(AllLocationsCacheKey);

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
        _cache.Remove(AllLocationsCacheKey);

        return updated == null ? null : ToDto(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var hasProducts = await _locationRepository.HasProductsAsync(id);

        if (hasProducts)
        {
            throw new InvalidOperationException("Bu depo konumuna bağlı ürünler var, önce onları silin ya da başka bir konuma taşıyın.");
        }

        var deleted = await _locationRepository.DeleteAsync(id);
        _cache.Remove(AllLocationsCacheKey);

        return deleted;
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
