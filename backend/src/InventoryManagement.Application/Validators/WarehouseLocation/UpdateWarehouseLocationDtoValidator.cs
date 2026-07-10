using FluentValidation;
using InventoryManagement.Application.DTOs.WarehouseLocation;

namespace InventoryManagement.Application.Validators.WarehouseLocation;

public class UpdateWarehouseLocationDtoValidator : AbstractValidator<UpdateWarehouseLocationDto>
{
    public UpdateWarehouseLocationDtoValidator()
    {
        RuleFor(x => x.Corridor)
            .NotEmpty().WithMessage("Koridor boş bırakılamaz.")
            .MaximumLength(20).WithMessage("Koridor en fazla 20 karakter olabilir.");

        RuleFor(x => x.Shelf)
            .NotEmpty().WithMessage("Raf boş bırakılamaz.")
            .MaximumLength(20).WithMessage("Raf en fazla 20 karakter olabilir.");

        RuleFor(x => x.Section)
            .NotEmpty().WithMessage("Göz/bölme boş bırakılamaz.")
            .MaximumLength(20).WithMessage("Göz/bölme en fazla 20 karakter olabilir.");
    }
}
