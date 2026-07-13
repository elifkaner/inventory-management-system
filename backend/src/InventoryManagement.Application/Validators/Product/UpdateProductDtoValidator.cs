using FluentValidation;
using InventoryManagement.Application.DTOs.Product;

namespace InventoryManagement.Application.Validators.Product;

public class UpdateProductDtoValidator : AbstractValidator<UpdateProductDto>
{
    public UpdateProductDtoValidator()
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

        RuleFor(x => x.BrandName)
            .NotEmpty().WithMessage("Marka adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Marka adı en fazla 100 karakter olabilir.");

        RuleFor(x => x.SupplierId)
            .GreaterThan(0).WithMessage("Geçerli bir tedarikçi seçiniz.");
    }
}
