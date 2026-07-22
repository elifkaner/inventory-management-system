using InventoryManagement.Application.DTOs.StockMovement;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Application.Interfaces.Services;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services;

public class StockMovementService : IStockMovementService
{
    private readonly IStockMovementRepository _stockMovementRepository;
    private readonly IProductRepository _productRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public StockMovementService(
        IStockMovementRepository stockMovementRepository,
        IProductRepository productRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork)
    {
        _stockMovementRepository = stockMovementRepository;
        _productRepository = productRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<StockMovementResponseDto>> GetAllAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var movements = await _stockMovementRepository.GetAllAsync(productId, transactionType, fromDate, toDate);

        return movements.Select(ToDto).ToList();
    }

    public async Task<StockMovementResponseDto?> GetByIdAsync(int id)
    {
        var movement = await _stockMovementRepository.GetByIdAsync(id);

        return movement == null ? null : ToDto(movement);
    }

    public async Task<StockMovementResponseDto?> CreateAsync(CreateStockMovementDto dto, int? userId)
    {
        await _unitOfWork.BeginTransactionAsync();
        try {
        var product = await _productRepository.GetByIdAsync(dto.ProductId);

        if (product == null)
        {
            await _unitOfWork.RollbackAsync();
            return null;
        }

        if (dto.TransactionType == "OUT" && product.StockQuantity < dto.Quantity)
        {
            throw new InvalidOperationException("Yetersiz stok: mevcut stok, çıkış miktarından az.");
        }

        product.StockQuantity += dto.TransactionType == "IN" ? dto.Quantity : -dto.Quantity;
        await _productRepository.UpdateAsync(product.Id, product);

        var movement = new StockMovement
        {
            ProductId = dto.ProductId,
            TransactionType = dto.TransactionType,
            TransactionAmounth = dto.TransactionAmounth,
            Quantity = dto.Quantity,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow,
            CreatedByUserId = userId
        };

        var created = await _stockMovementRepository.AddAsync(movement);
        created.Product = product;
        created.CreatedByUser = userId.HasValue ? await _userRepository.GetByIdAsync(userId.Value) : null;
        await _unitOfWork.CommitAsync();
        return ToDto(created);
        }
        catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }
    

    public async Task<bool> DeleteAsync(int id)
    {
        await _unitOfWork.BeginTransactionAsync();
    try {
        var movement = await _stockMovementRepository.GetByIdAsync(id);

        if (movement == null)
        {
            await _unitOfWork.RollbackAsync();
            return false;
        }

        var product = await _productRepository.GetByIdAsync(movement.ProductId);

        if (product != null)
        {
            // Hareketi silmek, hiç yaşanmamış gibi davranmak demek — o yüzden stok etkisini tersine çeviriyoruz:
            // IN siliniyorsa geldiği miktar kadar stoktan düş, OUT siliniyorsa çıktığı miktar kadar stoğa geri ekle.
            if (movement.TransactionType == "IN" && product.StockQuantity < movement.Quantity)
            {
                throw new InvalidOperationException("Bu hareket silinemez: geri alınacak miktar mevcut stoktan fazla (stok başka hareketlerle zaten tüketilmiş).");
            }

            product.StockQuantity += movement.TransactionType == "IN" ? -movement.Quantity : movement.Quantity;
            await _productRepository.UpdateAsync(product.Id, product);
        }

        var result = await _stockMovementRepository.DeleteAsync(id);
        await _unitOfWork.CommitAsync();
        return result;
    }
    catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }

    private static StockMovementResponseDto ToDto(StockMovement movement)
    {
        return new StockMovementResponseDto
        {
            Id = movement.Id,
            ProductId = movement.ProductId,
            ProductName = movement.Product?.ProductName ?? "",
            TransactionType = movement.TransactionType,
            TransactionAmounth = movement.TransactionAmounth,
            Quantity = movement.Quantity,
            CreatedAt = movement.CreatedAt,
            Description = movement.Description,
            CreatedByUserName = movement.CreatedByUser?.Name ?? ""
        };
    }
}
