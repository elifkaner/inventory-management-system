using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Brand;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Validators.Brand;
using Moq;
using CategoryEntity = InventoryManagement.Domain.Entities.Category;

namespace InventoryManagement.Application.Tests.Validators.Brand;

public class CreateBrandDtoValidatorTests
{
    private readonly CreateBrandDtoValidator _validator;

    private readonly Mock<ICategoryRepository> _categoryRepository = new();

    public CreateBrandDtoValidatorTests()
    {
        _categoryRepository
            .Setup(r=>r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync( new CategoryEntity { Id = 1} );

        _validator = new CreateBrandDtoValidator(_categoryRepository.Object);
    }

    [Fact]
    public async Task Name_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateBrandDto { Name = "" , CategoryId = 1};
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task Name_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new CreateBrandDto { Name = new string('a', 101), CategoryId=1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public async Task Name_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new CreateBrandDto { Name = new string('a', 100), CategoryId = 1 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Theory]
    [InlineData(-10)]
    [InlineData(0)]
    public async Task CategoryId_LessAndEqualThan_HasValidationError(int invalid)
    {
        // Given
        var dto = new CreateBrandDto { CategoryId = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CategoryId);
    }

    [Fact]
    public async Task CategoryId_CategoryIsNotExist_HasValidationError()
    {
        // Given
        _categoryRepository
            .Setup(r=>r.GetByIdAsync(999))
            .ReturnsAsync((CategoryEntity?)null);
        var dto = new CreateBrandDto {Name = "Apple", CategoryId=999};
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.CategoryId);
    }


    [Fact]
    public async Task ValidDto_HasNoValidationErrors()
    {
        // Given
        var dto = new CreateBrandDto { Name = "Apple" , CategoryId = 1};
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }
}
