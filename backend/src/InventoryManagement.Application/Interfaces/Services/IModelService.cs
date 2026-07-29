using InventoryManagement.Application.DTOs.Model;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IModelService
{
    Task<List<ModelDto>> GetAllModelsAsync(int? brandId = null);

    Task<ModelDto?> GetModelByIdAsync(int id);

    Task<ModelDto> CreateModelAsync(CreateModelDto dto);

    Task<ModelDto?> UpdateModelAsync(int id, UpdateModelDto dto);

    Task<bool> DeleteModelAsync(int id);
}
