using InventoryManagement.Application.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace InventoryManagement.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _appDbContext;
    private IDbContextTransaction? _transaction;

    public UnitOfWork (AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task BeginTransactionAsync()
    {
        _transaction = await _appDbContext.Database.BeginTransactionAsync();
    }  
    public async Task CommitAsync()
    {
        if (_transaction == null )
        {
            return;
        }
        await _transaction.CommitAsync();
        await _transaction.DisposeAsync();
        _transaction = null;
    }  
    public async Task RollbackAsync()
    {
        if (_transaction == null )
        {
            return;
        }
        await _transaction.RollbackAsync();
        await _transaction.DisposeAsync();
        _transaction = null;
    } 
}