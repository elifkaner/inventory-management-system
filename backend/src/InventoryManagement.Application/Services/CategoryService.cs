using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.Exceptions;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(ICategoryRepository categoryRepository, IUnitOfWork unitOfWork)
    {
        _categoryRepository = categoryRepository;
        _unitOfWork = unitOfWork;
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

    // Kategori silme — ürünleri varsa, çağıran taraf hedef bir kategori belirtmek zorunda.
    public async Task<bool> DeleteCategoryAsync(int id, int? reassignToCategoryId = null)
    {
        var hasProducts = await _categoryRepository.HasProductsAsync(id);

        if (!hasProducts)
        {
            return await _categoryRepository.DeleteAsync(id);
        }

        if (reassignToCategoryId == null)
        {
            var productCount = await _categoryRepository.GetProductCountAsync(id);
            throw new CategoryHasProductsException(productCount);
        }

        if (reassignToCategoryId == id)
        {
            throw new InvalidOperationException("Ürünler, silinmekte olan kategorinin kendisine taşınamaz.");
        }

        var targetCategory = await _categoryRepository.GetByIdAsync(reassignToCategoryId.Value);

        if (targetCategory == null)
        {
            throw new InvalidOperationException("Belirtilen hedef kategori bulunamadı.");
        }

        await _unitOfWork.BeginTransactionAsync();
        try
        {
            await _categoryRepository.ReassignProductsAsync(id, reassignToCategoryId.Value);
            var deleted = await _categoryRepository.DeleteAsync(id);

            await _unitOfWork.CommitAsync();
            return deleted;
        }
        catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }

    private static CategoryDto ToDto(Category c)
    {
        return new CategoryDto { Id = c.Id, Name = c.Name };
    }
}
