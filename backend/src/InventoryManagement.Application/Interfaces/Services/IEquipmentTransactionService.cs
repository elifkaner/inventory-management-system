using InventoryManagement.Application.DTOs;

namespace InventoryManagement.Application.Interfaces.Services;
public interface IEquipmentTransactionService
{
    Task<List<EquipmentTransactionDto>> GetAllAsync(int? equipmentId, DateTime? fromDate, DateTime? toDate);

    Task<EquipmentTransactionDto?> CreateAsync(CreateEquipmentTransactionDto dto, int? userId);
}
