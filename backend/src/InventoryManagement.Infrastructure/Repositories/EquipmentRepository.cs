using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class EquipmentRepository : IEquipmentRepository
{
    private readonly AppDbContext _context;

    public EquipmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Equipment>> GetAllAsync()
    {
        return await _context.Equipments.ToListAsync();
    }

    public async Task<Equipment?> GetByIdAsync(int id)
    {
        return await _context.Equipments.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Equipment> AddAsync(Equipment equipment)
    {
        await _context.Equipments.AddAsync(equipment);
        await _context.SaveChangesAsync();
        return equipment;
    }

    public async Task<Equipment?> UpdateAsync(int id, Equipment updatedEquipment)
    {
        var equipment = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == id);
        if (equipment == null)
        {
            return null;
        }

        equipment.EquipmentCode = updatedEquipment.EquipmentCode;
        equipment.EquipmentName = updatedEquipment.EquipmentName;
        equipment.Status = updatedEquipment.Status;
        equipment.CurrentHolderName = updatedEquipment.CurrentHolderName;

        await _context.SaveChangesAsync();
        return equipment;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var equipment = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == id);
        if (equipment == null)
        {
            return false;
        }

        _context.Remove(equipment);
        await _context.SaveChangesAsync();
        return true;
    }
}
