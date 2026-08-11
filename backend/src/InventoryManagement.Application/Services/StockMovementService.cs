using System.Text;
using InventoryManagement.Application.Common;
using InventoryManagement.Application.DTOs.Common;
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
    private readonly IStockMovementNotifier _notifier;

    public StockMovementService(
        IStockMovementRepository stockMovementRepository,
        IProductRepository productRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        IStockMovementNotifier notifier)
    {
        _stockMovementRepository = stockMovementRepository;
        _productRepository = productRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _notifier = notifier;
    }

    public async Task<PagedResult<StockMovementResponseDto>> GetAllAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null,int? page = null, int? pageSize = null)
    {
        var result = await _stockMovementRepository.GetAllAsync(productId, transactionType, fromDate, toDate, page, pageSize);

        return new PagedResult<StockMovementResponseDto>
        {
            Items = result.Items.Select(ToDto).ToList(),
            PageNumber = result.PageNumber,
            PageSize = result.PageSize,
            TotalRecord = result.TotalRecord
        };
    }

    public async Task<StockMovementResponseDto?> GetByIdAsync(int id)
    {
        var movement = await _stockMovementRepository.GetByIdAsync(id);

        return movement == null ? null : ToDto(movement);
    }

    public async Task<StockMovementResponseDto?> CreateAsync(CreateStockMovementDto dto, int? userId)
    {
        await _unitOfWork.BeginTransactionAsync();
        try
        {
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

            if (product.StockQuantity == 0)
            {
                product.IsActive = false;
            }
            else if (dto.TransactionType == "IN" && !product.IsActive)
            {
                product.IsActive = true;
            }

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

            var createdDto = ToDto(created);

            // Bildirim, asıl işlemin (stok kaydı) tamamlanmasından SONRA gönderiliyor ve
            // kendi try/catch'inde izole ediliyor — SignalR bir sebepten başarısız olsa bile,
            // veritabanına zaten yazılmış olan işlem, kullanıcıya hata olarak yansımamalı.
            try
            {
                await _notifier.NotifyMovementCreatedAsync(createdDto);
            }
            catch
            {
                // Bildirim gönderilemedi — iş kuralı açısından bir hata değil, yutuluyor.
            }

            return createdDto;
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
        try
        {
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

                if (product.StockQuantity == 0)
                {
                    product.IsActive = false;
                }
                else if (!product.IsActive)
                {
                    product.IsActive = true;
                }

                await _productRepository.UpdateAsync(product.Id, product);
            }

            var result = await _stockMovementRepository.DeleteAsync(id);
            await _unitOfWork.CommitAsync();

            try
            {
                await _notifier.NotifyMovementDeletedAsync(id, movement.ProductId);
            }
            catch
            {
                // Bildirim gönderilemedi — iş kuralı açısından bir hata değil, yutuluyor.
            }

            return result;
        }
        catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }

    public async Task<byte[]> ExportToCsvAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null)
    {
        var result = await GetAllAsync(productId, transactionType, fromDate, toDate);
        var movements = result.Items;

        var csv = new StringBuilder();
        csv.AppendLine("Id,Ürün Adı,İşlem Tipi,Miktar,Tutar,Tarih,Açıklama,Kullanıcı");

        foreach (var m in movements)
        {
            csv.AppendLine(string.Join(",",
                m.Id,
                CsvHelper.Escape(m.ProductName),
                m.TransactionType == "IN" ? "Giriş" : "Çıkış",
                m.Quantity,
                m.TransactionAmounth.ToString(System.Globalization.CultureInfo.InvariantCulture),
                m.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
                CsvHelper.Escape(m.Description),
                CsvHelper.Escape(m.CreatedByUserName)));
        }

        return CsvHelper.ToUtf8Bytes(csv.ToString());
    }

    private static StockMovementResponseDto ToDto(StockMovement movement)
    {
        return new StockMovementResponseDto
        {
            Id = movement.Id,
            ProductId = movement.ProductId,
            ProductName = movement.Product?.ProductName ?? "",
            BrandName = movement.Product?.Brand?.Name ?? "",
            ModelName = movement.Product?.Model?.Name ?? "",
            TransactionType = movement.TransactionType,
            TransactionAmounth = movement.TransactionAmounth,
            Quantity = movement.Quantity,
            CreatedAt = movement.CreatedAt,
            Description = movement.Description,
            CreatedByUserName = movement.CreatedByUser?.Name ?? ""
        };
    }
}
