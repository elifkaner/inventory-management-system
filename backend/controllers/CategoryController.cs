using IlkDotNetApp.DTOs;
using IlkDotNetApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace IlkDotNetApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    // GET /api/Category
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();

        return Ok(categories);
    }

    // GET /api/Category/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    // POST /api/Category
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryDto dto)
    {
        var createdCategory = await _categoryService.CreateCategoryAsync(dto);

        return Ok(createdCategory);
    }

    // PUT /api/Category/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, UpdateCategoryDto dto)
    {
        var updatedCategory = await _categoryService.UpdateCategoryAsync(id, dto);

        if (updatedCategory == null)
        {
            return NotFound();
        }

        return Ok(updatedCategory);
    }

    // DELETE /api/Category/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var deleted = await _categoryService.DeleteCategoryAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}