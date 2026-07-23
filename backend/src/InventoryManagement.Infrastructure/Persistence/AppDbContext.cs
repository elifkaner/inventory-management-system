using InventoryManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace InventoryManagement.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    public DbSet<Supplier> Suppliers { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<StockMovement> StockMovements { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<WarehouseLocation> WarehouseLocations { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Product -> Supplier (Many to One)
        // Restrict: bağlı ürünü olan bir tedarikçi silinemesin (cascade ile ürünler sessizce silinmesin diye).
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Supplier)
            .WithMany(s => s.Products)
            .HasForeignKey(p => p.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Product>().HasIndex(p => p.Barcode).IsUnique();
        modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
        modelBuilder.Entity<Product>().Property<uint>("xmin").HasColumnName("xmin").IsRowVersion();

        // Product -> Category (Many to One)
        // Restrict: bağlı ürünü olan bir kategori silinemesin (cascade ile ürünler sessizce silinmesin diye).
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        // StockMovement -> Product (Many to One)
        modelBuilder.Entity<StockMovement>()
            .HasOne(sm => sm.Product)
            .WithMany(p => p.StockMovements)
            .HasForeignKey(sm => sm.ProductId);

        // StockMovement -> User (Many to One, opsiyonel: kullanıcı silinse bile hareket kaydı kalsın)
        modelBuilder.Entity<StockMovement>()
            .HasOne(sm => sm.CreatedByUser)
            .WithMany()
            .HasForeignKey(sm => sm.CreatedByUserId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.SetNull);

        // Product -> WarehouseLocation (Many to One, opsiyonel)
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Location)
            .WithMany(l => l.Products)
            .HasForeignKey(p => p.LocationId)
            .IsRequired(false);

        // RefreshToken -> User (Many to One: bir kullanıcının birden fazla refresh token'ı olabilir)
        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId);
    }
}
