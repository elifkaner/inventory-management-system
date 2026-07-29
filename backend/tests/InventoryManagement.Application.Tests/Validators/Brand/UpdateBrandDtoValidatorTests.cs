using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Validators.Brand;

namespace InventoryManagement.Application.Tests.Validators.Brand;

public class UpdateBrandDtoValidatorTests
{
    private readonly UpdateBrandDtoValidator _validator = new();

    [Fact]
    public void Name_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateBrandDto { Name = "" };
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateBrandDto { Name = new string('a', 101) };
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateBrandDto { Name = new string('a', 100) };
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void ValidDto_HasNoValidationErrors()
    {
        // Given
        var dto = new UpdateBrandDto { Name = "Samsung" };
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }
}
