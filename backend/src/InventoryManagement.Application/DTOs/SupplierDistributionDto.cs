namespace InventoryManagement.Application.DTOs;

public class SupplierDistributionDto
{
    public int SupplierId { get; set; }

    public string SupplierName { get; set; } = "";

    public int TotalProduct { get; set; }

    public decimal Percentage { get; set; }
}
