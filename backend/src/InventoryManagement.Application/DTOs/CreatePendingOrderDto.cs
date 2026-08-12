using System;
using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.Application.DTOs
{
    public class CreatePendingOrderDto
    {
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Miktar 0'dan büyük olmalıdır.")]
        public int OrderQuantity { get; set; }
    }
}
