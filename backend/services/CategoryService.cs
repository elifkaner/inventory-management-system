using IlkDotNetApp.Database;
using IlkDotNetApp.DTOs;
using IlkDotNetApp.Models;
using Microsoft.EntityFrameworkCore;

namespace IlkDotNetApp.Services;

public class CategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    // Tüm kategorileri getirir
    public async Task<List<CategoryDto>> GetAllCategoriesAsync()
    {
        return await _context.Categories
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync();
    }

    // Id'ye göre kategori getirir
    public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        return await _context.Categories
            .Where(c => c.Id == id)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name
            })
            .FirstOrDefaultAsync();
    }

    // Yeni kategori oluşturur
    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
{
    // 1. Yeni bir veritabanı objesi oluşturuluyor
    var category = new Category
    {
        // İŞTE EKSİK OLAN VE EKLENMESİ GEREKEN HAYATİ SATIR:
        Name = dto.Name 
    };

    // 2. Veritabanına ekleme ve kaydetme
    _context.Categories.Add(category);
    await _context.SaveChangesAsync();

    // 3. Frontend'e (sana) geri dönülecek veri
    return new CategoryDto
    {
        Id = category.Id,
        Name = category.Name
    };
}

    // Kategori güncelleme
    public async Task<CategoryDto?> UpdateCategoryAsync(int id, UpdateCategoryDto dto)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return null;
        }

        category.Name = dto.Name;

        await _context.SaveChangesAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name
        };
    }

    // Kategori silme
    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return false;
        }

        _context.Categories.Remove(category);

        await _context.SaveChangesAsync();

        return true;
    }
}