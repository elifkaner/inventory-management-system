using FluentValidation;
using IlkDotNetApp.DTOs;

namespace IlkDotNetApp.Validators.Product;

public class CreateProductDtoValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductDtoValidator()
    {
        RuleFor(x => x.ProductName)
            .NotEmpty().WithMessage("Ürün adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Ürün adı en fazla 100 karakter olabilir.");

        RuleFor(x => x.PurchasePrice)
            .GreaterThanOrEqualTo(0).WithMessage("Alış fiyatı negatif olamaz.");

        RuleFor(x => x.SalePrice)
            .GreaterThan(0).WithMessage("Satış fiyatı 0'dan büyük olmalıdır.");

        RuleFor(x => x.Barcode)
            .NotEmpty().WithMessage("Barkod boş bırakılamaz.")
            .MaximumLength(50).WithMessage("Barkod en fazla 50 karakter olabilir.");

        RuleFor(x => x.StockQuantity)
            .GreaterThanOrEqualTo(0).WithMessage("Stok miktarı negatif olamaz.");

        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("Geçerli bir kategori seçiniz.");

        RuleFor(x => x.BrandId)
            .GreaterThan(0).WithMessage("Geçerli bir marka seçiniz.");

        RuleFor(x => x.SupplierId)
            .GreaterThan(0).WithMessage("Geçerli bir tedarikçi seçiniz.");
    }
}