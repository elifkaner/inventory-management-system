using FluentValidation.TestHelper;
using InventoryManagement.Application.DTOs.Supplier;
using InventoryManagement.Application.Validators.Supplier;

namespace InventoryManagement.Application.Tests.Validators.Supplier;
public class UpdateSupplierDtoValidatorTests
{
    private readonly UpdateSupplierDtoValidator _validator = new();

    [Fact]
    public void CompanyName_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {CompanyName = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CompanyName);
    }

    [Fact]
    public void CompanyName_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {CompanyName = new string('a',151)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.CompanyName);
    }

    [Fact]
    public void CompanyName_MaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {CompanyName = new string('a',150)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.CompanyName);
    }

    [Fact]
    public void ContactPerson_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {ContactPerson = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.ContactPerson);
    }

    [Fact]
    public void ContactPerson_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {ContactPerson = new string('a',101)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.ContactPerson);
    }

    [Fact]
    public void ContactPerson_MaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {ContactPerson = new string('a',100)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.ContactPerson);
    }

    [Fact]
    public void Phone_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {Phone = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Phone);
    }

    [Theory]
    [InlineData("123456")]
    [InlineData("1234567891011121314151617181920")]
    [InlineData("izinverilmeyen")]
    public void Phone_IsMatch_HasValidationError(string invalidPhone)
    {
        var dto = new UpdateSupplierDto { Phone = invalidPhone };
        var result = _validator.TestValidate(dto);
        result.ShouldHaveValidationErrorFor(x => x.Phone);
    }

    [Theory]
    [InlineData("05321234567")]
    [InlineData("(0532) 123-4567")]
    public void Phone_IsMatch_HasNoValidationError(string invalidPhone)
    {
        var dto = new UpdateSupplierDto { Phone = invalidPhone };
        var result = _validator.TestValidate(dto);
        result.ShouldNotHaveValidationErrorFor(x => x.Phone);
    }

    [Fact]
    public void Email_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {Email = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

     [Fact]
    public void Email_IsInvalid_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {Email = "gecersizmail"};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void TaxOffice_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {TaxOffice = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.TaxOffice);
    }

    [Fact]
    public void TaxOffice_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {TaxOffice = new string('a',101)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.TaxOffice);
    }

    [Fact]
    public void TaxOffice_MaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {TaxOffice = new string('a',100)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.TaxOffice);
    }

    [Fact]
    public void TaxNumber_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {TaxNumber = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.TaxNumber);
    }

    [Theory]
    [InlineData("123456")]
    [InlineData("1234567891011121314151617181920")]
    [InlineData("izinverilmeyen")]
    [InlineData("+ /!asdasoudjasjd")]
    public void TaxNumber_IsMatch_HasValidationError(string invalidTaxNumber)
    {
        var dto = new UpdateSupplierDto { TaxNumber = invalidTaxNumber };
        var result = _validator.TestValidate(dto);
        result.ShouldHaveValidationErrorFor(x => x.TaxNumber);
    }

    [Theory]
    [InlineData("05321234567")]
    public void TaxNumber_IsMatch_HasNoValidationError(string invalidTaxNumber)
    {
        var dto = new UpdateSupplierDto { TaxNumber = invalidTaxNumber };
        var result = _validator.TestValidate(dto);
        result.ShouldNotHaveValidationErrorFor(x => x.TaxNumber);
    }

    [Fact]
    public void Address_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {Address = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Address);
    }

    [Fact]
    public void Address_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {Address = new string('a',251)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Address);
    }

    [Fact]
    public void Address_MaxLength_HasNoValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto {Address = new string('a',250)};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Address);
    }

    [Fact]
    public void ValidDto_HasNoValidationError()
    {
        // Given
        var dto = new UpdateSupplierDto
        {
            CompanyName = "Fiorent",
            ContactPerson = "Adnan Emir Kırım",
            Phone = "0 533 423 95 08",
            Email = "emirkirimis5101@gmail.com",
            TaxOffice = "9383938",
            TaxNumber= "19453117562",
            Address = "75485 sokak Aliyaizzet Begoviç Bulvarı"
        };
        // When
        var result = _validator.TestValidate(dto);
    
        // Then
        result.ShouldNotHaveAnyValidationErrors();
    }

}