using FluentValidation;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Repositories;

namespace InventoryManagement.Application.Validators.Product;

public class CreateProductDtoValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductDtoValidator(
        IWarehouseLocationRepository warehouseLocationRepository,
        ICategoryRepository categoryRepository,
        ISupplierRepository supplierRepository)
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

        RuleFor(x => x.SupplierId)
            .GreaterThan(0).WithMessage("Geçerli bir tedarikçi seçiniz.")
            .MustAsync(async (supplierId, cancellationToken) =>
            {
                var supplier = await supplierRepository.GetByIdAsync(supplierId);
                return supplier != null;
            })
            .WithMessage("Belirtilen tedarikçi bulunamadı.");

        RuleFor(x => x.LocationId)
            .MustAsync(async (locationId, cancellationToken) =>
            {
                if (locationId == null)
                {
                    return true; // konum opsiyonel, boş bırakılabilir
                }

                var location = await warehouseLocationRepository.GetByIdAsync(locationId.Value);
                return location != null;
            })
            .WithMessage("Belirtilen depo konumu bulunamadı.");
    }
}
