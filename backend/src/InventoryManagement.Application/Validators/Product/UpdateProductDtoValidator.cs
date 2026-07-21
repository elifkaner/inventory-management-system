using FluentValidation;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.Product;

public class UpdateProductDtoValidator : AbstractValidator<UpdateProductDto>
{
    public UpdateProductDtoValidator(
        ICategoryRepository categoryRepository,
        ISupplierRepository supplierRepository,
        IProductRepository productRepository)
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
            .MaximumLength(50).WithMessage("Barkod en fazla 50 karakter olabilir.")
            .MustAsync(async (dto, barcode, context, cancellationToken) =>
            {
                var existing = await productRepository.GetByBarcodeAsync(barcode);
                if (existing == null)
                {
                    return true;
                }

                var currentProductId = (int)context.RootContextData["ProductId"];
                return existing.Id == currentProductId;
            })
            .WithMessage("Bu barkod başka bir ürün tarafından kullanılıyor.");

        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("Geçerli bir kategori seçiniz.")
            .MustAsync(async (categoryId, cancellationToken) =>
            {
                var category = await categoryRepository.GetByIdAsync(categoryId);
                return category != null;
            })
            .WithMessage("Belirtilen kategori bulunamadı.");

        RuleFor(x => x.BrandName)
            .NotEmpty().WithMessage("Marka adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Marka adı en fazla 100 karakter olabilir.");

        RuleFor(x => x.Model)
            .NotEmpty().WithMessage("Marka adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Marka adı en fazla 100 karakter olabilir.");

        RuleFor(x => x.SupplierId)
            .GreaterThan(0).WithMessage("Geçerli bir tedarikçi seçiniz.")
            .MustAsync(async (supplierId, cancellationToken) =>
            {
                var supplier = await supplierRepository.GetByIdAsync(supplierId);
                return supplier != null;
            })
            .WithMessage("Belirtilen tedarikçi bulunamadı.");
    }
}
