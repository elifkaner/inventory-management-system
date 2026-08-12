using System;

namespace InventoryManagement.Application.DTOs
{
    public class PendingOrderDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        
        // These fields are useful for the frontend so it doesn't need to join heavily or re-fetch products
        public string ProductName { get; set; }
        public string SkuCode { get; set; }
        public string Barcode { get; set; }
        
        public int OrderQuantity { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
