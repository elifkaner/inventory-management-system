using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.User;
using InventoryManagement.Application.Validators.User;

namespace InventoryManagement.Application.Tests.Validators.User;

public class LoginDtoValidatorTests
{
    private readonly LoginDtoValidator _validator = new();

    [Fact]
    public void Email_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new LoginDto { Email = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void Email_IsInvalidFormat_HasValidationError()
    {
        // Given
        var dto = new LoginDto { Email = "gecersizemail"};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void Password_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new LoginDto { Password = "" };
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Password);
    }

    [Fact]
    public void ValidDto_HasNoValidationError()
    {
        // Given
        var dto = new LoginDto { Email = "admin@admin.com", Password = "admin"};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }


}