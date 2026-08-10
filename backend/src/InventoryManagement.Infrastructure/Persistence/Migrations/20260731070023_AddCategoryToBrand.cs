using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryToBrand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Brands",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            // "Kategorisiz" kategorisinin mevcut olduğundan emin ol.
            migrationBuilder.Sql("""
                INSERT INTO "Categories" ("Name")
                SELECT 'Kategorisiz'
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM "Categories"
                    WHERE "Name" = 'Kategorisiz'
                );
            """);

            // Mevcut tüm markaları "Kategorisiz" kategorisine bağla.
            migrationBuilder.Sql("""
                UPDATE "Brands"
                SET "CategoryId" = (
                    SELECT "Id"
                    FROM "Categories"
                    WHERE "Name" = 'Kategorisiz'
                    LIMIT 1
                );
            """);

            migrationBuilder.CreateIndex(
                name: "IX_Brands_CategoryId",
                table: "Brands",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Brands_Categories_CategoryId",
                table: "Brands",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Brands_Categories_CategoryId",
                table: "Brands");

            migrationBuilder.DropIndex(
                name: "IX_Brands_CategoryId",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Brands");
        }
    }
}
