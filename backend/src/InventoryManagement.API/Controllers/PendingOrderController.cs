using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PendingOrderController : ControllerBase
    {
        private readonly IPendingOrderService _pendingOrderService;

        public PendingOrderController(IPendingOrderService pendingOrderService)
        {
            _pendingOrderService = pendingOrderService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PendingOrderDto>>> GetAll()
        {
            var result = await _pendingOrderService.GetAllPendingOrdersAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<PendingOrderDto>> Create([FromBody] CreatePendingOrderDto dto)
        {
            var result = await _pendingOrderService.AddPendingOrderAsync(dto);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _pendingOrderService.DeletePendingOrderAsync(id);
            return NoContent();
        }
    }
}
