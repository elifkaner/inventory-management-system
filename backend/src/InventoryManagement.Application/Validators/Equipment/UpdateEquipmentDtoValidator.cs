using FluentValidation;
using InventoryManagement.Application.DTOs;

namespace InventoryManagement.Application.Validators.Equipment;

public class UpdateEquipmentDtoValidator : AbstractValidator<UpdateEquipmentDto>
{
    private static readonly string[] ValidStatuses = { "Available", "InUse", "UnderMaintenance", "Retired", "InService" };

    public UpdateEquipmentDtoValidator()
    {
        RuleFor(x => x.EquipmentCode)
            .NotEmpty().WithMessage("Ekipman kodu boş bırakılamaz.")
            .MaximumLength(50).WithMessage("Ekipman kodu en fazla 50 karakter olabilir.");

        RuleFor(x => x.EquipmentName)
            .NotEmpty().WithMessage("Ekipman adı boş bırakılamaz.")
            .MaximumLength(150).WithMessage("Ekipman adı en fazla 150 karakter olabilir.");

        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Durum boş bırakılamaz.")
            .Must(status => ValidStatuses.Contains(status))
            .WithMessage($"Durum sadece şunlardan biri olabilir: {string.Join(", ", ValidStatuses)}.");
    }
}
