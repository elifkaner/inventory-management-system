using InventoryManagement.Application.DTOs;

namespace InventoryManagement.Application.Interfaces.Services;
public interface IEquipmentService
{
    Task<List<EquipmentDto>> GetAllEquipmentsAsync();

    Task<EquipmentDto?> GetEquipmentByIdAsync(int id);

    Task<EquipmentDto> CreateEquipmentAsync(CreateEquipmentDto dto);

    Task<EquipmentDto?> UpdateEquipmentAsync(int id, UpdateEquipmentDto dto);

    Task<bool> DeleteEquipmentAsync(int id);
}
