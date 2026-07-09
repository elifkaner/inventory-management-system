using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // Tüm kategorileri getirir
    public async Task<List<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();

        return categories.Select(ToDto).ToList();
    }

    // Id'ye göre kategori getirir
    public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        return category == null ? null : ToDto(category);
    }

    // Yeni kategori oluşturur
    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
    {
        var category = new Category { Name = dto.Name };

        var created = await _categoryRepository.AddAsync(category);

        return ToDto(created);
    }

    // Kategori güncelleme
    public async Task<CategoryDto?> UpdateCategoryAsync(int id, UpdateCategoryDto dto)
    {
        var category = await _categoryRepository.UpdateAsync(id, dto.Name);

        return category == null ? null : ToDto(category);
    }

    // Kategori silme
    public Task<bool> DeleteCategoryAsync(int id)
    {
        return _categoryRepository.DeleteAsync(id);
    }

    private static CategoryDto ToDto(Category c)
    {
        return new CategoryDto { Id = c.Id, Name = c.Name };
    }
}
