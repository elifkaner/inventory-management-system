using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlkDotNetApp.Migrations
{
    /// <inheritdoc />
    public partial class RenameTurkishColumnsToEnglish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.RenameColumn(
        name: "UrunAdi",
        table: "Products",
        newName: "ProductName");

    migrationBuilder.RenameColumn(
        name: "AlisFiyati",
        table: "Products",
        newName: "PurchasePrice");

    migrationBuilder.RenameColumn(
        name: "SatisFiyati",
        table: "Products",
        newName: "SalePrice");

    migrationBuilder.RenameColumn(
        name: "Barkod",
        table: "Products",
        newName: "Barcode");

    migrationBuilder.RenameColumn(
        name: "StokAdedi",
        table: "Products",
        newName: "StockQuantity");

    migrationBuilder.RenameColumn(
        name: "KategoriId",
        table: "Products",
        newName: "CategoryId");

    migrationBuilder.RenameColumn(
        name: "MarkaId",
        table: "Products",
        newName: "BrandId");

    migrationBuilder.RenameColumn(
        name: "Durum",
        table: "Products",
        newName: "IsActive");
}
        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "StockQuantity",
                table: "Products",
                newName: "StokAdedi");

            migrationBuilder.RenameColumn(
                name: "SalePrice",
                table: "Products",
                newName: "SatisFiyati");

            migrationBuilder.RenameColumn(
                name: "PurchasePrice",
                table: "Products",
                newName: "AlisFiyati");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "Products",
                newName: "UrunAdi");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Products",
                newName: "Durum");

            migrationBuilder.RenameColumn(
                name: "BrandId",
                table: "Products",
                newName: "MarkaId");

            migrationBuilder.RenameColumn(
                name: "Barcode",
                table: "Products",
                newName: "Barkod");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Products",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "KategoriId",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
