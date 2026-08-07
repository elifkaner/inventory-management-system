using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EquipmentRedesign : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquipmentId",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "TakenTime",
                table: "Equipments");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Equipments",
                newName: "Status");

            migrationBuilder.AddColumn<string>(
                name: "CurrentHolderName",
                table: "Equipments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EquipmentCode",
                table: "Equipments",
                type: "text",
                nullable: false,
                defaultValue: "");

            // Bu tablo daha önce elle (Swagger/Postman) test edilmiş olabilir; o satırlar yeni
            // sütunda hepsi aynı boş değere sahip olur. Benzersiz index'i kurmadan önce her
            // birine kendi Id'sine dayalı, garanti tekil bir kod veriyoruz.
            migrationBuilder.Sql(
                "UPDATE \"Equipments\" SET \"EquipmentCode\" = 'LEGACY-' || \"Id\"::text WHERE \"EquipmentCode\" = '';");

            migrationBuilder.CreateTable(
                name: "EquipmentTransactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EquipmentId = table.Column<int>(type: "integer", nullable: false),
                    EmployeeName = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Condition = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedByUserId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EquipmentTransactions_Equipments_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "Equipments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EquipmentTransactions_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "Equipments",
                columns: new[] { "Id", "CurrentHolderName", "EquipmentCode", "EquipmentName", "Status" },
                values: new object[,]
                {
                    { 1001, "Ahmet Yılmaz", "EQP-001", "Dell Latitude 5440 Dizüstü Bilgisayar", "InUse" },
                    { 1002, "Ayşe Demir", "EQP-002", "Logitech MX Master 3 Kablosuz Mouse", "InUse" },
                    { 1003, null, "EQP-003", "iPhone 14 Pro (Şirket Telefonu)", "Available" },
                    { 1004, null, "EQP-004", "HP LaserJet Pro MFP Yazıcı", "UnderMaintenance" },
                    { 1005, null, "EQP-005", "Dell UltraSharp 27 Monitör", "Retired" }
                });

            migrationBuilder.InsertData(
                table: "EquipmentTransactions",
                columns: new[] { "Id", "Condition", "CreatedByUserId", "Date", "EmployeeName", "EquipmentId", "Notes", "Type" },
                values: new object[,]
                {
                    { 1001, "Working", null, new DateTime(2026, 1, 5, 9, 30, 0, 0, DateTimeKind.Utc), "Ahmet Yılmaz", 1001, "Yeni işe başlayan personel için teslim edildi.", "CheckOut" },
                    { 1002, "Working", null, new DateTime(2026, 2, 10, 14, 0, 0, 0, DateTimeKind.Utc), "Ayşe Demir", 1002, null, "CheckOut" },
                    { 1003, "Working", null, new DateTime(2026, 1, 15, 10, 0, 0, 0, DateTimeKind.Utc), "Mehmet Kaya", 1003, "Saha ziyaretleri için teslim edildi.", "CheckOut" },
                    { 1004, "Working", null, new DateTime(2026, 3, 1, 11, 15, 0, 0, DateTimeKind.Utc), "Mehmet Kaya", 1003, "Proje tamamlandı, cihaz iade edildi.", "CheckIn" },
                    { 1005, "Working", null, new DateTime(2026, 1, 20, 9, 0, 0, 0, DateTimeKind.Utc), "Zeynep Şahin", 1004, "Muhasebe departmanına kuruldu.", "CheckOut" },
                    { 1006, "NeedsRepair", null, new DateTime(2026, 4, 12, 16, 45, 0, 0, DateTimeKind.Utc), "Zeynep Şahin", 1004, "Kağıt sıkışması arızası var, teknik servise gönderildi.", "CheckIn" },
                    { 1007, "Working", null, new DateTime(2025, 11, 1, 9, 0, 0, 0, DateTimeKind.Utc), "Emir Kırım", 1005, null, "CheckOut" },
                    { 1008, "Damaged", null, new DateTime(2026, 2, 20, 13, 30, 0, 0, DateTimeKind.Utc), "Emir Kırım", 1005, "Ekranda çatlak oluştu, kullanılamaz durumda.", "CheckIn" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_EquipmentCode",
                table: "Equipments",
                column: "EquipmentCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentTransactions_CreatedByUserId",
                table: "EquipmentTransactions",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentTransactions_EquipmentId",
                table: "EquipmentTransactions",
                column: "EquipmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EquipmentTransactions");

            migrationBuilder.DropIndex(
                name: "IX_Equipments_EquipmentCode",
                table: "Equipments");

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1001);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1002);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1003);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1004);

            migrationBuilder.DeleteData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1005);

            migrationBuilder.DropColumn(
                name: "CurrentHolderName",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "EquipmentCode",
                table: "Equipments");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Equipments",
                newName: "UserName");

            migrationBuilder.AddColumn<int>(
                name: "EquipmentId",
                table: "Equipments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "TakenTime",
                table: "Equipments",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
