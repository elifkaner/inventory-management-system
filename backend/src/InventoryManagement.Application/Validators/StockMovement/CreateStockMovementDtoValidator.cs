using FluentValidation;
using InventoryManagement.Application.DTOs.StockMovement;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.StockMovement;

public class CreateStockMovementDtoValidator : AbstractValidator<CreateStockMovementDto>
{
    public CreateStockMovementDtoValidator(IProductRepository productRepository)
    {
        RuleFor(x => x.ProductId)
            .GreaterThan(0).WithMessage("Geçerli bir ürün seçiniz.")
            .MustAsync(async (productId, cancellationToken) =>
            {
                var product = await productRepository.GetByIdAsync(productId);
                return product != null;
            })
            .WithMessage("Belirtilen ürün bulunamadı.");

        RuleFor(x => x.TransactionType)
            .NotEmpty().WithMessage("Hareket tipi boş bırakılamaz.")
            .Must(type => type == "IN" || type == "OUT")
            .WithMessage("Hareket tipi sadece 'IN' ya da 'OUT' olabilir.");

        RuleFor(x => x.Quantity)
            .GreaterThan(0).WithMessage("Miktar 0'dan büyük olmalıdır.");

        RuleFor(x => x.TransactionAmounth)
            .GreaterThanOrEqualTo(0).WithMessage("Tutar negatif olamaz.");

        RuleFor(x => x.Description)
            .MaximumLength(250).WithMessage("Açıklama en fazla 250 karakter olabilir.");
    }
}