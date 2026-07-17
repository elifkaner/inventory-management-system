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
            Email = dto.Email,
            TaxOffice = dto.TaxOffice,
            TaxNumber = dto.TaxNumber,
            Address = dto.Address,
            IsActive = dto.IsActive
        };

        var created = await _supplierRepository.AddAsync(supplier);

        return ToDto(created);
    }

    // Update supplier
    public async Task<SupplierDto?> UpdateAsync(int id, UpdateSupplierDto dto)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        if (supplier == null)
        {
            return null;
        }

        supplier.CompanyName = dto.CompanyName;
        supplier.ContactPerson = dto.ContactPerson;
        supplier.Phone = dto.Phone;
        supplier.Email = dto.Email;
        supplier.TaxOffice = dto.TaxOffice;
        supplier.TaxNumber = dto.TaxNumber;
        supplier.Address = dto.Address;
        supplier.IsActive = dto.IsActive;

        var updated = await _supplierRepository.UpdateAsync(supplier);

        return updated == null ? null : ToDto(updated);
    }

    // Delete supplier
    public async Task<bool> DeleteAsync(int id)
    {
        var hasProducts = await _supplierRepository.HasProductsAsync(id);

        if (hasProducts)
        {
            throw new InvalidOperationException("Bu tedarikçiye bağlı ürünler var, önce onları silin ya da başka bir tedarikçiye taşıyın.");
        }

        return await _supplierRepository.DeleteAsync(id);
    }

    private static SupplierDto ToDto(Supplier s)
    {
        return new SupplierDto
        {
            Id = s.Id,
            CompanyName = s.CompanyName,
            ContactPerson = s.ContactPerson,
            Phone = s.Phone,
            Email = s.Email,
            TaxOffice = s.TaxOffice,
            TaxNumber = s.TaxNumber,
            Address = s.Address,
            IsActive = s.IsActive
        };
    }
}
