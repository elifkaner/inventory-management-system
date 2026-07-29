using FluentValidation;
using InventoryManagement.Application.DTOs.Model;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.Model;

public class UpdateModelDtoValidator : AbstractValidator<UpdateModelDto>
{
    public UpdateModelDtoValidator(IBrandRepository brandRepository)
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Model adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Model adı en fazla 100 karakter olabilir.");

        RuleFor(x => x.BrandId)
            .GreaterThan(0).WithMessage("Geçerli bir marka seçiniz.")
            .MustAsync(async (brandId, cancellationToken) =>
            {
                var brand = await brandRepository.GetByIdAsync(brandId);
                return brand != null;
            })
            .WithMessage("Belirtilen marka bulunamadı.");
    }
}
