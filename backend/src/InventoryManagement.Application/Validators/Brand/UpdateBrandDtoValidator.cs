using FluentValidation;
using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.Brand;

public class UpdateBrandDtoValidator : AbstractValidator<UpdateBrandDto>
{
    public UpdateBrandDtoValidator(ICategoryRepository categoryRepository)
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Marka adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Marka adı en fazla 100 karakter olabilir.");
    
        RuleFor(x=>x.CategoryId)
            .GreaterThan(0).WithMessage("Geçerli bir kategori giriniz.")
            .MustAsync(async (categoryId, cancellationToken) =>
            {
                var category = await categoryRepository.GetByIdAsync(categoryId);
                return category != null;
            })
            .WithMessage("Belirtilen Id kategori db'de bulunamadı. ");
            
    }


}
