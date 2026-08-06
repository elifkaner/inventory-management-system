using InventoryManagement.Application.DTOs.Model;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.Extensions.Caching.Memory;
using ModelEntity = InventoryManagement.Domain.Entities.Model;

namespace InventoryManagement.Application.Services;

public class ModelService : IModelService
{
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(10);

    private readonly IModelRepository _modelRepository;
    private readonly IMemoryCache _cache;

    public ModelService(IModelRepository modelRepository, IMemoryCache cache)
    {
        _modelRepository = modelRepository;
        _cache = cache;
    }

    private const string AllModelsCacheKey = "models-all";

    // Sadece filtresiz ("tüm modeller") çağrı cache'lenir — brandId ile filtrelenen
    // istekler zaten dar kapsamlı ve az sıklıkta olduğu için cache'e gerek yok,
    // bu da her marka için ayrı cache anahtarı/geçersiz kılma karmaşasını önlüyor.
    public async Task<List<ModelDto>> GetAllModelsAsync(int? brandId = null)
    {
        if (brandId == null && _cache.TryGetValue(AllModelsCacheKey, out List<ModelDto>? cached) && cached != null)
        {
            return cached;
        }

        var models = await _modelRepository.GetAllAsync(brandId);
        var result = models.Select(ToDto).ToList();

        if (brandId == null)
        {
            _cache.Set(AllModelsCacheKey, result, CacheDuration);
        }

        return result;
    }

    public async Task<ModelDto?> GetModelByIdAsync(int id)
    {
        var model = await _modelRepository.GetByIdAsync(id);

        return model == null ? null : ToDto(model);
    }

    public async Task<ModelDto> CreateModelAsync(CreateModelDto dto)
    {
        var model = new ModelEntity { Name = dto.Name, BrandId = dto.BrandId };

        var created = await _modelRepository.AddAsync(model);
        if( created != null) 
        {
        _cache.Remove(AllModelsCacheKey);
        }

        return ToDto(created);
    }

    public async Task<ModelDto?> UpdateModelAsync(int id, UpdateModelDto dto)
    {
        var model = await _modelRepository.UpdateAsync(id, dto.Name, dto.BrandId);
        if( model != null) 
        {
        _cache.Remove(AllModelsCacheKey);
        }

        return model == null ? null : ToDto(model);
    }

    public async Task<bool> DeleteModelAsync(int id)
    {
        var hasProducts = await _modelRepository.HasProductsAsync(id);

        if (hasProducts)
        {
            throw new InvalidOperationException("Bu modele bağlı ürünler var, önce onları silin ya da başka bir modele taşıyın.");
        }

        var deleted = await _modelRepository.DeleteAsync(id);
        if(deleted) 
        {
        _cache.Remove(AllModelsCacheKey);
        }

        return deleted;
    }

    private static ModelDto ToDto(ModelEntity m)
    {
        return new ModelDto
        {
            Id = m.Id,
            Name = m.Name,
            BrandId = m.BrandId,
            BrandName = m.Brand != null ? m.Brand.Name : ""
        };
    }
}
