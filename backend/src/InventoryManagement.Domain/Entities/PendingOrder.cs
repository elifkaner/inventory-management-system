using System;

namespace InventoryManagement.Domain.Entities
{
    public class PendingOrder
    {
        public int Id { get; set; }
        
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int OrderQuantity { get; set; }
        
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    }
}
