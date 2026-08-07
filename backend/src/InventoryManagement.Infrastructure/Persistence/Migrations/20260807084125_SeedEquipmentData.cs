using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedEquipmentData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Equipments",
                columns: new[] { "Id", "CurrentHolderName", "EquipmentCode", "EquipmentName", "Status" },
                values: new object[,]
                {
                    { 1, "Ahmet Yılmaz", "EQP-001", "Dell Latitude 5440 Dizüstü Bilgisayar", "InUse" },
                    { 2, "Ayşe Demir", "EQP-002", "Logitech MX Master 3 Kablosuz Mouse", "InUse" },
                    { 3, null, "EQP-003", "iPhone 14 Pro (Şirket Telefonu)", "Available" },
                    { 4, null, "EQP-004", "HP LaserJet Pro MFP Yazıcı", "UnderMaintenance" },
                    { 5, null, "EQP-005", "Dell UltraSharp 27 Monitör", "Retired" }
                });

            migrationBuilder.InsertData(
                table: "EquipmentTransactions",
                columns: new[] { "Id", "Condition", "CreatedByUserId", "Date", "EmployeeName", "EquipmentId", "Notes", "Type" },
                values: new object[,]
                {
                    { 1, "Working", null, new DateTime(2026, 1, 5, 9, 30, 0, 0, DateTimeKind.Utc), "Ahmet Yılmaz", 1, "Yeni işe başlayan personel için teslim edildi.", "CheckOut" },
                    { 2, "Working", null, new DateTime(2026, 2, 10, 14, 0, 0, 0, DateTimeKind.Utc), "Ayşe Demir", 2, null, "CheckOut" },
                    { 3, "Working", null, new DateTime(2026, 1, 15, 10, 0, 0, 0, DateTimeKind.Utc), "Mehmet Kaya", 3, "Saha ziyaretleri için teslim edildi.", "CheckOut" },
                    { 4, "Working", null, new DateTime(2026, 3, 1, 11, 15, 0, 0, DateTimeKind.Utc), "Mehmet Kaya", 3, "Proje tamamlandı, cihaz iade edildi.", "CheckIn" },
                    { 5, "Working", null, new DateTime(2026, 1, 20, 9, 0, 0, 0, DateTimeKind.Utc), "Zeynep Şahin", 4, "Muhasebe departmanına kuruldu.", "CheckOut" },
                    { 6, "NeedsRepair", null, new DateTime(2026, 4, 12, 16, 45, 0, 0, DateTimeKind.Utc), "Zeynep Şahin", 4, "Kağıt sıkışması arızası var, teknik servise gönderildi.", "CheckIn" },
                    { 7, "Working", null, new DateTime(2025, 11, 1, 9, 0, 0, 0, DateTimeKind.Utc), "Emir Kırım", 5, null, "CheckOut" },
                    { 8, "Damaged", null, new DateTime(2026, 2, 20, 13, 30, 0, 0, DateTimeKind.Utc), "Emir Kırım", 5, "Ekranda çatlak oluştu, kullanılamaz durumda.", "CheckIn" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
