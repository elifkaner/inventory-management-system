using System.Security.Claims;
using System.Text;
using InventoryManagement.Application.DTOs.User;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;

namespace InventoryManagement.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    private readonly IRefreshTokenRepository _refreshTokenRepository;

    public AuthService(IUserRepository userRepository,IRefreshTokenRepository refreshTokenRepository)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
    }

    public async Task<bool> CreateUserByAdminAsync(CreateUserByAdminDto dto)
    {
        var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
        if (existingUser != null)
        {
            return false;
        }

        var user = new User()
        {
            Name = dto.Name,
            Email = dto.Email,
            Role = dto.Role,
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
            var accessToken = GenerateJwtToken(existingUser);
            var refreshTokenValue = GenerateRefreshToken();

            var refreshToken = new RefreshToken
            {
                UserId = existingUser.UserId,
                Token = HashToken(refreshTokenValue),
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            await _refreshTokenRepository.AddAsync(refreshToken);

            return new LoginResponseDto { AccessToken = accessToken, RefreshToken = refreshTokenValue };
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
            // Bu email'le zaten bir kullanıcı var (ör. eskiden açık register üzerinden User
            // olarak kaydolmuş) ama Admin değilse, admin'e yükseltip şifresini ADMIN_PASSWORD
            // ile eşitliyoruz — aksi halde ortam değişkenleriyle giriş yapmak imkansız kalırdı.
            if (existing.Role != "Admin")
            {
                existing.Role = "Admin";
                existing.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
                await _userRepository.UpdateAsync(existing);
            }
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

        // Sistemde son admin bu kişiyse, onu User'a düşürmeyi engelliyoruz — aksi halde
        // kimse yeni kullanıcı ekleyemez/rol değiştiremez hale gelir (Admin-only endpoint'ler kilitlenir).
        if (user.Role == "Admin" && role != "Admin")
        {
            var adminCount = await _userRepository.CountAdminsAsync();
            if (adminCount <= 1)
            {
                throw new InvalidOperationException("Sistemdeki son Admin kullanıcı, User rolüne düşürülemez.");
            }
        }

        user.Role = role;
        await _userRepository.UpdateAsync(user);
        return true;
    }
    public async Task<LoginResponseDto?> RefreshAsync(RefreshRequestDto dto)
    {
        var existingToken = await _refreshTokenRepository.GetByTokenAsync(HashToken(dto.RefreshToken));
        if (existingToken == null)
        {
            return null;
        }

        if (existingToken.IsRevoked)
        {
            
            await _refreshTokenRepository.RevokeAllForUserAsync(existingToken.UserId);
            return null;
        }

        if (existingToken.ExpiresAt < DateTime.UtcNow)
        {
            return null;
        }

        existingToken.IsRevoked = true;
        await _refreshTokenRepository.UpdateAsync(existingToken);

        var user = await _userRepository.GetByIdAsync(existingToken.UserId);

        if (user == null)
        {
            return null;
        }

            var accessToken = GenerateJwtToken(user);
            var refreshTokenValue = GenerateRefreshToken();

            var refreshToken = new RefreshToken
            {
                UserId = existingToken.UserId,
                Token = HashToken(refreshTokenValue),
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            await _refreshTokenRepository.AddAsync(refreshToken);

            return new LoginResponseDto { AccessToken = accessToken, RefreshToken = refreshTokenValue };
        }

    public async Task<bool> LogoutAsync(RefreshRequestDto dto)
    {
        var existingToken = await _refreshTokenRepository.GetByTokenAsync(HashToken(dto.RefreshToken));
        if (existingToken == null)
        {
            return false;
        }

        existingToken.IsRevoked = true;
        await _refreshTokenRepository.UpdateAsync(existingToken);
        return true;
    }

    private static string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
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
            expires: DateTime.UtcNow.AddMinutes(300),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string GenerateRefreshToken()
    {
        var randomBytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(randomBytes);
    }
    
    private static string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToBase64String(bytes);
    }
}