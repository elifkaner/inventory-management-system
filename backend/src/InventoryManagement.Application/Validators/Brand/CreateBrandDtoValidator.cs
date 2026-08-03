using FluentValidation;
using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.Brand;

public class CreateBrandDtoValidator : AbstractValidator<CreateBrandDto>
{
    public CreateBrandDtoValidator(ICategoryRepository categoryRepository)
    {

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Marka adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Marka adı en fazla 100 karakter olabilir.");
    

        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("Lütfen geçerli bir kategori seçiniz.")
            .MustAsync(async (categoryId, cancellationToken) =>
            {
            var category = await categoryRepository.GetByIdAsync(categoryId);
            return category != null;
        })
            .WithMessage("Belirtilen Kategori Bulunamadı.");
    }
}
