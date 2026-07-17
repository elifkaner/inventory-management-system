using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedByUserToStockMovement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "StockMovements",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StockMovements_CreatedByUserId",
                table: "StockMovements",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StockMovements_Users_CreatedByUserId",
                table: "StockMovements",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockMovements_Users_CreatedByUserId",
                table: "StockMovements");

            migrationBuilder.DropIndex(
                name: "IX_StockMovements_CreatedByUserId",
                table: "StockMovements");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "StockMovements");
        }
    }
}
