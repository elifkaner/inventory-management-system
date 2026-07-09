using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlkDotNetApp.Migrations
{
    /// <inheritdoc />
    public partial class RenameSupplierColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.RenameColumn(
        name: "FirmaAdi",
        table: "Suppliers",
        newName: "CompanyName");

    migrationBuilder.RenameColumn(
        name: "YetkiliKisi",
        table: "Suppliers",
        newName: "ContactPerson");

    migrationBuilder.RenameColumn(
        name: "Telefon",
        table: "Suppliers",
        newName: "Phone");

    migrationBuilder.RenameColumn(
        name: "Mail",
        table: "Suppliers",
        newName: "Email");
}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Suppliers",
                newName: "YetkiliKisi");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Suppliers",
                newName: "Telefon");

            migrationBuilder.RenameColumn(
                name: "ContactPerson",
                table: "Suppliers",
                newName: "Mail");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "Suppliers",
                newName: "FirmaAdi");
        }
    }
}
