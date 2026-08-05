using InventoryManagement.Application.DTOs.Common;
using InventoryManagement.Application.DTOs.StockMovement;

namespace InventoryManagement.Application.Interfaces.Services;

public interface IStockMovementService
{
    Task<PagedResult<StockMovementResponseDto>> GetAllAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null,int? page = null, int? pageSize = null);

    Task<StockMovementResponseDto?> GetByIdAsync(int id);

    // null döner: Product bulunamazsa. "Yetersiz stok" durumunda exception fırlatır (bkz. Service).
    Task<StockMovementResponseDto?> CreateAsync(CreateStockMovementDto dto, int? userId);

    // Hareketi siler ve Product.StockQuantity'yi geri alır. Geri alma stoğu eksiye düşürecekse exception fırlatır.
    Task<bool> DeleteAsync(int id);

    // Sayfalama parametresi kasıtlı olarak yok — export, ekranda görünen sayfayı değil,
    // filtreyle eşleşen TÜM hareketleri içermeli.
    Task<byte[]> ExportToCsvAsync(int? productId = null, string? transactionType = null, DateTime? fromDate = null, DateTime? toDate = null);
}