using InventoryManagement.Application.DTOs.Model;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using ModelEntity = InventoryManagement.Domain.Entities.Model;

namespace InventoryManagement.Application.Services;

public class ModelService : IModelService
{
    private readonly IModelRepository _modelRepository;

    public ModelService(IModelRepository modelRepository)
    {
        _modelRepository = modelRepository;
    }

    public async Task<List<ModelDto>> GetAllModelsAsync(int? brandId = null)
    {
        var models = await _modelRepository.GetAllAsync(brandId);

        return models.Select(ToDto).ToList();
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

        return ToDto(created);
    }

    public async Task<ModelDto?> UpdateModelAsync(int id, UpdateModelDto dto)
    {
        var model = await _modelRepository.UpdateAsync(id, dto.Name, dto.BrandId);

        return model == null ? null : ToDto(model);
    }

    public async Task<bool> DeleteModelAsync(int id)
    {
        var hasProducts = await _modelRepository.HasProductsAsync(id);

        if (hasProducts)
        {
            throw new InvalidOperationException("Bu modele bağlı ürünler var, önce onları silin ya da başka bir modele taşıyın.");
        }

        return await _modelRepository.DeleteAsync(id);
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
