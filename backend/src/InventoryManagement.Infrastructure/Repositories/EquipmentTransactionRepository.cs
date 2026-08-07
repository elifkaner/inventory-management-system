using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class EquipmentTransactionRepository : IEquipmentTransactionRepository
{
    private readonly AppDbContext _context;

    public EquipmentTransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<EquipmentTransaction>> GetAllAsync(int? equipmentId, DateTime? fromDate, DateTime? toDate)
    {
        var query = _context.EquipmentTransactions
            .Include(t => t.Equipment)
            .Include(t => t.CreatedByUser)
            .AsQueryable();

        if (equipmentId.HasValue)
        {
            query = query.Where(t => t.EquipmentId == equipmentId.Value);
        }

        if (fromDate.HasValue)
        {
            query = query.Where(t => t.Date >= fromDate.Value);
        }

        if (toDate.HasValue)
        {
            query = query.Where(t => t.Date <= toDate.Value);
        }

        return await query.OrderByDescending(t => t.Date).ToListAsync();
    }

    public async Task<EquipmentTransaction> AddAsync(EquipmentTransaction transaction)
    {
        await _context.EquipmentTransactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }
}
