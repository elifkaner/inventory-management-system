using InventoryManagement.Application.DTOs;

namespace InventoryManagement.Application.Interfaces.Services;
public interface IEquipmentService
{
    Task<List<EquipmentDto>> GetAllEquipmentsAsync();

    Task<EquipmentDto> CreateEquipmentAsync(EquipmentDto dto);

    Task<EquipmentDto> UpdateEquipmentAsync(int id);

    Task<bool> DeleteEquipmentAsync(int id);

}