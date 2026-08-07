using FluentValidation;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.EquipmentTransaction;

public class CreateEquipmentTransactionDtoValidator : AbstractValidator<CreateEquipmentTransactionDto>
{
    private static readonly string[] ValidTypes = { "CheckOut", "CheckIn" };
    private static readonly string[] ValidConditions = { "Working", "Damaged", "NeedsRepair" };

    public CreateEquipmentTransactionDtoValidator(IEquipmentRepository equipmentRepository)
    {
        RuleFor(x => x.EquipmentId)
            .GreaterThan(0).WithMessage("Geçerli bir ekipman seçiniz.")
            .MustAsync(async (equipmentId, cancellationToken) =>
            {
                var equipment = await equipmentRepository.GetByIdAsync(equipmentId);
                return equipment != null;
            })
            .WithMessage("Belirtilen ekipman bulunamadı.");

        RuleFor(x => x.EmployeeName)
            .NotEmpty().WithMessage("Çalışan adı boş bırakılamaz.")
            .MaximumLength(150).WithMessage("Çalışan adı en fazla 150 karakter olabilir.");

        RuleFor(x => x.Type)
            .NotEmpty().WithMessage("İşlem tipi boş bırakılamaz.")
            .Must(type => ValidTypes.Contains(type))
            .WithMessage("İşlem tipi sadece 'CheckOut' (teslim alındı) ya da 'CheckIn' (teslim edildi) olabilir.");

        RuleFor(x => x.Condition)
            .NotEmpty().WithMessage("Ekipman durumu boş bırakılamaz.")
            .Must(condition => ValidConditions.Contains(condition))
            .WithMessage($"Ekipman durumu sadece şunlardan biri olabilir: {string.Join(", ", ValidConditions)}.");

        RuleFor(x => x.Notes)
            .MaximumLength(250).WithMessage("Not en fazla 250 karakter olabilir.");
    }
}
