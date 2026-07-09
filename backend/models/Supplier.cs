namespace IlkDotNetApp.Models;

public class Supplier
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = "";

    public string ContactPerson { get; set; } = "";

    public string Phone { get; set; } = "";

    public string Email { get; set; } = "";


    // Navigation Property
    public List<Product> Products { get; set; } = new();
}