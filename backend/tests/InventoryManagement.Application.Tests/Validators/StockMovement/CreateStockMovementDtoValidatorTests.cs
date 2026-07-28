using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.StockMovement;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Validators.StockMovement;
using Moq;
using InventoryManagement.Domain.Entities;


namespace InventoryManagement.Application.Tests.Validators.StockMovement;

public class CreateStockMovementDtoValidatorTests
{
    private readonly Mock<IProductRepository> _productRepository = new();
    private readonly CreateStockMovementDtoValidator _validator;

    public CreateStockMovementDtoValidatorTests()
    {
        _productRepository.Setup(r => r.GetByIdAsync(It.IsAny<int>()))
        .ReturnsAsync(new Product {Id = 1});
          _validator = new CreateStockMovementDtoValidator(_productRepository.Object);
     }


    [Fact]
    public async Task ProductId_ProductDoesNotExist_HasValidationError()
    {
        _productRepository.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Product?) null);
        var dto = new CreateStockMovementDto { TransactionType = "IN", Quantity = 1, ProductId = 999};

        var result = await _validator.TestValidateAsync(dto);

        result.ShouldHaveValidationErrorFor(x => x.ProductId);
    
    }

    [Fact]
    public async Task ProductId_LessThanZero_HasValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto {ProductId = -10 };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.ProductId);
    }



    [Fact]
    public async Task TransactionType_IsEmpty_HasValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto {TransactionType = "" };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.TransactionType);
    }

    [Theory]
    [InlineData("IN")]
    public async Task TransactionType_IsIn_HasNoValidationError(string validType)
    {
        // Given
    var dto = new CreateStockMovementDto {TransactionType = validType };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x=>x.TransactionType);
    }


    [Theory]
    [InlineData("OUT")]
    public async Task TransactionType_IsOut_HasNoValidationError(string validType)
    {
        // Given
    var dto = new CreateStockMovementDto {TransactionType = validType };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x=>x.TransactionType);
    }


    [Theory]
    [InlineData("BETWEEN")]
    public async Task TransactionType_IsFalse_HasValidationError(string invalidType)
    {
        // Given
    var dto = new CreateStockMovementDto {TransactionType = invalidType };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.TransactionType);
    }

    [Fact]
    public async Task Quantity_LessEqualToZero_HasValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto {Quantity = -10 };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.Quantity);
    }

    [Fact]
    public async Task TransactionAmounth_LessEqualToZero_HasValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto {TransactionAmounth = -10 };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.TransactionAmounth);
    }

    [Fact]
    public async Task Description_ExceedLength_HasValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto {Description = new string('a',251)};
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.Description);
    }
    [Fact]
    public async Task Description_AtMaxLength_HasNoValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto {Description = new string('a',250)};
    
        // When
    var result =  await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x=>x.Description);
    }


    [Fact]
    public async Task ValidDto_HasNoValidationError()
    {
        // Given
    var dto = new CreateStockMovementDto { 
        ProductId = 31,
        TransactionType = "IN",
        Quantity = 31,
        TransactionAmounth = 31,
        Description = "Ürün Girişi"
         };
    
        // When
    var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }

}