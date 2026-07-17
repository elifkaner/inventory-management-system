using FluentValidation;
using InventoryManagement.Application.DTOs.Supplier;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupplierController : ControllerBase
{
    private readonly ISupplierService _supplierService;
    private readonly IValidator<CreateSupplierDto> _createSupplierValidator;
    private readonly IValidator<UpdateSupplierDto> _updateSupplierValidator;

    public SupplierController(
        ISupplierService supplierService,
        IValidator<CreateSupplierDto> createSupplierValidator,
        IValidator<UpdateSupplierDto> updateSupplierValidator)
    {
        _supplierService = supplierService;
        _createSupplierValidator = createSupplierValidator;
        _updateSupplierValidator = updateSupplierValidator;
    }

    // GET /api/Supplier
    [HttpGet]
    public async Task<IActionResult> GetAllSuppliers()
    {
        var suppliers = await _supplierService.GetAllAsync();

        return Ok(suppliers);
    }

    // GET /api/Supplier/{id:int}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetSupplierById(int id)
    {
        var supplier = await _supplierService.GetByIdAsync(id);

        if (supplier == null)
        {
            return NotFound();
        }

        return Ok(supplier);
    }

    // POST /api/Supplier
    [HttpPost]
    public async Task<IActionResult> CreateSupplier(CreateSupplierDto dto)
    {
        var validationResult = await _createSupplierValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var createdSupplier = await _supplierService.CreateAsync(dto);

        return Ok(createdSupplier);
    }

    // PUT /api/Supplier/{id:int}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateSupplier(int id, UpdateSupplierDto dto)
    {
        var validationResult = await _updateSupplierValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var updated = await _supplierService.UpdateAsync(id, dto);

        if (updated == null)
        {
            return NotFound();
        }

        return Ok(updated);
    }

    // DELETE /api/Supplier/{id:int}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSupplier(int id)
    {
        try
        {
            var deleted = await _supplierService.DeleteAsync(id);

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
