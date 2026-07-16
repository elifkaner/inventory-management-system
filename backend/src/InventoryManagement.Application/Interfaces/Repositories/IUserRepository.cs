using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string mail);

    Task<User?> GetByIdAsync(int userId);

    Task<User> AddAsync(User user);

    Task UpdateAsync(User user);
}