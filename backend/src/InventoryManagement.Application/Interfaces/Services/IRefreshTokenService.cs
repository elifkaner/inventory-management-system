using InventoryManagement.Application.DTOs.User;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IRefreshTokenService
{
    public Task<RefreshRequestDto> AddAsync(RefreshRequestDto token);

    public Task<RefreshRequestDto?> GetByTokenAsync(string token);

    public Task UpdateAsync(RefreshRequestDto token);
}