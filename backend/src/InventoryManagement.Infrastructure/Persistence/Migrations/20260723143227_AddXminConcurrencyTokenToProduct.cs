using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddXminConcurrencyTokenToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // "xmin" PostgreSQL'in her tabloda zaten var olan gizli bir sistem sütunu —
            // burada gerçek bir DDL değişikliği gerekmiyor, sadece EF Core'un model
            // geçmişine bu shadow property'yi tanıtmak için boş bırakılıyor.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
