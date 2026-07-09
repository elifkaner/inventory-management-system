using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlkDotNetApp.Migrations
{
    /// <inheritdoc />
    public partial class RenameCategoryColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Isim",
                table: "Categories",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "Isim");
        }
    }
}
