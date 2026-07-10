using FluentValidation;
using InventoryManagement.Application.DTOs.Supplier;

namespace InventoryManagement.Application.Validators.Supplier;

public class UpdateSupplierDtoValidator : AbstractValidator<UpdateSupplierDto>
{
    public UpdateSupplierDtoValidator()
    {
        RuleFor(x => x.CompanyName)
            .NotEmpty().WithMessage("Firma adı boş bırakılamaz.")
            .MaximumLength(150).WithMessage("Firma adı en fazla 150 karakter olabilir.");

        RuleFor(x => x.ContactPerson)
            .NotEmpty().WithMessage("Yetkili kişi adı boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Yetkili kişi adı en fazla 100 karakter olabilir.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Telefon numarası boş bırakılamaz.")
            .Matches(@"^[0-9\s\+\-\(\)]{7,20}$").WithMessage("Geçerli bir telefon numarası giriniz.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("E-posta adresi boş bırakılamaz.")
            .EmailAddress().WithMessage("Geçerli bir e-posta adresi giriniz.");

        RuleFor(x => x.TaxOffice)
            .NotEmpty().WithMessage("Vergi dairesi boş bırakılamaz.")
            .MaximumLength(100).WithMessage("Vergi dairesi en fazla 100 karakter olabilir.");

        RuleFor(x => x.TaxNumber)
            .NotEmpty().WithMessage("Vergi no / TCKN boş bırakılamaz.")
            .Matches(@"^[0-9]{10,11}$").WithMessage("Vergi no 10 haneli, TCKN 11 haneli olmalıdır.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Adres boş bırakılamaz.")
            .MaximumLength(250).WithMessage("Adres en fazla 250 karakter olabilir.");
    }
}
