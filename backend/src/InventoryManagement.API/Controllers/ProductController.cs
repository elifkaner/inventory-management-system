using FluentValidation;
using InventoryManagement.Application.DTOs.Product;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
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

    // GET /api/Product
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productService.GetAllProductsAsync();

        return Ok(products);
    }

    // GET /api/Product/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    // POST /api/Product
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
            BrandId = dto.BrandId,
            IsActive = dto.IsActive,
            SupplierId = dto.SupplierId
        };

        var createdProduct = await _productService.CreateProductAsync(product);

        return Ok(createdProduct);
    }

    // PUT /api/Product/{id}
    [HttpPut("{id}")]
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
            BrandId = dto.BrandId,
            IsActive = dto.IsActive,
            SupplierId = dto.SupplierId
        };

        var updatedProduct = await _productService.UpdateProductAsync(id, product);

        if (updatedProduct == null)
        {
            return NotFound();
        }

        return Ok(updatedProduct);
    }

    // DELETE /api/Product/{id}
    [HttpDelete("{id}")]
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
