
namespace InventoryManagement.Application.Interfaces.Services;

public interface ICurrentUserService
{
    public int? UserId { get; }

    public string UserName { get; } 

    public string UserRole { get; }

    public string? IpAddress { get; } 
    
    public string? UserAgent { get; }

    public string? RequestId { get; } 
    
}