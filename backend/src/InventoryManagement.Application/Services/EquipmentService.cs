using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Application.Interfaces.Services;


namespace InventoryManagement.Application.Services;

public class EquipmentService : IEquipmentService
{
    private readonly IEquipmentRepository _equipmentRepository;
    private readonly IEquipmentTransactionRepository _transactionRepository;

    public EquipmentService(IEquipmentRepository equipmentRepository, IEquipmentTransactionRepository transactionRepository)
    {
        _equipmentRepository = equipmentRepository;
        _transactionRepository = transactionRepository;
    }

    public async Task<List<EquipmentDto>> GetAllEquipmentsAsync()
    {
        var equipments = await _equipmentRepository.GetAllAsync();
        var results = equipments.Select(ToDto).ToList();
        return results;
    }

    public async Task<EquipmentDto?> GetEquipmentByIdAsync(int id)
    {
        var equipment = await _equipmentRepository.GetByIdAsync(id);
        return equipment == null ? null : ToDto(equipment);
    }

    public async Task<EquipmentDto> CreateEquipmentAsync(CreateEquipmentDto dto)
    {
        var code = dto.EquipmentCode;
        if (string.IsNullOrWhiteSpace(code))
        {
            var all = await _equipmentRepository.GetAllAsync();
            var usedNumbers = new HashSet<int>();

            foreach (var eq in all)
            {
                if (!string.IsNullOrEmpty(eq.EquipmentCode))
                {
                    var match = System.Text.RegularExpressions.Regex.Match(eq.EquipmentCode, @"\d+");
                    if (match.Success && int.TryParse(match.Value, out int num) && num > 0)
                    {
                        usedNumbers.Add(num);
                    }
                }
            }

            int candidate = 1;
            while (usedNumbers.Contains(candidate))
            {
                candidate++;
            }

            string numStr = candidate.ToString();
            string padded = numStr.PadLeft(Math.Max(3, numStr.Length), '0');
            code = $"EQP-{padded}";
        }

        var equipment = new Equipment
        {
            EquipmentCode = code,
            EquipmentName = dto.EquipmentName,
            Status = "Available",
            LastMaintenanceDate = dto.LastMaintenanceDate.HasValue ? DateTime.SpecifyKind(dto.LastMaintenanceDate.Value, DateTimeKind.Utc) : null
        };

        var created = await _equipmentRepository.AddAsync(equipment);
        return ToDto(created);
    }

    private static string GeneratePrefix(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) return "EQP";

        var cleanName = System.Text.RegularExpressions.Regex.Replace(name.Trim(), @"[^a-zA-Z0-9\s]", "").ToUpperInvariant();
        var words = cleanName.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        if (words.Length >= 1 && words[0].Length >= 3)
        {
            return words[0].Substring(0, 3);
        }
        else if (words.Length >= 1 && words[0].Length >= 2)
        {
            return words[0];
        }

        return "EQP";
    }

    public async Task<EquipmentDto?> UpdateEquipmentAsync(int id, UpdateEquipmentDto dto)
    {
        var equipment = new Equipment
        {
            EquipmentCode = dto.EquipmentCode,
            EquipmentName = dto.EquipmentName,
            Status = dto.Status,
            LastMaintenanceDate = dto.LastMaintenanceDate.HasValue ? DateTime.SpecifyKind(dto.LastMaintenanceDate.Value, DateTimeKind.Utc) : null
        };

        var updated = await _equipmentRepository.UpdateAsync(id, equipment);
        if (updated == null)
        {
            return null;
        }
        return ToDto(updated);
    }

    public async Task<bool> DeleteEquipmentAsync(int id)
    {
        var deleted = await _equipmentRepository.DeleteAsync(id);
        return deleted;
    }

    public async Task<EquipmentDto?> ProcessServiceRecordAsync(ServiceRecordDto dto)
    {
        var existing = await _equipmentRepository.GetByIdAsync(dto.EquipmentId);
        if (existing == null) return null;

        string transactionType;
        string notes;

        if (dto.Action == "send")
        {
            // Sadece Hurda veya Servis Bekliyor olanlar servise gönderilebilir
            if (existing.Status != "UnderMaintenance" && existing.Status != "Retired")
            {
                throw new InvalidOperationException(
                    $"Bu cihaz servise gönderilemez. Mevcut durumu: '{existing.Status}'. " +
                    "Yalnızca 'Servis Bekliyor' veya 'Hurda' durumundaki cihazlar servise gönderilebilir.");
            }

            existing.Status = "InService";
            transactionType = "SentToService";
            notes = $"{existing.EquipmentName} ({existing.EquipmentCode}) servise gönderildi.";
        }
        else if (dto.Action == "return")
        {
            // Sadece Serviste (InService) olanlar teslim alınabilir
            if (existing.Status != "InService")
            {
                throw new InvalidOperationException(
                    $"Bu cihaz servisten teslim alınamaz. Mevcut durumu: '{existing.Status}'. " +
                    "Yalnızca 'Serviste' durumundaki cihazlar teslim alınabilir.");
            }

            existing.Status = "Available";
            existing.LastMaintenanceDate = DateTime.UtcNow;
            transactionType = "ReturnedFromService";
            var descPart = !string.IsNullOrWhiteSpace(dto.Description) ? $" Yapılan işlem: {dto.Description.Trim()}." : "";
            notes = $"{existing.EquipmentName} ({existing.EquipmentCode}) servisten teslim alındı. Son bakım tarihi: {DateTime.UtcNow:dd.MM.yyyy}.{descPart}";
        }
        else
        {
            return null;
        }

        // Servis kaydı logla
        var log = new EquipmentTransaction
        {
            EquipmentId = existing.Id,
            EmployeeName = "Servis",
            Type = transactionType,
            Condition = "Working",
            Date = DateTime.UtcNow,
            Notes = notes,
            CreatedByUserId = null
        };
        await _transactionRepository.AddAsync(log);

        var updated = await _equipmentRepository.SaveDirectAsync(existing);
        return updated == null ? null : ToDto(updated);
    }

    private static EquipmentDto ToDto(Equipment e)
    {
        return new EquipmentDto
        {
            Id = e.Id,
            EquipmentCode = e.EquipmentCode,
            EquipmentName = e.EquipmentName,
            Status = e.Status,
            CurrentHolderName = e.CurrentHolderName,
            LastMaintenanceDate = e.LastMaintenanceDate
        };
    }
}
