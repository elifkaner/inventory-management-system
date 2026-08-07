using FluentValidation;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace InventoryManagement.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class EquipmentController : ControllerBase
{
    private readonly IEquipmentService _equipmentService;
    private readonly IValidator<CreateEquipmentDto> _createValidator;
    private readonly IValidator<UpdateEquipmentDto> _updateValidator;

    public EquipmentController(
        IEquipmentService equipmentService,
        IValidator<CreateEquipmentDto> createValidator,
        IValidator<UpdateEquipmentDto> updateValidator)
    {
        _equipmentService = equipmentService;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    // GET /api/equipment
    // Ekran 1: tüm ekipmanların listesi (ad, kod, durum, şu an kimde).
    [HttpGet]
    public async Task<IActionResult> GetAllEquipments()
    {
       var equipments =  await _equipmentService.GetAllEquipmentsAsync();
       return Ok(equipments);
    }

    // GET /api/equipment/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetEquipmentById(int id)
    {
        var equipment = await _equipmentService.GetEquipmentByIdAsync(id);
        if (equipment == null)
        {
            return NotFound();
        }
        return Ok(equipment);
    }

    // POST /api/equipment
    [HttpPost]
    public async Task<IActionResult> CreateEquipment(CreateEquipmentDto dto)
    {
        var validationResult = await _createValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var equipment = await _equipmentService.CreateEquipmentAsync(dto);
        return Ok(equipment);
    }

    // PUT /api/equipment/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateEquipment(int id, UpdateEquipmentDto dto)
    {
        var validationResult = await _updateValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var equipment = await _equipmentService.UpdateEquipmentAsync(id, dto);
        if (equipment == null)
        {
            return NotFound();
        }
        return Ok(equipment);
    }

    // DELETE /api/equipment/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteEquipment(int id)
    {
       var deleted =  await _equipmentService.DeleteEquipmentAsync(id);
       if(!deleted)
      {
         return NotFound();
      }
       return NoContent();
    }

}
