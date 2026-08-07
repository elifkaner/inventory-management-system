using System.Security.Claims;
using FluentValidation;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class EquipmentTransactionController : ControllerBase
{
    private readonly IEquipmentTransactionService _transactionService;
    private readonly IValidator<CreateEquipmentTransactionDto> _createValidator;

    public EquipmentTransactionController(
        IEquipmentTransactionService transactionService,
        IValidator<CreateEquipmentTransactionDto> createValidator)
    {
        _transactionService = transactionService;
        _createValidator = createValidator;
    }

    // GET /api/EquipmentTransaction?equipmentId=5&fromDate=2026-01-01&toDate=2026-01-31
    // Ekran 2: teslim alma / teslim etme geçmişi (kim, ne zaman, hangi ekipmanı, ne durumda).
    [HttpGet]
    public async Task<IActionResult> GetAllTransactions(
        [FromQuery] int? equipmentId,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate)
    {
        var transactions = await _transactionService.GetAllAsync(equipmentId, fromDate, toDate);
        return Ok(transactions);
    }

    // POST /api/EquipmentTransaction
    [HttpPost]
    public async Task<IActionResult> CreateTransaction(CreateEquipmentTransactionDto dto)
    {
        var validationResult = await _createValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int? userId = int.TryParse(userIdClaim, out var parsedUserId) ? parsedUserId : null;

            var created = await _transactionService.CreateAsync(dto, userId);
            if (created == null)
            {
                return BadRequest("Belirtilen ekipman bulunamadı.");
            }

            return Ok(created);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
