using FluentValidation;
using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BrandController : ControllerBase
{
    private readonly IBrandService _brandService;
    private readonly IValidator<CreateBrandDto> _createBrandValidator;
    private readonly IValidator<UpdateBrandDto> _updateBrandValidator;

    public BrandController(
        IBrandService brandService,
        IValidator<CreateBrandDto> createBrandValidator,
        IValidator<UpdateBrandDto> updateBrandValidator)
    {
        _brandService = brandService;
        _createBrandValidator = createBrandValidator;
        _updateBrandValidator = updateBrandValidator;
    }

    // GET /api/Brand
    [HttpGet]
    public async Task<IActionResult> GetAllBrands()
    {
        var brands = await _brandService.GetAllBrandsAsync();

        return Ok(brands);
    }

    // GET /api/Brand/{id:int}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetBrandById(int id)
    {
        var brand = await _brandService.GetBrandByIdAsync(id);

        if (brand == null)
        {
            return NotFound();
        }

        return Ok(brand);
    }

    // POST /api/Brand
    [HttpPost]
    public async Task<IActionResult> CreateBrand(CreateBrandDto dto)
    {
        var validationResult = await _createBrandValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var createdBrand = await _brandService.CreateBrandAsync(dto);

        return Ok(createdBrand);
    }

    // PUT /api/Brand/{id:int}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateBrand(int id, UpdateBrandDto dto)
    {
        var validationResult = await _updateBrandValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var updatedBrand = await _brandService.UpdateBrandAsync(id, dto);

        if (updatedBrand == null)
        {
            return NotFound();
        }

        return Ok(updatedBrand);
    }

    // DELETE /api/Brand/{id:int}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBrand(int id)
    {
        try
        {
            var deleted = await _brandService.DeleteBrandAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
