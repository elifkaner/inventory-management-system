using System.Security.Claims;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace InventoryManagement.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor) 
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private HttpContext? Context => _httpContextAccessor.HttpContext;

    public int? UserId
    {
        get
        {
            var claim = Context?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : null;
        }
    }
        public string UserName => Context?.User?.FindFirst(ClaimTypes.Name)?.Value ?? "System";

        public string? IpAddress => Context?.Connection?.RemoteIpAddress?.ToString();

         public string? UserAgent => Context?.Request.Headers["User-Agent"].ToString();
        
        public string? RequestId => Context?.TraceIdentifier;
    
}