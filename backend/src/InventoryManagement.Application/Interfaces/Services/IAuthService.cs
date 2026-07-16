using InventoryManagement.Application.DTOs.User;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto dto);

    Task<LoginResponseDto?> LoginAsync(LoginDto dto);

    // Ortam değişkenlerinde (ADMIN_EMAIL/ADMIN_PASSWORD) tanımlıysa ve henüz yoksa, ilk admin kullanıcısını oluşturur.
    Task SeedAdminAsync();

    // Var olan bir kullanıcının rolünü değiştirir (sadece [Authorize(Roles = "Admin")] endpoint'inden çağrılır).
    Task<bool> SetUserRoleAsync(int userId, string role);
}