namespace InventoryManagement.Application.DTOs;

public class ServiceRecordDto
{
    public int EquipmentId { get; set; }

    // "send"   → Servise gönder  (durum: InService)
    // "return" → Servisten döndü (durum: Available, LastMaintenanceDate = UtcNow)
    public string Action { get; set; } = string.Empty;

    /// <summary>Servisten dönüşte yapılan işlemin açıklaması (ör: Rutin bakım, Cam değişimi).</summary>
    public string? Description { get; set; }
}
