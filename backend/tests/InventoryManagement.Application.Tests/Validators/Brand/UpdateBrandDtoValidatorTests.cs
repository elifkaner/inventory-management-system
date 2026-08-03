using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Validators.Brand;
using Moq;
using CategoryEntity = InventoryManagement.Domain.Entities.Category;

namespace InventoryManagement.Application.Tests.Validators.Brand;

public class UpdateBrandDtoValidatorTests
{
    private readonly UpdateBrandDtoValidator _validator;
    private readonly Mock<ICategoryRepository> _categoryRepository = new();

    public UpdateBrandDtoValidatorTests()
    {
        _categoryRepository
            .Setup(x=>x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync( new CategoryEntity { Id = 1} );

        _validator = new UpdateBrandDtoValidator(_categoryRepository.Object);
    }

    [Fact]
    public async Task Name_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateBrandDto { Name = "", CategoryId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task Name_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateBrandDto { Name = new string('a', 101), CategoryId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task Name_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateBrandDto { Name = new string('a', 100), CategoryId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Theory]
    [InlineData(-10)]
    [InlineData(0)]
    public async Task CategoryId_LessOrEqualThanZero_HasValidationError(int invalid)
    {
        // Given
        var dto = new UpdateBrandDto { CategoryId = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CategoryId);
    }

    
    [Fact]
    public async Task CategoryId_IsNotExist_HasValidationError()
    {
        // Given
        _categoryRepository
            .Setup(x=>x.GetByIdAsync(999))
            .ReturnsAsync((CategoryEntity?)null);
        var dto = new UpdateBrandDto { CategoryId = 999 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CategoryId);
    }

    [Fact]
    public async Task ValidDto_HasNoValidationErrors()
    {
        // Given
        var dto = new UpdateBrandDto { Name = "Samsung", CategoryId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }
}
