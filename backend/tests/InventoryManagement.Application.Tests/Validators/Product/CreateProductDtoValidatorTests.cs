using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Validators.Product;
using Moq;
using WarehouseLocationEntity = InventoryManagement.Domain.Entities.WarehouseLocation;
using ProductEntity = InventoryManagement.Domain.Entities.Product;
using CategoryEntity = InventoryManagement.Domain.Entities.Category;
using SupplierEntity = InventoryManagement.Domain.Entities.Supplier;
using BrandEntity = InventoryManagement.Domain.Entities.Brand;
using ModelEntity = InventoryManagement.Domain.Entities.Model;
using InventoryManagement.Application.DTOs.WarehouseLocation;

namespace InventoryManagement.Application.Tests.Validators.Product;

public class CreateProductDtoValidatorTests
{
    private readonly CreateProductDtoValidator _validator;
    private readonly Mock<IWarehouseLocationRepository> _warehouseLocationRepository = new();
    private readonly Mock<ICategoryRepository>  _categoryRepository = new();
    private readonly Mock<ISupplierRepository> _supplierRepository = new();
    private readonly Mock<IProductRepository> _productRepository = new();
    private readonly Mock<IBrandRepository> _brandRepository = new();
    private readonly Mock<IModelRepository> _modelRepository = new();


    public CreateProductDtoValidatorTests()
    {
        _warehouseLocationRepository
            .Setup(x=>x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new WarehouseLocationEntity {Id = 1});

         _brandRepository
            .Setup(x=>x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new BrandEntity {Id = 1});

         _categoryRepository
            .Setup(x=>x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new CategoryEntity {Id = 1});

         _modelRepository
            .Setup(x=>x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new ModelEntity {Id = 1, BrandId = 1});

         _productRepository
            .Setup(x=>x.GetByBarcodeAsync(It.IsAny<string>()))
            .ReturnsAsync((ProductEntity?) null );

         _supplierRepository
            .Setup(x=>x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new SupplierEntity {Id = 1});

        _validator = new CreateProductDtoValidator
        (
            _warehouseLocationRepository.Object,
            _categoryRepository.Object,
            _supplierRepository.Object,
            _productRepository.Object,
            _brandRepository.Object,
            _modelRepository.Object     
        );
    }

