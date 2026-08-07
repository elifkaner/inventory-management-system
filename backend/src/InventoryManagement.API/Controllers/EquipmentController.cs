using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Application.Services;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace InventoryManagement.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class EquipmentController : ControllerBase
{
    private readonly IEquipmentService _equipmentService;

    public EquipmentController(IEquipmentService equipmentService)
    {
        _equipmentService= equipmentService;
    }

    // GET /api/equipments
    [HttpGet]
    public async Task<IActionResult> GetAllEquipments()
    {
       var equipments =  await _equipmentService.GetAllEquipmentsAsync();
       return Ok(equipments);
    }
    
    // POST /api/equipments/{id}
    [HttpPost("{id:int}")]
    public async Task<IActionResult> UpdateEquipment(int id)
    {
       var equipments =  await _equipmentService.UpdateEquipmentAsync(id);
       return Ok(equipments);
    }
    // PUT /api/equipments/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> CreateEquipment(EquipmentDto dto)
    {
       var equipments =  await _equipmentService.CreateEquipmentAsync(dto);
       return Ok(equipments);
    }
    // DELETE /api/equipments/{id}
    [HttpDelete("{id:int}")]

    public async Task<IActionResult> DeleteEquipment(int id)
    {
       var equipments =  await _equipmentService.DeleteEquipmentAsync(id);
       return Ok(equipments);
    }
    
}