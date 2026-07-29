using InventoryManagement.Application.DTOs.Brand;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IBrandService
{
    Task<List<BrandDto>> GetAllBrandsAsync();

    Task<BrandDto?> GetBrandByIdAsync(int id);

    Task<BrandDto> CreateBrandAsync(CreateBrandDto dto);

    Task<BrandDto?> UpdateBrandAsync(int id, UpdateBrandDto dto);

    Task<bool> DeleteBrandAsync(int id);
}
