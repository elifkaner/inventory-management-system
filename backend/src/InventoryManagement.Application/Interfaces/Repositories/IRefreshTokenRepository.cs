using InventoryManagement.Domain.Entities;
namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IRefreshTokenRepository
{
    public Task<RefreshToken> AddAsync(RefreshToken token);

    public Task<RefreshToken?> GetByTokenAsync(string token);

    public Task UpdateAsync(RefreshToken token);

    // Bir kullanıcının tüm aktif (iptal edilmemiş) refresh token'larını iptal eder —
    // çalıntı/tekrar kullanılan bir token tespit edildiğinde tüm oturumları kapatmak için.
    public Task RevokeAllForUserAsync(int userId);
}