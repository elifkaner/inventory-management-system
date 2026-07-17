using FluentValidation;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace InventoryManagement.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<ProductService>();

        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ISupplierService, SupplierService>();
        services.AddScoped<IWarehouseLocationService, WarehouseLocationService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IStockMovementService, StockMovementService>();
        services.AddScoped<IStockMovementService, StockMovementService>();
        

        return services;
    }
}
