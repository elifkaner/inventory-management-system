using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;
public interface IEquipmentTransactionRepository
{
    Task<List<EquipmentTransaction>> GetAllAsync(int? equipmentId, DateTime? fromDate, DateTime? toDate);

    Task<EquipmentTransaction> AddAsync(EquipmentTransaction transaction);
}
