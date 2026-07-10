namespace InventoryManagement.Application.DTOs.Supplier;

public class SupplierDto
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = "";

    public string ContactPerson { get; set; } = "";

    public string Phone { get; set; } = "";

    public string Email { get; set; } = "";

    public string TaxOffice { get; set; } = "";

    public string TaxNumber { get; set; } = "";
    
    public string Address { get; set; } = "";

    public bool IsActive { get; set; }

}
