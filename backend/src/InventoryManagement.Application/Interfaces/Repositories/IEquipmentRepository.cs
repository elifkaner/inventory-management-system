
using InventoryManagement.Application.DTOs;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;
public interface IEquipmentRepository
{
    Task<List<Equipment>> GetAllAsync();

    Task<Equipment> AddAsync(Equipment equipment);

    Task<Equipment> UpdateAsync(int id);

    Task<bool> DeleteAsync(int id);
}