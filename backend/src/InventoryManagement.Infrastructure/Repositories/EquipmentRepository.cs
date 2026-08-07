using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public class EquipmentRepository : IEquipmentRepository
{
    private readonly AppDbContext _context;

    public EquipmentRepository(AppDbContext context)
    {
        _context = context;
    }

    public  async Task<List<Equipment>> GetAllAsync()
    {
        return await _context.Equipments.ToListAsync();
    }
    public async Task<Equipment> AddAsync(Equipment equipment)
    {
        await _context.Equipments.AddAsync(equipment);
        await _context.SaveChangesAsync();
        return equipment;
    }

    public async Task<Equipment?> UpdateAsync(int id)
    {
        var updatedEquipment = await _context.Equipments.FirstOrDefaultAsync(x=>x.Id==id);
        if (updatedEquipment == null)
        {
            return null;
        }

        var equipments = new Equipment
        {
            EquipmentId = updatedEquipment.EquipmentId,
            EquipmentName = updatedEquipment.EquipmentName,
            UserName = updatedEquipment.UserName,
            TakenTime = DateTime.Now,
        };
        await _context.AddAsync(equipments);
        await _context.SaveChangesAsync();
        return equipments;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var equipments = await _context.Equipments.FirstOrDefaultAsync(x=>x.Id==id);
        if( equipments == null)
        {
            return false;
        }
        _context.Remove(equipments);
        await _context.SaveChangesAsync();
        return true;
    }
    
}
