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
            new EquipmentTransaction { Id = 7, EquipmentId = 5, EmployeeName = "Emir Kırım", Type = "CheckOut", Condition = "Working", Date = new DateTime(2025, 11, 1, 9, 0, 0, DateTimeKind.Utc), Notes = null }
        );
    }

    public async Task Ensure100EquipmentsSeededAsync()
    {
        var currentEquipments = await Equipments.ToListAsync();
        var existingCodes = new HashSet<string>(currentEquipments.Where(e => !string.IsNullOrEmpty(e.EquipmentCode)).Select(e => e.EquipmentCode));

        var seedList = Get100EquipmentSeedList();
        var newEquipments = seedList.Where(item => !existingCodes.Contains(item.EquipmentCode)).ToList();

        if (newEquipments.Any())
        {
            await Equipments.AddRangeAsync(newEquipments);
            await SaveChangesAsync();
        }
    }

    private static List<Equipment> Get100EquipmentSeedList()
    {
        return new List<Equipment>
        {
            new Equipment { EquipmentCode = "EQP-001", EquipmentName = "Dell Latitude 5440 Dizüstü Bilgisayar", Status = "InUse", CurrentHolderName = "Ahmet Yılmaz" },
            new Equipment { EquipmentCode = "EQP-002", EquipmentName = "MacBook Pro 16\" M3 Max", Status = "InUse", CurrentHolderName = "Ayşe Demir" },
            new Equipment { EquipmentCode = "EQP-003", EquipmentName = "Lenovo ThinkPad X1 Carbon Gen 11", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-004", EquipmentName = "HP EliteBook 840 G10", Status = "InUse", CurrentHolderName = "Mehmet Kaya" },
            new Equipment { EquipmentCode = "EQP-005", EquipmentName = "MacBook Air 15\" M2", Status = "InUse", CurrentHolderName = "Zeynep Şahin" },
            new Equipment { EquipmentCode = "EQP-006", EquipmentName = "Dell Precision 5680 Workstation", Status = "InUse", CurrentHolderName = "Emir Kırım" },
            new Equipment { EquipmentCode = "EQP-007", EquipmentName = "Asus ROG Zephyrus G14", Status = "UnderMaintenance", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-008", EquipmentName = "Lenovo Legion Pro 5", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-009", EquipmentName = "Dell Latitude 7440 2-in-1", Status = "InUse", CurrentHolderName = "Ali Öztürk" },
            new Equipment { EquipmentCode = "EQP-010", EquipmentName = "MacBook Pro 14\" M3 Pro", Status = "InUse", CurrentHolderName = "Fatma Yıldız" },
            new Equipment { EquipmentCode = "EQP-011", EquipmentName = "HP ProBook 450 G10", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-012", EquipmentName = "Lenovo ThinkPad T14s Gen 4", Status = "InUse", CurrentHolderName = "Canan Tekin" },
            new Equipment { EquipmentCode = "EQP-013", EquipmentName = "Dell Latitude 5540", Status = "InUse", CurrentHolderName = "Burak Arslan" },
            new Equipment { EquipmentCode = "EQP-014", EquipmentName = "MacBook Air 13\" M1", Status = "Retired", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-015", EquipmentName = "Microsoft Surface Laptop 5", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-016", EquipmentName = "Dell Latitude 3540", Status = "InUse", CurrentHolderName = "Selin Çelik" },
            new Equipment { EquipmentCode = "EQP-017", EquipmentName = "Lenovo ThinkPad E16", Status = "InUse", CurrentHolderName = "Mustafa Aydın" },
            new Equipment { EquipmentCode = "EQP-018", EquipmentName = "HP ZBook Power G10", Status = "InUse", CurrentHolderName = "Deniz Yurt" },
            new Equipment { EquipmentCode = "EQP-019", EquipmentName = "MacBook Pro 16\" M1 Max", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-020", EquipmentName = "Dell Vostro 3520", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-021", EquipmentName = "Lenovo V15 G4", Status = "InUse", CurrentHolderName = "Oguzhan Kılıç" },
            new Equipment { EquipmentCode = "EQP-022", EquipmentName = "HP Pavilion 15", Status = "InUse", CurrentHolderName = "Elif Özer" },
            new Equipment { EquipmentCode = "EQP-023", EquipmentName = "Acer Swift Go 14", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-024", EquipmentName = "Dell Latitude 5340 2-in-1", Status = "UnderMaintenance", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-025", EquipmentName = "Lenovo ThinkBook 14 Gen 6", Status = "InUse", CurrentHolderName = "Emre Yücel" },
            new Equipment { EquipmentCode = "EQP-026", EquipmentName = "MacBook Pro 13\" M2", Status = "InUse", CurrentHolderName = "Hasan Şen" },
            new Equipment { EquipmentCode = "EQP-027", EquipmentName = "Asus ExpertBook B9", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-028", EquipmentName = "Dell Latitude 7340", Status = "InUse", CurrentHolderName = "Murat Aksoy" },
            new Equipment { EquipmentCode = "EQP-029", EquipmentName = "HP Victus 16", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-030", EquipmentName = "Lenovo ThinkPad L14 Gen 4", Status = "InUse", CurrentHolderName = "Gamze Doğan" },
            new Equipment { EquipmentCode = "EQP-031", EquipmentName = "Dell UltraSharp U2723QE 27\" 4K Monitör", Status = "InUse", CurrentHolderName = "Ahmet Yılmaz" },
            new Equipment { EquipmentCode = "EQP-032", EquipmentName = "LG 27UK850-W 27\" 4K Monitör", Status = "InUse", CurrentHolderName = "Ayşe Demir" },
            new Equipment { EquipmentCode = "EQP-033", EquipmentName = "Samsung Odyssey G7 32\" Curved Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-034", EquipmentName = "Asus ProArt PA278CV 27\" Monitör", Status = "InUse", CurrentHolderName = "Mehmet Kaya" },
            new Equipment { EquipmentCode = "EQP-035", EquipmentName = "HP E24i G4 24\" FHD Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-036", EquipmentName = "Dell UltraSharp U3423WE 34\" Curved Monitör", Status = "InUse", CurrentHolderName = "Zeynep Şahin" },
            new Equipment { EquipmentCode = "EQP-037", EquipmentName = "Lenovo ThinkVision T24i-30 23.8\" Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-038", EquipmentName = "ViewSonic VG2455 24\" IPS Monitör", Status = "InUse", CurrentHolderName = "Emir Kırım" },
            new Equipment { EquipmentCode = "EQP-039", EquipmentName = "BenQ DesignVue PD2700U 27\" 4K Monitör", Status = "UnderMaintenance", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-040", EquipmentName = "MSI Modern MD271QP 27\" QHD Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-041", EquipmentName = "Dell P2722H 27\" FHD Monitör", Status = "InUse", CurrentHolderName = "Ali Öztürk" },
            new Equipment { EquipmentCode = "EQP-042", EquipmentName = "LG Ultrawide 34WN80C-B 34\" Monitör", Status = "InUse", CurrentHolderName = "Fatma Yıldız" },
            new Equipment { EquipmentCode = "EQP-043", EquipmentName = "Samsung Smart Monitor M8 32\"", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-044", EquipmentName = "Philips 276E8VJSB 27\" 4K Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-045", EquipmentName = "AOC Q27G2U 27\" QHD Gaming Monitör", Status = "Retired", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-046", EquipmentName = "Dell UltraSharp U2422H 24\" Monitör", Status = "InUse", CurrentHolderName = "Canan Tekin" },
            new Equipment { EquipmentCode = "EQP-047", EquipmentName = "HP Z27k G3 27\" 4K USB-C Monitör", Status = "InUse", CurrentHolderName = "Burak Arslan" },
            new Equipment { EquipmentCode = "EQP-048", EquipmentName = "Lenovo ThinkVision P27h-20 27\" Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-049", EquipmentName = "Asus TUF Gaming VG27AQ 27\" Monitör", Status = "InUse", CurrentHolderName = "Selin Çelik" },
            new Equipment { EquipmentCode = "EQP-050", EquipmentName = "ViewSonic ColorEdge VP2768a 27\" Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-051", EquipmentName = "Dell P2419H 24\" IPS Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-052", EquipmentName = "LG Ergo 32UN880-B 32\" 4K Monitör", Status = "InUse", CurrentHolderName = "Mustafa Aydın" },
            new Equipment { EquipmentCode = "EQP-053", EquipmentName = "Samsung Odyssey G5 27\" Curved Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-054", EquipmentName = "BenQ MOBIUZ EX2710Q 27\" Monitör", Status = "InUse", CurrentHolderName = "Deniz Yurt" },
            new Equipment { EquipmentCode = "EQP-055", EquipmentName = "Acer Nitro XV272U 27\" Monitör", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-056", EquipmentName = "Zebra TC21 Barkod Okuyucu El Terminali", Status = "InUse", CurrentHolderName = "Kerem Polat" },
            new Equipment { EquipmentCode = "EQP-057", EquipmentName = "Zebra TC57 Kurumsal El Terminali", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-058", EquipmentName = "Honeywell Dolphin CT40 El Terminali", Status = "InUse", CurrentHolderName = "Esra Karaca" },
            new Equipment { EquipmentCode = "EQP-059", EquipmentName = "Datalogic Memor 10 El Terminali", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-060", EquipmentName = "Zebra MC3300 Depo El Terminali", Status = "UnderMaintenance", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-061", EquipmentName = "iPhone 15 Pro 256GB (Şirket Telefonu)", Status = "InUse", CurrentHolderName = "Ahmet Yılmaz" },
            new Equipment { EquipmentCode = "EQP-062", EquipmentName = "Samsung Galaxy S24 Ultra 512GB", Status = "InUse", CurrentHolderName = "Ayşe Demir" },
            new Equipment { EquipmentCode = "EQP-063", EquipmentName = "iPhone 14 128GB (Şirket Telefonu)", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-064", EquipmentName = "Samsung Galaxy A54 128GB", Status = "InUse", CurrentHolderName = "Mehmet Kaya" },
            new Equipment { EquipmentCode = "EQP-065", EquipmentName = "iPhone 13 128GB (Şirket Telefonu)", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-066", EquipmentName = "Xiaomi Redmi Note 12 Pro", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-067", EquipmentName = "iPad Pro 12.9\" M2 256GB Wi-Fi", Status = "InUse", CurrentHolderName = "Zeynep Şahin" },
            new Equipment { EquipmentCode = "EQP-068", EquipmentName = "iPad Air 5 64GB Wi-Fi", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-069", EquipmentName = "Samsung Galaxy Tab S9 Ultra", Status = "InUse", CurrentHolderName = "Emir Kırım" },
            new Equipment { EquipmentCode = "EQP-070", EquipmentName = "Lenovo Tab P11 Pro Gen 2", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-071", EquipmentName = "Zebra TC26 4G El Terminali", Status = "InUse", CurrentHolderName = "Ali Öztürk" },
            new Equipment { EquipmentCode = "EQP-072", EquipmentName = "Honeywell ScanPal EDA52", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-073", EquipmentName = "iPhone SE 2022 (Şirket Telefonu)", Status = "Retired", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-074", EquipmentName = "Samsung Galaxy Tab Active4 Pro", Status = "InUse", CurrentHolderName = "Fatma Yıldız" },
            new Equipment { EquipmentCode = "EQP-075", EquipmentName = "iPad 10. Nesil 64GB", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-076", EquipmentName = "Jabra Evolve2 85 Kablosuz Kulaklık", Status = "InUse", CurrentHolderName = "Ahmet Yılmaz" },
            new Equipment { EquipmentCode = "EQP-077", EquipmentName = "Poly Voyager Focus 2 Kulaklık", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-078", EquipmentName = "Sony WH-1000XM5 ANC Kulaklık", Status = "InUse", CurrentHolderName = "Ayşe Demir" },
            new Equipment { EquipmentCode = "EQP-079", EquipmentName = "Bose QuietComfort 45 Kulaklık", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-080", EquipmentName = "Logitech MX Master 3S Kablosuz Mouse", Status = "InUse", CurrentHolderName = "Mehmet Kaya" },
            new Equipment { EquipmentCode = "EQP-081", EquipmentName = "Logitech MX Keys S Kablosuz Klavye", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-082", EquipmentName = "Apple Magic Keyboard & Trackpad Seti", Status = "InUse", CurrentHolderName = "Zeynep Şahin" },
            new Equipment { EquipmentCode = "EQP-083", EquipmentName = "Dell Thunderbolt Dock WD19TBS 180W", Status = "InUse", CurrentHolderName = "Emir Kırım" },
            new Equipment { EquipmentCode = "EQP-084", EquipmentName = "CalDigit TS4 Thunderbolt 4 Dock", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-085", EquipmentName = "Lenovo ThinkPad Universal Thunderbolt 4 Dock", Status = "UnderMaintenance", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-086", EquipmentName = "Anker PowerConf C200 2K Webcam", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-087", EquipmentName = "Logitech Brio 4K Ultra HD Webcam", Status = "InUse", CurrentHolderName = "Ali Öztürk" },
            new Equipment { EquipmentCode = "EQP-088", EquipmentName = "Blue Yeti USB Mikrofon", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-089", EquipmentName = "Elgato Stream Deck MK.2", Status = "InUse", CurrentHolderName = "Fatma Yıldız" },
            new Equipment { EquipmentCode = "EQP-090", EquipmentName = "HyperX QuadCast S RGB USB Mikrofon", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-091", EquipmentName = "HP LaserJet Enterprise M507x Yazıcı", Status = "InUse", CurrentHolderName = "Muhasebe Dep." },
            new Equipment { EquipmentCode = "EQP-092", EquipmentName = "Canon imageRUNNER ADVANCE C3530i Çok Fonksiyonlu Yazıcı", Status = "InUse", CurrentHolderName = "İnsan Kaynakları" },
            new Equipment { EquipmentCode = "EQP-093", EquipmentName = "Epson EcoTank L6270 Tanklı Yazıcı", Status = "Available", CurrentHolderName = null },
            new Equipment { EquipmentCode = "EQP-094", EquipmentName = "Fujitsu fi-7160 Belge Tarayıcı", Status = "InUse", CurrentHolderName = "Finans Dep." },
            new Equipment { EquipmentCode = "EQP-095", EquipmentName = "Zebra ZD421 Termal Barkod Yazıcı", Status = "InUse", CurrentHolderName = "Depo Sorumlusu" },
            new Equipment { EquipmentCode = "EQP-096", EquipmentName = "Logitech MeetUp 4K Konferans Kamerası", Status = "InUse", CurrentHolderName = "Toplantı Odası A" },
            new Equipment { EquipmentCode = "EQP-097", EquipmentName = "Poly Studio X50 Video Bar & Touch Pad", Status = "InUse", CurrentHolderName = "Toplantı Odası B" },
            new Equipment { EquipmentCode = "EQP-098", EquipmentName = "Samsung Flip 2 65\" İnteraktif Akıllı Tahta", Status = "InUse", CurrentHolderName = "İnovasyon Odası" },
            new Equipment { EquipmentCode = "EQP-099", EquipmentName = "Cisco Catalyst 9300 48-Port PoE Switch", Status = "InUse", CurrentHolderName = "Sistem Odası" },
            new Equipment { EquipmentCode = "EQP-100", EquipmentName = "Ubiquiti UniFi Dream Machine Special Edition", Status = "InUse", CurrentHolderName = "Sistem Odası" }
        };
    }
}