    [Fact]
    public async Task ProductName_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateProductDto { ProductName = "" };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.ProductName );
    }

    [Fact]
    public async Task ProductName_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new CreateProductDto { ProductName = new string( 's' , 101 )};
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.ProductName );
    }

    [Fact]
    public async Task ProductName_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new CreateProductDto { ProductName = new string( 'a', 100) };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor( x => x.ProductName );
    }

    [Fact]
    public async Task PurchasePrice_LessThanZero_HasValidationError()
    {
        // Given
        var dto = new CreateProductDto { PurchasePrice = -10 };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.PurchasePrice );
    }

    [Theory]
    [InlineData(-10)]
    [InlineData(0)]

    public async Task SalePrice_LessThanOrEqualZero_HasValidationError( int invalid )
    {
        // Given
        var dto = new CreateProductDto { SalePrice = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.SalePrice );
    }

    [Fact]
    public async Task Barcode_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateProductDto { Barcode = "" };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.Barcode );
    }

    [Fact]
    public async Task Barcode_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new CreateProductDto { Barcode = new string( 's' , 51 )};
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.Barcode );
    }

    [Fact]
    public async Task Barcode_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new CreateProductDto { Barcode = new string( 'a', 50) };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor( x => x.Barcode );
    }

    [Fact]
    public async Task Barcode_IsBarcodeExist_HasValidationError()
    {
        // Given
        _productRepository
            .Setup(x => x.GetByBarcodeAsync("1"))
            .ReturnsAsync(new ProductEntity { Barcode = "1" });

        // When
        var dto = new CreateProductDto { Barcode = "1"};
        // Then
        var result = await _validator.TestValidateAsync(dto);
        result.ShouldHaveValidationErrorFor(x=>x.Barcode);
    }


    [Theory]
    [InlineData(-10)]
    public async Task StockQuantity_LessThanZero_HasValidationError( int invalid )
    {
        // Given
        var dto = new CreateProductDto { StockQuantity = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.StockQuantity );
    }

    [Theory]
    [InlineData(-10)]
    [InlineData(0)]
    public async Task CategoryId_LessThanOrEqualZero_HasValidationError( int invalid )
    {
        // Given
        var dto = new CreateProductDto { CategoryId = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.CategoryId );
    }

    [Fact]
    public async Task  CategoryId_DoesNotExist_HasValidationError()
    {
        // Given
        _categoryRepository
        .Setup(x => x.GetByIdAsync(999))
        .ReturnsAsync((CategoryEntity?)null);
        // When
        var dto = new CreateProductDto { CategoryId = 999 };
        // Then
        var result = await _validator.TestValidateAsync(dto);
        result.ShouldHaveValidationErrorFor( x => x.CategoryId);
    }

    [Theory]
    [InlineData(-10)]
    [InlineData(0)]
    public async Task BrandId_LessThanOrEqualZero_HasValidationError( int invalid )
    {
        // Given
        var dto = new CreateProductDto { BrandId = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.BrandId );
    }

    [Fact]
    public async Task  BrandId_DoesNotExist_HasValidationError()
    {
        // Given
        _brandRepository
        .Setup(x => x.GetByIdAsync(999))
        .ReturnsAsync((BrandEntity?)null);
        var dto = new CreateProductDto { BrandId = 999};
        var result = await _validator.TestValidateAsync(dto);
        result.ShouldHaveValidationErrorFor(x => x.BrandId);
    }


    [Theory]
    [InlineData(-10)]
    [InlineData(0)]
    public async Task ModelId_LessThanOrEqualZero_HasValidationError( int invalid )
    {
        // Given
        var dto = new CreateProductDto { ModelId = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.ModelId );
    }

    [Fact]
    public async Task  ModelId_DoesNotExist_HasValidationError()
    {
        // Given
        _modelRepository
        .Setup(x => x.GetByIdAsync(999))
        .ReturnsAsync((ModelEntity?)null);
        var dto = new CreateProductDto { ModelId = 999};
        var result = await _validator.TestValidateAsync(dto);
        result.ShouldHaveValidationErrorFor(x => x.ModelId);
    }

    [Fact]
    public async Task ModelId_DoesNotBelongToSelectedBrand_HasValidationError()
    {
        _modelRepository
            .Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync(new ModelEntity { Id = 1, BrandId = 2} );
            var dto = new CreateProductDto { ModelId = 1, BrandId = 3 };
            var result = await _validator.TestValidateAsync(dto);
            result.ShouldHaveValidationErrorFor(x => x.ModelId);
    }


    [Fact]
    public async Task ModelId_DoesBelongToSelectedBrand_HasNoValidationError()
    {
        _modelRepository
            .Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync(new ModelEntity { Id = 1, BrandId = 2} );

            var dto = new CreateProductDto { ModelId = 1, BrandId = 2 };

            var result = await _validator.TestValidateAsync(dto);
            
            result.ShouldNotHaveValidationErrorFor(x => x.ModelId);
    }

    [Theory]
    [InlineData(-10)]
    [InlineData(0)]
    public async Task SupplierId_LessThanOrEqualZero_HasValidationError( int invalid )
    {
        // Given
        var dto = new CreateProductDto { SupplierId = invalid };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldHaveValidationErrorFor( x => x.SupplierId );
    }

    [Fact]
    public async Task  SupplierId_DoesNotExist_HasValidationError()
    {
        // Given
        _supplierRepository
        .Setup(x => x.GetByIdAsync(999))
        .ReturnsAsync((SupplierEntity?)null);
        var dto = new CreateProductDto { SupplierId = 999};
        var result = await _validator.TestValidateAsync(dto);
        result.ShouldHaveValidationErrorFor(x => x.SupplierId);
    }

    [Fact]
    public async Task LocationId_DoesNotExist_HasValidationError()
    {
        // Given
        _warehouseLocationRepository
        .Setup(x => x.GetByIdAsync(999))
        .ReturnsAsync((WarehouseLocationEntity?)null);
        var dto = new CreateProductDto { LocationId = 999};
        var result = await _validator.TestValidateAsync(dto);
        result.ShouldHaveValidationErrorFor(x => x.LocationId);
    }

    [Fact]
    public async Task ValidDto_HasNoValidationError()
    {
        // Given
        var dto = new CreateProductDto
        {
            ProductName = "Telefon",
            PurchasePrice = 50,
            SalePrice = 20,
            Barcode = "939393",
            StockQuantity = 1,
            BrandId = 1,
            SupplierId = 1,
            LocationId = 1,
            CategoryId = 1,
            ModelId = 1,
            SkuCode = "SKU-TEST-001"
        };
        // When
        var result = await _validator.TestValidateAsync(dto);
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }
}
