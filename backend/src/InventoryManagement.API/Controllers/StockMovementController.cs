using System.Security.Claims;
using FluentValidation;
using InventoryManagement.Application.Common;
using InventoryManagement.Application.DTOs.StockMovement;
using InventoryManagement.Application.Exceptions;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] 
 public class StockMovementController : ControllerBase
{
    private readonly IStockMovementService _stockService;

    private readonly IValidator<CreateStockMovementDto> _createValidator;

    public StockMovementController(IStockMovementService stockService,IValidator<CreateStockMovementDto> createValidator)
    {
        _stockService = stockService;
        _createValidator = createValidator;
    }

    // GET /api/StockMovement?productId=5&transactionType=IN&fromDate=2026-07-01&toDate=2026-07-17
    [HttpGet]
    public async Task<IActionResult> GetAllMovements(
        [FromQuery] int? productId,
        [FromQuery] string? transactionType,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int? page,
        [FromQuery] int? pageSize
        )
    {
       if (!PaginationHelper.TryValidate(page, pageSize, out var validPage, out var validPageSize, out var paginationError))
       {
           return BadRequest(paginationError);
       }

       var movement = await _stockService.GetAllAsync(productId, transactionType, fromDate, toDate, validPage, validPageSize);

       return Ok(movement);
    }

    // GET /api/StockMovement/export?productId=5&transactionType=IN&fromDate=2026-07-01&toDate=2026-07-17
    [HttpGet("export")]
    public async Task<IActionResult> ExportMovements(
        [FromQuery] int? productId,
        [FromQuery] string? transactionType,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate)
    {
        var csvBytes = await _stockService.ExportToCsvAsync(productId, transactionType, fromDate, toDate);

        var fileName = $"stok_hareketleri_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv";

        return File(csvBytes, "text/csv", fileName);
    }

    // GET /api/StockMovement/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetMovementById(int id)
    {
        var movement = await _stockService.GetByIdAsync(id);
        if (movement == null)
        {
            return NotFound();
        }
        return Ok(movement);
    }

    // POST /api/StockMovement
    [HttpPost]
    public async Task<IActionResult> CreateMovement(CreateStockMovementDto dto)
    {
        var validatorResult = await _createValidator.ValidateAsync(dto);
        if (!validatorResult.IsValid)
        {
            return BadRequest(validatorResult.Errors);
        }
    try {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        int? userId = int.TryParse(userIdClaim, out var parsedUserId) ? parsedUserId : null;

        var created = await _stockService.CreateAsync(dto, userId);

            if (created == null)
            {
                return BadRequest("Belirtilen ürün bulunamadı.");
            }

            return Ok(created);
    }
    catch (ConcurrencyConflictException ex)
        {
            return Conflict(ex.Message);
        }
    catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }


    // DELETE /api/StockMovement/{id}

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteMovement(int id)
    {
        try
        {
            var deleted = await _stockService.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (ConcurrencyConflictException ex)
        {
            return Conflict(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
