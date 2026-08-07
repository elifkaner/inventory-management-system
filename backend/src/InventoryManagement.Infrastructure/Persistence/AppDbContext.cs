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

    public DbSet<Brand> Brands { get; set; }

    public DbSet<Model> Models { get; set; }

    public DbSet<AuditLog> AuditLogs { get; set; }

    public DbSet<Equipment> Equipments {get;set;}

    public DbSet<EquipmentTransaction> EquipmentTransactions {get;set;}

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
        modelBuilder.Entity<Product>().HasIndex(p => p.SkuCode).IsUnique();
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

        // Model -> Brand (Many to One)
        // Restrict: bağlı modeli olan bir marka silinemesin.
        modelBuilder.Entity<Model>()
            .HasOne(m => m.Brand)
            .WithMany(b => b.Models)
            .HasForeignKey(m => m.BrandId)
            .OnDelete(DeleteBehavior.Restrict);

        // Product -> Brand (Many to One)
        // Restrict: bağlı ürünü olan bir marka silinemesin.
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Brand)
            .WithMany(b => b.Products)
            .HasForeignKey(p => p.BrandId)
            .OnDelete(DeleteBehavior.Restrict);

        // Product -> Model (Many to One)
        // Restrict: bağlı ürünü olan bir model silinemesin.
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Model)
            .WithMany(m => m.Products)
            .HasForeignKey(p => p.ModelId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Brand>()
            .HasOne(m => m.Category)
            .WithMany(b => b.Brands)
            .HasForeignKey(m => m.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Equipment>().HasIndex(e => e.EquipmentCode).IsUnique();

        // EquipmentTransaction -> Equipment (Many to One)
        // Restrict: geçmiş hareketi olan bir ekipman silinemesin, kayıtlar anlamsızlaşmasın.
        modelBuilder.Entity<EquipmentTransaction>()
            .HasOne(t => t.Equipment)
            .WithMany(e => e.Transactions)
            .HasForeignKey(t => t.EquipmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // EquipmentTransaction -> User (Many to One, opsiyonel: kullanıcı silinse bile hareket kaydı kalsın)
        modelBuilder.Entity<EquipmentTransaction>()
            .HasOne(t => t.CreatedByUser)
            .WithMany()
            .HasForeignKey(t => t.CreatedByUserId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.SetNull);

        SeedEquipmentData(modelBuilder);
    }

    private static void SeedEquipmentData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Equipment>().HasData(
            new Equipment { Id = 1, EquipmentCode = "EQP-001", EquipmentName = "Dell Latitude 5440 Dizüstü Bilgisayar", Status = "InUse", CurrentHolderName = "Ahmet Yılmaz" },
            new Equipment { Id = 2, EquipmentCode = "EQP-002", EquipmentName = "Logitech MX Master 3 Kablosuz Mouse", Status = "InUse", CurrentHolderName = "Ayşe Demir" },
            new Equipment { Id = 3, EquipmentCode = "EQP-003", EquipmentName = "iPhone 14 Pro (Şirket Telefonu)", Status = "Available", CurrentHolderName = null },
            new Equipment { Id = 4, EquipmentCode = "EQP-004", EquipmentName = "HP LaserJet Pro MFP Yazıcı", Status = "UnderMaintenance", CurrentHolderName = null },
            new Equipment { Id = 5, EquipmentCode = "EQP-005", EquipmentName = "Dell UltraSharp 27 Monitör", Status = "Retired", CurrentHolderName = null }
        );

        modelBuilder.Entity<EquipmentTransaction>().HasData(
            // EQP-001: hâlâ Ahmet Yılmaz'da, tek seferlik teslim.
            new EquipmentTransaction { Id = 1, EquipmentId = 1, EmployeeName = "Ahmet Yılmaz", Type = "CheckOut", Condition = "Working", Date = new DateTime(2026, 1, 5, 9, 30, 0, DateTimeKind.Utc), Notes = "Yeni işe başlayan personel için teslim edildi." },

            // EQP-002: hâlâ Ayşe Demir'de.
            new EquipmentTransaction { Id = 2, EquipmentId = 2, EmployeeName = "Ayşe Demir", Type = "CheckOut", Condition = "Working", Date = new DateTime(2026, 2, 10, 14, 0, 0, DateTimeKind.Utc), Notes = null },

            // EQP-003: Mehmet Kaya teslim aldı, sonra sağlam iade etti; şu an depoda müsait.
            new EquipmentTransaction { Id = 3, EquipmentId = 3, EmployeeName = "Mehmet Kaya", Type = "CheckOut", Condition = "Working", Date = new DateTime(2026, 1, 15, 10, 0, 0, DateTimeKind.Utc), Notes = "Saha ziyaretleri için teslim edildi." },
            new EquipmentTransaction { Id = 4, EquipmentId = 3, EmployeeName = "Mehmet Kaya", Type = "CheckIn", Condition = "Working", Date = new DateTime(2026, 3, 1, 11, 15, 0, DateTimeKind.Utc), Notes = "Proje tamamlandı, cihaz iade edildi." },

            // EQP-004: Zeynep Şahin'e teslim edildi, arızalı döndü; şu an bakımda.
            new EquipmentTransaction { Id = 5, EquipmentId = 4, EmployeeName = "Zeynep Şahin", Type = "CheckOut", Condition = "Working", Date = new DateTime(2026, 1, 20, 9, 0, 0, DateTimeKind.Utc), Notes = "Muhasebe departmanına kuruldu." },
            new EquipmentTransaction { Id = 6, EquipmentId = 4, EmployeeName = "Zeynep Şahin", Type = "CheckIn", Condition = "NeedsRepair", Date = new DateTime(2026, 4, 12, 16, 45, 0, DateTimeKind.Utc), Notes = "Kağıt sıkışması arızası var, teknik servise gönderildi." },

            // EQP-005: Emir Kırım'a teslim edildi, hasarlı döndü; sonrasında kullanımdan kaldırıldı (Retired).
            new EquipmentTransaction { Id = 7, EquipmentId = 5, EmployeeName = "Emir Kırım", Type = "CheckOut", Condition = "Working", Date = new DateTime(2025, 11, 1, 9, 0, 0, DateTimeKind.Utc), Notes = null },
            new EquipmentTransaction { Id = 8, EquipmentId = 5, EmployeeName = "Emir Kırım", Type = "CheckIn", Condition = "Damaged", Date = new DateTime(2026, 2, 20, 13, 30, 0, DateTimeKind.Utc), Notes = "Ekranda çatlak oluştu, kullanılamaz durumda." }
        );
    }
}
