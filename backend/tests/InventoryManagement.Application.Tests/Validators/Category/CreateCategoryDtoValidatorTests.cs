using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Category;
using InventoryManagement.Application.Validators.Category;

namespace InventoryManagement.Application.Tests.Validators.Category;
public class CreateCategoryDtoValidatorTests
{
    private readonly CreateCategoryDtoValidator _validator = new();

    [Fact]
    public void Name_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateCategoryDto { Name = "" };
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new CreateCategoryDto { Name = new string('a',101)};
    
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new CreateCategoryDto { Name = new string('a',100)};
    
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor( x => x.Name);
    }

    [Fact]
    public void ValidDto_HasNoValidationError()
    {
        // Given
        var dto = new CreateCategoryDto { Name = "Elektronik"};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }

}