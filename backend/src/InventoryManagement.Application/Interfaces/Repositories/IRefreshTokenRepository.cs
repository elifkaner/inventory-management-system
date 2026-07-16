using InventoryManagement.Domain.Entities;
namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IRefreshTokenRepository 
{
    public Task<RefreshToken> AddAsync(RefreshToken token);

    public Task<RefreshToken?> GetByTokenAsync(string token);

    public Task UpdateAsync(RefreshToken token);
}