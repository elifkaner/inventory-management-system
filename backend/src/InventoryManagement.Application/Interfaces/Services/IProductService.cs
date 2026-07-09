using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IProductService
{
    Task<List<ProductResponseDto>> GetAllProductsAsync();

    Task<ProductResponseDto?> GetProductByIdAsync(int id);

    Task<ProductResponseDto> CreateProductAsync(Product product);

    Task<ProductResponseDto?> UpdateProductAsync(int id, Product updatedProduct);

    Task<bool> DeleteProductAsync(int id);
}
