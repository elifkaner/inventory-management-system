namespace InventoryManagement.Application.DTOs.Product;

public class DashboardSummaryDto
{
    public int TotalProducts { get; set; }        // Toplam benzersiz ürün çeşidi sayısı
    public int CriticalStockCount { get; set; }    // Kritik stoktaki ürün sayısı
    public double ActiveSalesRate { get; set; }     // Aktif ürünlerin yüzde oranı

    // Sadece Admin rolü için doldurulur; User rolünde null kalır (JSON'da hiç görünmez).
    public decimal? TotalInventoryValue { get; set; } // Toplam envanter maliyet/satış değeri
    public decimal? TotalProfitMargin { get; set; }    // Toplam kâr marjı (satış - alış) * stok
}