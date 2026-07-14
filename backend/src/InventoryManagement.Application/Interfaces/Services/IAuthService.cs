using InventoryManagement.Application.DTOs.User;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto dto);

    Task<LoginResponseDto?> LoginAsync(LoginDto dto);
    
}