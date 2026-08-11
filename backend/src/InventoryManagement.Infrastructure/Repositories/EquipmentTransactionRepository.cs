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
            var fromDateUtc = fromDate.Value.Kind == DateTimeKind.Utc
                ? fromDate.Value
                : DateTime.SpecifyKind(fromDate.Value, DateTimeKind.Utc);
            query = query.Where(t => t.Date >= fromDateUtc);
        }

        if (toDate.HasValue)
        {
            var toDateVal = toDate.Value.TimeOfDay == TimeSpan.Zero ? toDate.Value.Date.AddDays(1).AddTicks(-1) : toDate.Value;
            var toDateUtc = toDateVal.Kind == DateTimeKind.Utc
                ? toDateVal
                : DateTime.SpecifyKind(toDateVal, DateTimeKind.Utc);
            query = query.Where(t => t.Date <= toDateUtc);
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
