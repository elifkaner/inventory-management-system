using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync(string? search = null, int? categoryId = null)
    {
        var query = _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Include(p => p.Location)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var pattern = $"%{search}%";
            query = query.Where(p =>
                EF.Functions.ILike(p.ProductName, pattern) ||
                EF.Functions.ILike(p.Barcode, pattern));
        }

        if (categoryId.HasValue && categoryId.Value > 0)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Include(p => p.Location)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
    public async Task<Product?> GetByBarcodeAsync(string Barcode)
    {
        return await _context.Products
            .Include(p => p.Supplier)
            .Include(p => p.Category)
            .Include(p => p.Location)
            .FirstOrDefaultAsync(p => p.Barcode == Barcode);
    }
    public async Task<Product> AddAsync(Product product)
    {
        _context.Products.Add(product);

        await _context.SaveChangesAsync();

        return (await GetByIdAsync(product.Id))!;
    }

    public async Task<Product?> UpdateAsync(int id, Product updatedProduct)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

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
        product.BrandName = updatedProduct.BrandName;
        product.Model = updatedProduct.Model;
        product.IsActive = updatedProduct.IsActive;
        product.SupplierId = updatedProduct.SupplierId;
        product.LocationId = updatedProduct.LocationId;

        await _context.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return false;
        }

        _context.Products.Remove(product);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<ProductSummaryStats> GetSummaryStatsAsync(int criticalStockThreshold)
    {
        var totalProducts = await _context.Products.CountAsync();

        var criticalStockCount = await _context.Products
            .CountAsync(p => p.StockQuantity <= criticalStockThreshold);

        var totalInventoryValue = await _context.Products
            .Where(p => p.IsActive)
            .SumAsync(p => p.SalePrice * p.StockQuantity);

        var totalProfitMargin = await _context.Products
            .Where(p => p.IsActive)
            .SumAsync(p => (p.SalePrice - p.PurchasePrice) * p.StockQuantity);

        var activeProductCount = await _context.Products.CountAsync(p => p.IsActive);

        return new ProductSummaryStats(totalProducts, criticalStockCount, totalInventoryValue, totalProfitMargin, activeProductCount);
    }
}
