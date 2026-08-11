using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.Exceptions;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace InventoryManagement.Application.Services;

public class CategoryService : ICategoryService
{
    private const string AllCategoriesCacheKey = "categories-all";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(10);

    private readonly ICategoryRepository _categoryRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMemoryCache _cache;

    public CategoryService(ICategoryRepository categoryRepository, IUnitOfWork unitOfWork, IMemoryCache cache)
    {
        _categoryRepository = categoryRepository;
        _unitOfWork = unitOfWork;
        _cache = cache;
    }

    // Tüm kategorileri getirir
    public async Task<List<CategoryDto>> GetAllCategoriesAsync()
    {
        if (_cache.TryGetValue(AllCategoriesCacheKey, out List<CategoryDto>? cached) && cached != null)
        {
            return cached;
        }

        var categories = await _categoryRepository.GetAllAsync();
        var result = categories.Select(ToDto).ToList();

        _cache.Set(AllCategoriesCacheKey, result, CacheDuration);

        return result;
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
        var allCategories = await _categoryRepository.GetAllAsync();
        if (allCategories.Any(c => c.Name.Equals(dto.Name, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"'{dto.Name}' adında bir kategori zaten mevcut.");
        }

        var category = new Category { Name = dto.Name };

        var created = await _categoryRepository.AddAsync(category);
        _cache.Remove(AllCategoriesCacheKey);

        return ToDto(created);
    }

    // Kategori güncelleme
    public async Task<CategoryDto?> UpdateCategoryAsync(int id, UpdateCategoryDto dto)
    {
        var allCategories = await _categoryRepository.GetAllAsync();
        if (allCategories.Any(c => c.Id != id && c.Name.Equals(dto.Name, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"'{dto.Name}' adında bir kategori zaten mevcut.");
        }

        var category = await _categoryRepository.UpdateAsync(id, dto.Name);
        if (category != null ) 
        {
            _cache.Remove(AllCategoriesCacheKey);
        }
        return category == null ? null : ToDto(category);
    }

    // Kategori silme — ürünleri varsa, çağıran taraf hedef bir kategori belirtmek zorunda.
    public async Task<bool> DeleteCategoryAsync(int id, int? reassignToCategoryId = null)
    {
        var hasProducts = await _categoryRepository.HasProductsAsync(id);

        if (!hasProducts)
        {
            var deletedWithoutReassign = await _categoryRepository.DeleteAsync(id);
            if (deletedWithoutReassign) 
            {
            _cache.Remove(AllCategoriesCacheKey);
            return deletedWithoutReassign;
            }
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
            _cache.Remove(AllCategoriesCacheKey);
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
