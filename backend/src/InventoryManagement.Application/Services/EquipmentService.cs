using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Application.Interfaces.Services;


namespace InventoryManagement.Application.Services;

public class EquipmentService : IEquipmentService
{
    private readonly IEquipmentRepository _equipmentRepository;

    public EquipmentService(IEquipmentRepository equipmentRepository)
    {
        _equipmentRepository = equipmentRepository;
    }

    public async Task<List<EquipmentDto>> GetAllEquipmentsAsync()
    {
        var equipments = await _equipmentRepository.GetAllAsync();
        var results = equipments.Select(ToDto).ToList();
        return results;
    }

    public async Task<EquipmentDto> CreateEquipmentAsync(EquipmentDto dto)
    {
        var equipments = new Equipment
        {
            EquipmentName = dto.EquipmentName,
            EquipmentId = dto.EquipmentId,
            UserName = dto.UserName,
            TakenTime = dto.TakenTime
        };
        await _equipmentRepository.AddAsync(equipments);
        return ToDto(equipments);
    }

    public async Task<EquipmentDto?> UpdateEquipmentAsync(int id)
    {
       var equipment = await _equipmentRepository.UpdateAsync(id);

       if(equipment == null)
        {
            return null;
        }
        return ToDto(equipment);
    }

    public async Task<bool> DeleteEquipmentAsync(int id)
    {
       var deleted =  await _equipmentRepository.DeleteAsync(id);

       return deleted == true ? true : false;
    }

    private static EquipmentDto ToDto(Equipment e)
    {
        return new EquipmentDto
        {
            Id = e.Id,
            EquipmentId = e.EquipmentId,
            EquipmentName = e.EquipmentName,
            UserName = e.UserName,
            TakenTime = e.TakenTime
        };    
    }
    
}