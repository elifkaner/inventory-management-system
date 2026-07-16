using System.Security.Claims;
using System.Text;
using InventoryManagement.Application.DTOs.User;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace InventoryManagement.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> RegisterAsync(RegisterDto dto)
    {
        var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
        if (existingUser!=null)
        {
            return false;
        }
        
        var user = new User()
        {
            Name = dto.Name,
            Email = dto.Email,
            Role = "User",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        await _userRepository.AddAsync(user);
        return true;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginDto dto)
    {
        var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
        if (existingUser==null)
        {
            return null;
        }
        var passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, existingUser.PasswordHash);
        
            if (!passwordValid)
            {
                return null;
            }
            var token = GenerateJwtToken(existingUser);

            return new LoginResponseDto { Token = token };
    }

    public async Task SeedAdminAsync()
    {
        var email = Environment.GetEnvironmentVariable("ADMIN_EMAIL");
        var password = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            return;
        }

        var existing = await _userRepository.GetByEmailAsync(email);
        if (existing != null)
        {
            return;
        }

        var admin = new User
        {
            Name = Environment.GetEnvironmentVariable("ADMIN_NAME") ?? "Admin",
            Email = email,
            Role = "Admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
        };

        await _userRepository.AddAsync(admin);
    }

    public async Task<bool> SetUserRoleAsync(int userId, string role)
    {
        if (role != "Admin" && role != "User")
        {
            return false;
        }

        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            return false;
        }

        user.Role = role;
        await _userRepository.UpdateAsync(user);
        return true;
    }

    private static string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var secret = Environment.GetEnvironmentVariable("JWT_SECRET")!;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
            audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}