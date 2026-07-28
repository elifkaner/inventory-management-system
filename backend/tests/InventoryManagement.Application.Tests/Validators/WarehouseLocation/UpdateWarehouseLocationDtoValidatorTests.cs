using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.WarehouseLocation;
using InventoryManagement.Application.Validators.WarehouseLocation;

namespace InventoryManagement.Application.Tests.Validators.WarehouseLocation;

public class UpdateWarehouseLocationDtoValidatorTests
{
    private readonly UpdateWarehouseLocationDtoValidator _validator = new();

    [Fact]
    public void Corridor_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Corridor = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Corridor);
    }

    [Fact]
    public void Shelf_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Shelf = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Shelf);
    }


    [Fact]
    public void Section_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Section = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Section);
    }

    [Fact]
    public void Corridor_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Corridor = new string ('A',21)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Corridor);
    }

    [Fact]
    public void Shelf_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Shelf = new string ('A',21)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Shelf);
    }
    [Fact]
    public void Section_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Section = new string ('A',21)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Section);
    }

    [Fact]
    public void Corridor_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Corridor = new string ('A',20)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Corridor);
    }

    [Fact]
    public void Shelf_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Shelf = new string ('A',20)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Shelf);
    }
    
    [Fact]
    public void Section_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Section = new string ('A',20)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Section);
    }

    [Fact]
    public void ValidDto_HasNoValidationError()
    {
        // Given
        var dto = new UpdateWarehouseLocationDto { Corridor = "A", Shelf = "A", Section = "A"};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }
}