namespace InventoryManagement.Domain.Entities;

public class Supplier
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

    // Navigation Property
    public List<Product> Products { get; set; } = new();
}
