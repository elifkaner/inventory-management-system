using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Application.Interfaces.Services;


namespace InventoryManagement.Application.Services;

public class EquipmentService : IEquipmentService
{
    private readonly IEquipmentRepository _equipmentRepository;

    public EquipmentService(IEquipmentRepository equipmentRepository)
    {
        _equipmentRepository = equipmentRepository;
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
            var prefix = GeneratePrefix(dto.EquipmentName);
            var all = await _equipmentRepository.GetAllAsync();
            int maxNum = 0;
            var regex = new System.Text.RegularExpressions.Regex($@"^{prefix}-(\d+)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            foreach (var eq in all)
            {
                if (!string.IsNullOrEmpty(eq.EquipmentCode))
                {
                    var match = regex.Match(eq.EquipmentCode);
                    if (match.Success && int.TryParse(match.Groups[1].Value, out int num) && num > maxNum)
                    {
                        maxNum = num;
                    }
                }
            }
            code = $"{prefix}-{(maxNum + 1).ToString("D3")}";
        }

        var equipment = new Equipment
        {
            EquipmentCode = code,
            EquipmentName = dto.EquipmentName,
            Status = "Available"
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
            Status = dto.Status
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

    private static EquipmentDto ToDto(Equipment e)
    {
        return new EquipmentDto
        {
            Id = e.Id,
            EquipmentCode = e.EquipmentCode,
            EquipmentName = e.EquipmentName,
            Status = e.Status,
            CurrentHolderName = e.CurrentHolderName
        };
    }
}
