
namespace InventoryManagement.Application.DTOs.Category;
public class CategoryDistributionDto
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = string.Empty;

    public int TotalProduct { get; set; }

    public decimal Percentage { get; set; }

}