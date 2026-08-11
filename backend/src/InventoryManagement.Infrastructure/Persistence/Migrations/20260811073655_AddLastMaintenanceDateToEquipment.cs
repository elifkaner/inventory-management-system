using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLastMaintenanceDateToEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EquipmentTransactions",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastMaintenanceDate",
                table: "Equipments",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 1,
                column: "LastMaintenanceDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 2,
                column: "LastMaintenanceDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 3,
                column: "LastMaintenanceDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 4,
                column: "LastMaintenanceDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Equipments",
                keyColumn: "Id",
                keyValue: 5,
                column: "LastMaintenanceDate",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastMaintenanceDate",
                table: "Equipments");

            migrationBuilder.InsertData(
                table: "EquipmentTransactions",
                columns: new[] { "Id", "Condition", "CreatedByUserId", "Date", "EmployeeName", "EquipmentId", "Notes", "Type" },
                values: new object[] { 8, "Damaged", null, new DateTime(2026, 2, 20, 13, 30, 0, 0, DateTimeKind.Utc), "Emir Kırım", 5, "Ekranda çatlak oluştu, kullanılamaz durumda.", "CheckIn" });
        }
    }
}
