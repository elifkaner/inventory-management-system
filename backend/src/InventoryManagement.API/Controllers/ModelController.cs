using FluentValidation;
using InventoryManagement.Application.DTOs.Model;
using InventoryManagement.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ModelController : ControllerBase
{
    private readonly IModelService _modelService;
    private readonly IValidator<CreateModelDto> _createModelValidator;
    private readonly IValidator<UpdateModelDto> _updateModelValidator;

    public ModelController(
        IModelService modelService,
        IValidator<CreateModelDto> createModelValidator,
        IValidator<UpdateModelDto> updateModelValidator)
    {
        _modelService = modelService;
        _createModelValidator = createModelValidator;
        _updateModelValidator = updateModelValidator;
    }

    // GET /api/Model?brandId=1
    [HttpGet]
    public async Task<IActionResult> GetAllModels([FromQuery] int? brandId)
    {
        var models = await _modelService.GetAllModelsAsync(brandId);

        return Ok(models);
    }

    // GET /api/Model/{id:int}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetModelById(int id)
    {
        var model = await _modelService.GetModelByIdAsync(id);

        if (model == null)
        {
            return NotFound();
        }

        return Ok(model);
    }

    // POST /api/Model
    [HttpPost]
    public async Task<IActionResult> CreateModel(CreateModelDto dto)
    {
        var validationResult = await _createModelValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var createdModel = await _modelService.CreateModelAsync(dto);

        return Ok(createdModel);
    }

    // PUT /api/Model/{id:int}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateModel(int id, UpdateModelDto dto)
    {
        var validationResult = await _updateModelValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var updatedModel = await _modelService.UpdateModelAsync(id, dto);

        if (updatedModel == null)
        {
            return NotFound();
        }

        return Ok(updatedModel);
    }

    // DELETE /api/Model/{id:int}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteModel(int id)
    {
        try
        {
            var deleted = await _modelService.DeleteModelAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
