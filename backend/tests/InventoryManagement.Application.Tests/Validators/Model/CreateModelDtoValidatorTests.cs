using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Model;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Validators.Model;
using Moq;
using BrandEntity = InventoryManagement.Domain.Entities.Brand;

namespace InventoryManagement.Application.Tests.Validators.Model;

public class CreateModelDtoValidatorTests
{
    private readonly Mock<IBrandRepository> _brandRepository = new();
    private readonly CreateModelDtoValidator _validator;

    public CreateModelDtoValidatorTests()
    {
        _brandRepository
            .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new BrandEntity { Id = 1 });

        _validator = new CreateModelDtoValidator(_brandRepository.Object);
    }

    [Fact]
    public async Task Name_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateModelDto { Name = "", BrandId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task Name_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new CreateModelDto { Name = new string('a', 101), BrandId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task Name_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new CreateModelDto { Name = new string('a', 100), BrandId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task BrandId_LessThanZero_HasValidationError()
    {
        // Given
        var dto = new CreateModelDto { Name = "iPhone 16", BrandId = -1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.BrandId);
    }

    [Fact]
    public async Task BrandId_BrandDoesNotExist_HasValidationError()
    {
        // Given
        _brandRepository.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((BrandEntity?)null);
        var dto = new CreateModelDto { Name = "iPhone 16", BrandId = 999 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.BrandId);
    }

    [Fact]
    public async Task ValidDto_HasNoValidationErrors()
    {
        // Given
        var dto = new CreateModelDto { Name = "iPhone 16", BrandId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }
}
