using FluentValidation;
using InventoryManagement.Application.DTOs.User;

namespace InventoryManagement.Application.Validators.User;

public class RegisterDtoValidator : AbstractValidator<RegisterDto>
{
    public RegisterDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("İsim boş bırakılamaz.")
            .MaximumLength(100).WithMessage("İsim en fazla 100 karakter olabilir.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email boş bırakılamaz.")
            .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Şifre boş bırakılamaz.")
            .MinimumLength(6).WithMessage("Şifre en az 6 karakter olmalıdır.");
    }
}
