using IlkDotNetApp.Database;
using IlkDotNetApp.DTOs.Supplier;
using IlkDotNetApp.Models;
using Microsoft.EntityFrameworkCore;

namespace IlkDotNetApp.Services;

public class SupplierService
{
    private readonly AppDbContext _context;

    public SupplierService(AppDbContext context)
    {
        _context = context;
    }


    // Get all suppliers
    public async Task<List<SupplierDto>> GetAllAsync()
    {
        var suppliers = await _context.Suppliers
            .ToListAsync();


        return suppliers.Select(s => new SupplierDto
        {
            Id = s.Id,
            CompanyName = s.CompanyName,
            ContactPerson = s.ContactPerson,
            Phone = s.Phone,
            Email = s.Email

        }).ToList();
    }



    // Get supplier by id
    public async Task<SupplierDto?> GetByIdAsync(int id)
    {
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == id);


        if (supplier == null)
        {
            return null;
        }


        return new SupplierDto
        {
            Id = supplier.Id,
            CompanyName = supplier.CompanyName,
            ContactPerson = supplier.ContactPerson,
            Phone = supplier.Phone,
            Email = supplier.Email
        };
    }



    // Create supplier
    public async Task<SupplierDto> CreateAsync(CreateSupplierDto dto)
    {
        var supplier = new Supplier
        {
            CompanyName = dto.CompanyName,
            ContactPerson = dto.ContactPerson,
            Phone = dto.Phone,
            Email = dto.Email
        };


        _context.Suppliers.Add(supplier);

        await _context.SaveChangesAsync();


        return new SupplierDto
        {
            Id = supplier.Id,
            CompanyName = supplier.CompanyName,
            ContactPerson = supplier.ContactPerson,
            Phone = supplier.Phone,
            Email = supplier.Email
        };
    }



    // Update supplier
    public async Task<bool> UpdateAsync(int id, UpdateSupplierDto dto)
    {
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == id);


        if (supplier == null)
        {
            return false;
        }


        supplier.CompanyName = dto.CompanyName;
        supplier.ContactPerson = dto.ContactPerson;
        supplier.Phone = dto.Phone;
        supplier.Email = dto.Email;


        await _context.SaveChangesAsync();


        return true;
    }



    // Delete supplier
    public async Task<bool> DeleteAsync(int id)
    {
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == id);


        if (supplier == null)
        {
            return false;
        }


        _context.Suppliers.Remove(supplier);


        await _context.SaveChangesAsync();


        return true;
    }
}