using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlkDotNetApp.Migrations
{
    /// <inheritdoc />
    public partial class RenameStockMovementColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TarihSaat",
                table: "StockMovements",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "IslemTipi",
                table: "StockMovements",
                newName: "TransactionType");

            migrationBuilder.RenameColumn(
                name: "Adet",
                table: "StockMovements",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "Aciklama",
                table: "StockMovements",
                newName: "Description");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "StockMovements",
                newName: "IslemTipi");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "StockMovements",
                newName: "Adet");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "StockMovements",
                newName: "Aciklama");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "StockMovements",
                newName: "TarihSaat");
        }
    }
}
