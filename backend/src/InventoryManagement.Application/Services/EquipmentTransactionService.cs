using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class EquipmentTransactionService : IEquipmentTransactionService
{
    private readonly IEquipmentTransactionRepository _transactionRepository;
    private readonly IEquipmentRepository _equipmentRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public EquipmentTransactionService(
        IEquipmentTransactionRepository transactionRepository,
        IEquipmentRepository equipmentRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork)
    {
        _transactionRepository = transactionRepository;
        _equipmentRepository = equipmentRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<EquipmentTransactionDto>> GetAllAsync(int? equipmentId, DateTime? fromDate, DateTime? toDate)
    {
        var transactions = await _transactionRepository.GetAllAsync(equipmentId, fromDate, toDate);
        return transactions.Select(ToDto).ToList();
    }

    public async Task<EquipmentTransactionDto?> CreateAsync(CreateEquipmentTransactionDto dto, int? userId)
    {
        await _unitOfWork.BeginTransactionAsync();
        try
        {
            var equipment = await _equipmentRepository.GetByIdAsync(dto.EquipmentId);
            if (equipment == null)
            {
                await _unitOfWork.RollbackAsync();
                return null;
            }

            if (dto.Type == "CheckOut" && equipment.Status != "Available")
            {
                throw new InvalidOperationException("Bu ekipman şu anda müsait değil, teslim alınamaz.");
            }

            if (dto.Type == "CheckIn" && equipment.Status != "InUse")
            {
                throw new InvalidOperationException("Bu ekipman zaten teslim edilmiş durumda.");
            }

            var transaction = new EquipmentTransaction
            {
                EquipmentId = dto.EquipmentId,
                EmployeeName = dto.EmployeeName,
                Type = dto.Type,
                Condition = dto.Condition,
                Notes = dto.Notes,
                Date = DateTime.UtcNow,
                CreatedByUserId = userId
            };

            var created = await _transactionRepository.AddAsync(transaction);

            if (dto.Type == "CheckOut")
            {
                equipment.Status = "InUse";
                equipment.CurrentHolderName = dto.EmployeeName;
            }
            else
            {
                // Çalışır durumda dönerse tekrar kullanılabilir, hasarlı/arızalı dönerse bakıma düşer.
                equipment.Status = dto.Condition == "Working" ? "Available" : "UnderMaintenance";
                equipment.CurrentHolderName = null;
            }

            await _equipmentRepository.UpdateAsync(equipment.Id, equipment);
            await _unitOfWork.CommitAsync();

            created.Equipment = equipment;
            created.CreatedByUser = userId.HasValue ? await _userRepository.GetByIdAsync(userId.Value) : null;

            return ToDto(created);
        }
        catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }

    private static EquipmentTransactionDto ToDto(EquipmentTransaction t)
    {
        return new EquipmentTransactionDto
        {
            Id = t.Id,
            EquipmentId = t.EquipmentId,
            EquipmentCode = t.Equipment?.EquipmentCode ?? "",
            EquipmentName = t.Equipment?.EquipmentName ?? "",
            EmployeeName = t.EmployeeName,
            Type = t.Type,
            Condition = t.Condition,
            Date = t.Date,
            Notes = t.Notes,
            CreatedByUserName = t.CreatedByUser?.Name,
            CreatedByUserRole = t.CreatedByUser?.Role
        };
    }
}
