using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class BrandService : IBrandService
{
    private readonly IBrandRepository _brandRepository;

    public BrandService(IBrandRepository brandRepository)
    {
        _brandRepository = brandRepository;
    }

    public async Task<List<BrandDto>> GetAllBrandsAsync()
    {
        var brands = await _brandRepository.GetAllAsync();

        return brands.Select(ToDto).ToList();
    }

    public async Task<BrandDto?> GetBrandByIdAsync(int id)
    {
        var brand = await _brandRepository.GetByIdAsync(id);

        return brand == null ? null : ToDto(brand);
    }

    public async Task<BrandDto> CreateBrandAsync(CreateBrandDto dto)
    {
        var brand = new Brand { Name = dto.Name };

        var created = await _brandRepository.AddAsync(brand);

        return ToDto(created);
    }

    public async Task<BrandDto?> UpdateBrandAsync(int id, UpdateBrandDto dto)
    {
        var brand = await _brandRepository.UpdateAsync(id, dto.Name);

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

        return await _brandRepository.DeleteAsync(id);
    }

    private static BrandDto ToDto(Brand b)
    {
        return new BrandDto { Id = b.Id, Name = b.Name };
    }
}
