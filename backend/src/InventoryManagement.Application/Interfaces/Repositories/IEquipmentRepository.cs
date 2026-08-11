using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;
public interface IEquipmentRepository
{
    Task<List<Equipment>> GetAllAsync();

    Task<Equipment?> GetByIdAsync(int id);

    Task<Equipment> AddAsync(Equipment equipment);

    Task<Equipment?> UpdateAsync(int id, Equipment equipment);

    Task<bool> DeleteAsync(int id);

    /// <summary>Takip edilen bir entity'yi doğrudan kaydeder (servis kaydı için).</summary>
    Task<Equipment?> SaveDirectAsync(Equipment equipment);
}
