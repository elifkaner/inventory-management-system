using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Validators.Product;
using Moq;
using ProductEntity = InventoryManagement.Domain.Entities.Product;
using CategoryEntity = InventoryManagement.Domain.Entities.Category;
using SupplierEntity = InventoryManagement.Domain.Entities.Supplier;
using FluentValidation;

namespace InventoryManagement.Application.Tests.Validators.Product;


public class UpdateProductDtoValidatorTests
{
    private readonly UpdateProductDtoValidator _validator;
    private readonly Mock<ICategoryRepository> _categoryRepository = new();

     private readonly Mock<ISupplierRepository> _supplierRepository = new();

      private readonly Mock<IProductRepository> _productRepository = new();

    public UpdateProductDtoValidatorTests()
    {
        _supplierRepository
        .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
        .ReturnsAsync(new SupplierEntity {Id = 1});

        _categoryRepository
        .Setup(r => r.GetByIdAsync(It.IsAny<int>()))
        .ReturnsAsync(new CategoryEntity {Id = 1});

        _productRepository
        .Setup(r => r.GetByBarcodeAsync(It.IsAny<string>()))
        .ReturnsAsync((ProductEntity?)null);

        _validator = new UpdateProductDtoValidator
        (
            _categoryRepository.Object,
            _supplierRepository.Object,
            _productRepository.Object
            );
    }

    private ValidationContext<UpdateProductDto> ContextFor(UpdateProductDto dto, int productId = 1)
{
    var context = new ValidationContext<UpdateProductDto>(dto);   // 1) Formu bir pakete koy
    context.RootContextData["ProductId"] = productId;             // 2) Pakete yapışkan notu yapıştır: "1 numaralı ürün için"
    return context;                                                // 3) Hazır paketi geri ver
}   
    

    [Fact]
    public async Task ProductName_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {ProductName = ""};
        // When
        var result =  await _validator.TestValidateAsync(dto);    
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.ProductName);
    }

    [Fact]
    public async Task ProductName_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {ProductName = new string('a',101)};
        // When
        var result = await _validator.TestValidateAsync(dto);    
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.ProductName);
    }

    [Fact]
    public async Task ProductName_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateProductDto {ProductName = new string('a',100)};
        // When
        var result = await _validator.TestValidateAsync(dto);     
        // Then
        result.ShouldNotHaveValidationErrorFor(x =>x.ProductName);
    }

    [Fact]
    public async Task PurchasePrice_LessThanZero_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {PurchasePrice = -10};
        // When
        var result = await _validator.TestValidateAsync(dto);    
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.PurchasePrice);
    }


    [Fact]
    public async Task SalePrice_LessThanOrZero_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {SalePrice = -10};
        // When
        var result = await _validator.TestValidateAsync(dto);   
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.SalePrice);
    }
    [Fact]
    public async Task Barcode_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto { Barcode = "" };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Barcode);
    }

    [Fact]
    public async Task Barcode_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto { Barcode = new string('9',51) };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Barcode);
    }

    [Fact]
    public async Task Barcode_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateProductDto { Barcode = new string('9',50) };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Barcode);
    }

    [Fact]
    public async Task Barcode_BelongsToAnotherProduct_HasValidationError()
    {
        // Given
        _productRepository
        .Setup(x=>x.GetByBarcodeAsync("999"))
        .ReturnsAsync(new ProductEntity { Id = 99, Barcode = "999"});

        var dto = new UpdateProductDto {Barcode = "999"};
        var result = await _validator.TestValidateAsync(ContextFor(dto)); 
        // When
        result.ShouldHaveValidationErrorFor(x => x.Barcode);
        // Then
    }

    [Fact]
    public async Task Barcode_BelongsToSameProduct_HasNoValidationError()
    {
        // Given
        _productRepository
        .Setup(x=>x.GetByBarcodeAsync("999"))
        .ReturnsAsync(new ProductEntity { Id = 1, Barcode = "999"});

        var dto = new UpdateProductDto {Barcode = "999"};
        var result = await _validator.TestValidateAsync(ContextFor(dto)); 
        // When
        result.ShouldNotHaveValidationErrorFor(x => x.Barcode);
        // Then
    }

    [Fact]
    public async Task CategoryId_LessThenOrZero_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto { CategoryId = -31 };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CategoryId);
    }

    [Fact]
    public async Task CategoryId_CategoryIdDoesNotExist_HasValidationError()
    {
        // Given
        _categoryRepository
            .Setup(x => x.GetByIdAsync(999))
            .ReturnsAsync((CategoryEntity?)null);

        var dto = new UpdateProductDto { CategoryId = 999 };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CategoryId);
    }

        [Fact]
    public async Task BrandName_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {BrandName = ""};
        // When
        var result = await _validator.TestValidateAsync(dto);   
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.BrandName);
    }

    [Fact]
    public async Task BrandName_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {BrandName = new string('a',101)};
        // When
        var result = await _validator.TestValidateAsync(dto);    
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.BrandName);
    }

    [Fact]
    public async Task BrandName_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateProductDto {BrandName = new string('a',100)};
        // When
        var result = await _validator.TestValidateAsync(dto);    
        // Then
        result.ShouldNotHaveValidationErrorFor(x =>x.BrandName);
    }

        [Fact]
    public async Task Model_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {Model = ""};
        // When
        var result = await _validator.TestValidateAsync(dto);     
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.Model);
    }

    [Fact]
    public async Task Model_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto {Model = new string('a',101)};
        // When
        var result = await _validator.TestValidateAsync(dto);     
        // Then
        result.ShouldHaveValidationErrorFor(x =>x.Model);
    }

    [Fact]
    public async Task Model_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateProductDto {Model = new string('a',100)};
        // When
        var result = await _validator.TestValidateAsync(dto);    
        // Then
        result.ShouldNotHaveValidationErrorFor(x =>x.Model);
    }

    [Fact]
    public async Task SupplierId_LessThanZero_HasValidationError()
    {
        // Given
        var dto = new UpdateProductDto { SupplierId = -31 };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldHaveValidationErrorFor(x => x.SupplierId);
    }

    [Fact]
    public async Task SupplierId_SupplierDoesNotExist_HasValidationError()
    {
        // Given
         _supplierRepository
            .Setup(r => r.GetByIdAsync(999))
            .ReturnsAsync((SupplierEntity?) null);
        var dto = new UpdateProductDto {SupplierId = 999};
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldHaveValidationErrorFor(x => x.SupplierId); 
    }

    [Fact]
    public async Task ValidDto_HasNoValidationError()
    {
        // Given
        var dto = new UpdateProductDto 
        {
            ProductName = "Telefon",
            PurchasePrice = 300,
            SalePrice = 600,
            Barcode = "98973792",
            CategoryId = 3,
            BrandName = "Apple",
            Model = "Iphone 16",
            SupplierId = 3,
        };
        // When
        var result = await _validator.TestValidateAsync(dto); 
        // Then
        result.ShouldNotHaveAnyValidationErrors(); 
    }




}