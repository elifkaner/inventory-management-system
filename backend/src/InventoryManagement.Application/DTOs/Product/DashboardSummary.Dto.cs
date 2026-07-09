namespace InventoryManagement.Application.DTOs.Product;

public class DashboardSummaryDto
{
    public int TotalProducts { get; set; }        // Toplam benzersiz ürün çeşidi sayısı
    public int CriticalStockCount { get; set; }    // Kritik stoktaki ürün sayısı
    public decimal TotalInventoryValue { get; set; } // Toplam envanter maliyet/satış değeri
    public double ActiveSalesRate { get; set; }     // Aktif ürünlerin yüzde oranı
}