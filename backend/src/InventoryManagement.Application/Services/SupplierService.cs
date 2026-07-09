using InventoryManagement.Application.DTOs.Supplier;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierService(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
    }

    // Get all suppliers
    public async Task<List<SupplierDto>> GetAllAsync()
    {
        var suppliers = await _supplierRepository.GetAllAsync();

        return suppliers.Select(ToDto).ToList();
    }

    // Get supplier by id
    public async Task<SupplierDto?> GetByIdAsync(int id)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        return supplier == null ? null : ToDto(supplier);
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

        var created = await _supplierRepository.AddAsync(supplier);

        return ToDto(created);
    }

    // Update supplier
    public async Task<bool> UpdateAsync(int id, UpdateSupplierDto dto)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        if (supplier == null)
        {
            return false;
        }

        supplier.CompanyName = dto.CompanyName;
        supplier.ContactPerson = dto.ContactPerson;
        supplier.Phone = dto.Phone;
        supplier.Email = dto.Email;

        return await _supplierRepository.UpdateAsync(supplier);
    }

    // Delete supplier
    public Task<bool> DeleteAsync(int id)
    {
        return _supplierRepository.DeleteAsync(id);
    }

    private static SupplierDto ToDto(Supplier s)
    {
        return new SupplierDto
        {
            Id = s.Id,
            CompanyName = s.CompanyName,
            ContactPerson = s.ContactPerson,
            Phone = s.Phone,
            Email = s.Email
        };
    }
}
