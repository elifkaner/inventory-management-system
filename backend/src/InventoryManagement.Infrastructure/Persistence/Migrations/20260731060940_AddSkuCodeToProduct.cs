using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSkuCodeToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SkuCode",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");

            // Mevcut ürünlerin hepsi "" ile eklendi (yukarıdaki defaultValue) — unique index'e
            // geçmeden önce her birine tekil bir değer veriyoruz, yoksa hepsi "" üzerinde çakışır.
            migrationBuilder.Sql("UPDATE \"Products\" SET \"SkuCode\" = 'SKU-' || \"Id\";");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SkuCode",
                table: "Products",
                column: "SkuCode",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_SkuCode",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SkuCode",
                table: "Products");
        }
    }
}
