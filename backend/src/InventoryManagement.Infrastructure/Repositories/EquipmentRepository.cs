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
        await _context.Ensure100EquipmentsSeededAsync();
        return await _context.Equipments.OrderBy(x => x.Id).ToListAsync();
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
        equipment.LastMaintenanceDate = updatedEquipment.LastMaintenanceDate;

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

    public async Task<Equipment?> SaveDirectAsync(Equipment equipment)
    {
        // Entity zaten context tarafından takip ediliyor (GetByIdAsync'ten geldi)
        // Update() çağrısı zaten takip edilen entity'de tracking conflict'e yol açabilir
        await _context.SaveChangesAsync();
        return equipment;
    }
}
