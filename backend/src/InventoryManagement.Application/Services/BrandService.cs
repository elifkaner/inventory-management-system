using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace InventoryManagement.Application.Services;

public class BrandService : IBrandService
{
    private const string AllBrandsCacheKey = "brands-all";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(10);

    private readonly IBrandRepository _brandRepository;
    private readonly IMemoryCache _cache;

    public BrandService(IBrandRepository brandRepository, IMemoryCache cache)
    {
        _brandRepository = brandRepository;
        _cache = cache;
    }

    public async Task<List<BrandDto>> GetAllBrandsAsync()
    {
        if (_cache.TryGetValue(AllBrandsCacheKey, out List<BrandDto>? cached) && cached != null)
        {
            return cached;
        }

        var brands = await _brandRepository.GetAllAsync();
        var result = brands.Select(ToDto).ToList();

        _cache.Set(AllBrandsCacheKey, result, CacheDuration);

        return result;
    }

    public async Task<BrandDto?> GetBrandByIdAsync(int id)
    {
        var brand = await _brandRepository.GetByIdAsync(id);

        return brand == null ? null : ToDto(brand);
    }

    public async Task<BrandDto> CreateBrandAsync(CreateBrandDto dto)
    {
        var allBrands = await _brandRepository.GetAllAsync();
        if (allBrands.Any(b => b.Name.Equals(dto.Name, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"'{dto.Name}' adında bir marka zaten mevcut.");
        }

        var brand = new Brand { Name = dto.Name, CategoryId = dto.CategoryId };

        var created = await _brandRepository.AddAsync(brand);
        _cache.Remove(AllBrandsCacheKey);

        return ToDto(created);
    }

    public async Task<BrandDto?> UpdateBrandAsync(int id, UpdateBrandDto dto)
    {
        var allBrands = await _brandRepository.GetAllAsync();
        if (allBrands.Any(b => b.Id != id && b.Name.Equals(dto.Name, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"'{dto.Name}' adında bir marka zaten mevcut.");
        }

        var brand = await _brandRepository.UpdateAsync(id, dto.Name, dto.CategoryId);
        _cache.Remove(AllBrandsCacheKey);

        return brand == null ? null : ToDto(brand);
    }

    public async Task<bool> DeleteBrandAsync(int id)
    {
        var hasModels = await _brandRepository.HasModelsAsync(id);

        if (hasModels)
        {
            throw new InvalidOperationException("Bu markaya bağlı modeller var, önce onları silin.");
        }

        var hasProducts = await _brandRepository.HasProductsAsync(id);

        if (hasProducts)
        {
            throw new InvalidOperationException("Bu markaya bağlı ürünler var, önce onları silin ya da başka bir markaya taşıyın.");
        }

        var deleted = await _brandRepository.DeleteAsync(id);
        _cache.Remove(AllBrandsCacheKey);

        return deleted;
    }

    private static BrandDto ToDto(Brand b)
    {
        return new BrandDto
        {
            Id = b.Id,
            Name = b.Name,
            CategoryId = b.CategoryId,
            CategoryName = b.Category?.Name ?? ""
        };
    }
}
