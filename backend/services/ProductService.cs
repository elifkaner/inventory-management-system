using IlkDotNetApp.Database;
using IlkDotNetApp.DTOs;
using IlkDotNetApp.Models;
using Microsoft.EntityFrameworkCore;

namespace IlkDotNetApp.Services;

public class ProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }


    // Tüm ürünleri getirir
    public async Task<List<ProductResponseDto>> GetAllProductsAsync()
    {
        return await _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                PurchasePrice = p.PurchasePrice,
                SalePrice = p.SalePrice,
                Barcode = p.Barcode,
                StockQuantity = p.StockQuantity,
                BrandId = p.BrandId,
                IsActive = p.IsActive,

                Supplier = p.Supplier != null 
                    ? p.Supplier.CompanyName 
                    : "",

                Category = p.Category != null 
                    ? p.Category.Name 
                    : ""

            })
            .ToListAsync();
    }



    // Id'ye göre ürün getirir
    public async Task<ProductResponseDto?> GetProductByIdAsync(int id)
    {
        return await _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                PurchasePrice = p.PurchasePrice,
                SalePrice = p.SalePrice,
                Barcode = p.Barcode,
                StockQuantity = p.StockQuantity,
                BrandId = p.BrandId,
                IsActive = p.IsActive,

                Supplier = p.Supplier != null
                    ? p.Supplier.CompanyName
                    : "",

                Category = p.Category != null
                    ? p.Category.Name
                    : ""

            })
            .FirstOrDefaultAsync();
    }



    // Yeni ürün oluşturur
    public async Task<ProductResponseDto> CreateProductAsync(Product product)
    {
        _context.Products.Add(product);

        await _context.SaveChangesAsync();


        return await _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Where(p => p.Id == product.Id)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                PurchasePrice = p.PurchasePrice,
                SalePrice = p.SalePrice,
                Barcode = p.Barcode,
                StockQuantity = p.StockQuantity,
                BrandId = p.BrandId,
                IsActive = p.IsActive,

                Supplier = p.Supplier != null
                    ? p.Supplier.CompanyName
                    : "",

                Category = p.Category != null
                    ? p.Category.Name
                    : ""

            })
            .FirstAsync();
    }



    // Ürün güncelleme
    public async Task<ProductResponseDto?> UpdateProductAsync(int id, Product updatedProduct)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);


        if (product == null)
        {
            return null;
        }


        product.ProductName = updatedProduct.ProductName;
        product.PurchasePrice = updatedProduct.PurchasePrice;
        product.SalePrice = updatedProduct.SalePrice;
        product.Barcode = updatedProduct.Barcode;
        product.StockQuantity = updatedProduct.StockQuantity;
        product.CategoryId = updatedProduct.CategoryId;
        product.BrandId = updatedProduct.BrandId;
        product.IsActive = updatedProduct.IsActive;
        product.SupplierId = updatedProduct.SupplierId;


        await _context.SaveChangesAsync();


        return await _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                PurchasePrice = p.PurchasePrice,
                SalePrice = p.SalePrice,
                Barcode = p.Barcode,
                StockQuantity = p.StockQuantity,
                BrandId = p.BrandId,
                IsActive = p.IsActive,

                Supplier = p.Supplier != null
                    ? p.Supplier.CompanyName
                    : "",

                Category = p.Category != null
                    ? p.Category.Name
                    : ""

            })
            .FirstOrDefaultAsync();
    }



    // Ürün silme
    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);


        if (product == null)
        {
            return false;
        }


        _context.Products.Remove(product);

        await _context.SaveChangesAsync();


        return true;
    }
}