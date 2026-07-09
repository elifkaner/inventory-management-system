using InventoryManagement.Application.DTOs.Supplier;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupplierController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    // GET /api/Supplier
    [HttpGet]
    public async Task<IActionResult> GetAllSuppliers()
    {
        var suppliers = await _supplierService.GetAllAsync();

        return Ok(suppliers);
    }

    // GET /api/Supplier/{id}
    [HttpGet("{id}")]
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
        var createdSupplier = await _supplierService.CreateAsync(dto);

        return Ok(createdSupplier);
    }

    // PUT /api/Supplier/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSupplier(int id, UpdateSupplierDto dto)
    {
        var updated = await _supplierService.UpdateAsync(id, dto);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE /api/Supplier/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSupplier(int id)
    {
        var deleted = await _supplierService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
