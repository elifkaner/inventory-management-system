using InventoryManagement.Application.DTOs.User;
using InventoryManagement.Application.Validators.User;
using FluentValidation.TestHelper;

namespace InventoryManagement.Application.Tests.Validators.User;

public class CreateUserByAdminDtoValidatorTests
{
    private readonly CreateUserByAdminDtoValidator _validator = new();

    [Fact]
    public void Name_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateUserByAdminDto { Name = "" } ;
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_ExceedLength_HasValidationError()
    {
        // Given
        var dto = new CreateUserByAdminDto { Name = new string('a',101) } ;
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }
    [Fact]
    public void Name_AtMaxLength_HasNoValidationError()
    {
        // Given
        var dto = new CreateUserByAdminDto { Name = new string('a',100) } ;
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Email_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateUserByAdminDto { Email = "" } ;
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void Email_IsNotValid_HasValidationError()
    {
        // Given
        var dto = new CreateUserByAdminDto { Email = "gecersizemail" } ;
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }
    
    [Fact]
    public void Password_IsEmpty_HasValidationError()
    {
        // Given
        var dto = new CreateUserByAdminDto { Password = ""};
        // When
        var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x => x.Password);
    }

    [Theory]
    [InlineData("12345")] 
    public void Password_MinimumLength_HasValidationError(string invalidPassword)
    {
        var dto = new CreateUserByAdminDto { Password = invalidPassword};
        var result = _validator.TestValidate(dto);
        result.ShouldHaveValidationErrorFor(x => x.Password);
    }

    [Fact] 
    public void Password_MinimumLength_HasNoValidationError()
    {
        var dto = new CreateUserByAdminDto { Password = "123456"};
        var result = _validator.TestValidate(dto);
        result.ShouldNotHaveValidationErrorFor(x=>x.Password);
    }

    [Fact]
    public void Role_IsEmpty_HasValidationError()
    {
        // Given
    var dto = new CreateUserByAdminDto { Role = ""};
        // When
    var result = _validator.TestValidate(dto);
        // Then
        result.ShouldHaveValidationErrorFor(x=>x.Role);
    }

    [Theory]
    [InlineData("Employee")]
    public void Role_IsInvalidValue_HasValidationError(string invalidRole)
    {
        var dto = new CreateUserByAdminDto { Role = invalidRole };
        var result = _validator.TestValidate(dto);
        result.ShouldHaveValidationErrorFor(x => x.Role);
    }

    [Theory] 
    [InlineData("User")]
    public void Role_User_HasNoValidationError(string validUser)
    {
        var dto = new CreateUserByAdminDto { Role = validUser};
        var result = _validator.TestValidate(dto);
        result.ShouldNotHaveValidationErrorFor(x => x.Role);
    }

    [Theory] 
    [InlineData("Admin")]
    public void Role_OnlyAdmin_HasNoValidationError(string validUser)
    {
        var dto = new CreateUserByAdminDto { Role = validUser};
        var result = _validator.TestValidate(dto);
        result.ShouldNotHaveValidationErrorFor(x => x.Role);
    }

    [Fact]
    public void ValidDto_HasNoValidationError()
    {
        // Given
    var dto = new CreateUserByAdminDto
    {
        Name = "Admin",
        Email = "Admin@admin.com",
        Password = "admin1234",
        Role = "Admin"
    };
        // When
    var result = _validator.TestValidate(dto);
        // Then
    result.ShouldNotHaveAnyValidationErrors();
    }

}