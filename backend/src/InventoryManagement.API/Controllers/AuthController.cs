using FluentValidation;
using InventoryManagement.Application.DTOs.User;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("AuthPolicy")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IValidator<CreateUserByAdminDto> _createUserValidator;
    private readonly IValidator<LoginDto> _loginValidator;

    public AuthController(
        IAuthService authService,
        IValidator<CreateUserByAdminDto> createUserValidator,
        IValidator<LoginDto> loginValidator)
    {
        _authService = authService;
        _createUserValidator = createUserValidator;
        _loginValidator = loginValidator;
    }

    // POST /api/Auth/users — sadece Admin, yeni bir çalışan (User veya Admin rolünde) hesabı oluşturabilir.
    // Dışarıdan kimse kendine hesap açamaz; bu yüzden herkese açık bir /register endpoint'i yok.
    [HttpPost("users")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateUser(CreateUserByAdminDto dto)
    {
        var validationResult = await _createUserValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var success = await _authService.CreateUserByAdminAsync(dto);

        if (!success)
        {
            return BadRequest("Bu email adresiyle zaten bir kullanıcı kayıtlı.");
        }

        return Ok();
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> Refresh(RefreshRequestDto dto)
    {
        var result = await _authService.RefreshAsync(dto);

        if (result == null )
        {
            return Unauthorized("Yetkiniz yok.");
        }
        return Ok(result);
    }

    // POST /api/Auth/login
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var validationResult = await _loginValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var result = await _authService.LoginAsync(dto);

        if (result == null)
        {
            return Unauthorized("Email veya şifre hatalı.");
        }

        return Ok(result);
    }

    // POST /api/Auth/logout — refresh token'ı iptal eder, bir daha yeni access token almak için kullanılamaz.
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(RefreshRequestDto dto)
    {
        var success = await _authService.LogoutAsync(dto);

        if (!success)
        {
            return BadRequest("Geçersiz refresh token.");
        }

        return Ok();
    }

    // PUT /api/Auth/users/{id}/role — sadece Admin, başka bir kullanıcının rolünü değiştirebilir.
    [HttpPut("users/{id:int}/role")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> SetUserRole(int id, SetRoleDto dto)
    {
        var success = await _authService.SetUserRoleAsync(id, dto.Role);

        if (!success)
        {
            return BadRequest("Kullanıcı bulunamadı veya geçersiz rol (sadece 'User' ya da 'Admin' olabilir).");
        }

        return Ok();
    }
}
