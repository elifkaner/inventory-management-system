using FluentValidation;
using InventoryManagement.Application.DTOs.WarehouseLocation;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WarehouseLocationController : ControllerBase
{
    private readonly IWarehouseLocationService _locationService;
    private readonly IValidator<CreateWarehouseLocationDto> _createLocationValidator;
    private readonly IValidator<UpdateWarehouseLocationDto> _updateLocationValidator;

    public WarehouseLocationController(
        IWarehouseLocationService locationService,
        IValidator<CreateWarehouseLocationDto> createLocationValidator,
        IValidator<UpdateWarehouseLocationDto> updateLocationValidator)
    {
        _locationService = locationService;
        _createLocationValidator = createLocationValidator;
        _updateLocationValidator = updateLocationValidator;
    }

    // GET /api/WarehouseLocation
    [HttpGet]
    public async Task<IActionResult> GetAllLocations()
    {
        var locations = await _locationService.GetAllAsync();

        return Ok(locations);
    }

    // GET /api/WarehouseLocation/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetLocationById(int id)
    {
        var location = await _locationService.GetByIdAsync(id);

        if (location == null)
        {
            return NotFound();
        }

        return Ok(location);
    }

    // POST /api/WarehouseLocation
    [HttpPost]
    public async Task<IActionResult> CreateLocation(CreateWarehouseLocationDto dto)
    {
        var validationResult = await _createLocationValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var createdLocation = await _locationService.CreateAsync(dto);

        return Ok(createdLocation);
    }

    // PUT /api/WarehouseLocation/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateLocation(int id, UpdateWarehouseLocationDto dto)
    {
        var validationResult = await _updateLocationValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var updatedLocation = await _locationService.UpdateAsync(id, dto);

        if (updatedLocation == null)
        {
            return NotFound();
        }

        return Ok(updatedLocation);
    }

    // DELETE /api/WarehouseLocation/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteLocation(int id)
    {
        try
        {
            var deleted = await _locationService.DeleteAsync(id);

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
