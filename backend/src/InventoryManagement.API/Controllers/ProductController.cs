using FluentValidation;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[AllowAnonymous] // TODO: frontend login akışı eklenince kaldırılacak
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IValidator<CreateProductDto> _createProductValidator;
    private readonly IValidator<UpdateProductDto> _updateProductValidator;

    public ProductController(
        IProductService productService,
        IValidator<CreateProductDto> createProductValidator,
        IValidator<UpdateProductDto> updateProductValidator)
    {
        _productService = productService;
        _createProductValidator = createProductValidator;
        _updateProductValidator = updateProductValidator;
    }

    // GET /api/Product?search=kahve&categoryId=3
    [HttpGet]
    public async Task<IActionResult> GetAllProducts([FromQuery] string? search, [FromQuery] int? categoryId)
    {
        var products = await _productService.GetAllProductsAsync(search, categoryId);

        return Ok(products);
    }

    // GET /api/Product/summary
    [HttpGet("summary")]
    public async Task<IActionResult> GetProductSummary()
    {
        var isAdmin = User.IsInRole("Admin");
        var summary = await _productService.GetSummaryAsync(isAdmin);

        return Ok(summary);
    }

    // GET /api/Product/export?search=kahve&categoryId=3
    [HttpGet("export")]
    public async Task<IActionResult> ExportProducts([FromQuery] string? search, [FromQuery] int? categoryId)
    {
        var csvBytes = await _productService.ExportToCsvAsync(search, categoryId);

        var fileName = $"urunler_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv";

        return File(csvBytes, "text/csv", fileName);
    }

    // GET /api/Product/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }
    // GET /api/Product/barcode/{barcode}
    [HttpGet("barcode/{barcode}")]
    public async Task<IActionResult> GetProductByBarcode(string barcode)
    {
        if (string.IsNullOrWhiteSpace(barcode))
        {
            return BadRequest("Barkod boş olamaz.");
        }

        var product = await _productService.GetProductByBarcodeAsync(barcode);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    // POST /api/Product/
    [HttpPost]
    public async Task<IActionResult> CreateProduct(CreateProductDto dto)
    {
        var validationResult = await _createProductValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var product = new Product
        {
            ProductName = dto.ProductName,
            PurchasePrice = dto.PurchasePrice,
            SalePrice = dto.SalePrice,
            Barcode = dto.Barcode,
            StockQuantity = dto.StockQuantity,
            CategoryId = dto.CategoryId,
            BrandName = dto.BrandName,
            IsActive = dto.IsActive,
            SupplierId = dto.SupplierId,
            LocationId = dto.LocationId
        };

        var createdProduct = await _productService.CreateProductAsync(product);

        return Ok(createdProduct);
    }

    // PUT /api/Product/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto dto)
    {
        var validationResult = await _updateProductValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var product = new Product
        {
            ProductName = dto.ProductName,
            PurchasePrice = dto.PurchasePrice,
            SalePrice = dto.SalePrice,
            Barcode = dto.Barcode,
            StockQuantity = dto.StockQuantity,
            CategoryId = dto.CategoryId,
            BrandName = dto.BrandName,
            IsActive = dto.IsActive,
            SupplierId = dto.SupplierId,
            LocationId = dto.LocationId
        };

        var updatedProduct = await _productService.UpdateProductAsync(id, product);

        if (updatedProduct == null)
        {
            return NotFound();
        }

        return Ok(updatedProduct);
    }

    // DELETE /api/Product/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var deleted = await _productService.DeleteProductAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
