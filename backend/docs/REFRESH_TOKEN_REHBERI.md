# Refresh Token Ekleme Rehberi

Bu rehber, projeye refresh token mekanizmasını **sen** eklerken adım adım takip etmen için yazıldı.
Her adımda ne yazman gerektiği, hangi dosyaya, ve **neden** o şekilde yapıldığı anlatılıyor —
ama kodun tamamı sana verilmiyor, sen yazacaksın. Takıldığın yerde bana sorabilirsin.

Mevcut mimari (Clean Architecture) katmanlarına sadık kalıyoruz:
`Domain` (entity'ler) → `Application` (arayüzler, DTO'lar, servisler) → `Infrastructure` (EF Core,
repository implementasyonları) → `API` (controller'lar).

---

## Adım 0: Genel plan

Şu an `LoginResponseDto` sadece tek bir `Token` alanı taşıyor. Hedefimiz:

1. Login artık **iki** token dönecek: kısa ömürlü `AccessToken` + uzun ömürlü `RefreshToken`.
2. Refresh token'lar veritabanında bir tabloda saklanacak (iptal edilebilir olmaları için).
3. Yeni bir endpoint (`POST /api/Auth/refresh`) ile, access token süresi dolunca kullanıcı
   tekrar şifre girmeden yeni bir access token alabilecek.
4. Bonus: `POST /api/Auth/logout` ile refresh token'ı iptal edebileceğiz.

---

## Adım 1: Domain katmanı — `RefreshToken` entity'si

**Dosya:** `src/InventoryManagement.Domain/Entities/RefreshToken.cs` (yeni dosya)

`User.cs`'e bak (`UserId`, `Name`, `Email`... şeklinde düz property'ler), aynı stille yeni bir
entity yaz. İçermesi gereken alanlar:

| Alan | Tip | Ne işe yarar |
|---|---|---|
| `Id` | `int` | Primary key (EF Core, adı `Id` ya da `{ClassName}Id` olan property'yi otomatik PK sayar) |
| `Token` | `string` | Rastgele üretilen, tahmin edilemez token değeri |
| `UserId` | `int` | Bu token hangi kullanıcıya ait (foreign key) |
| `ExpiresAt` | `DateTime` | Ne zaman geçersiz olacak (login'deki `expires` gibi ama çok daha uzun, örn. 7 gün) |
| `IsRevoked` | `bool` | Elle iptal edildi mi (logout ya da rotation sonrası) |
| `CreatedAt` | `DateTime` | Ne zaman üretildi (debug/log amaçlı, opsiyonel ama faydalı) |

**Düşünmen gereken soru:** `User.cs`'te `Role` gibi alanlar `string.Empty` varsayılan değeriyle
tanımlanmış. `RefreshToken` için hangi alanların varsayılan değere ihtiyacı var, hangileri
`required` olmalı? (İpucu: `Token`, `UserId`, `ExpiresAt` olmadan bir refresh token anlamsız.)

---

## Adım 2: `AppDbContext`'e tabloyu tanıt + migration

**Dosya:** `src/InventoryManagement.Infrastructure/Persistence/AppDbContext.cs`

`DbSet<User> Users` satırının yanına aynı formatta bir `DbSet<RefreshToken> RefreshTokens` ekle.

**İsteğe bağlı ama önerilir:** `OnModelCreating` içinde, `Product -> Supplier` ilişkisinde
gördüğün Fluent API kalıbını örnek alarak `RefreshToken -> User` ilişkisini tanımla
(`HasOne`/`WithMany`/`HasForeignKey`). Bu olmadan da EF Core `UserId` adından ilişkiyi
otomatik çıkarabilir (convention-based), ama açıkça yazmak daha az sürpriz demek.

Sonra terminalde (backend klasöründe):
```
dotnet ef migrations add AddRefreshToken --project src/InventoryManagement.Infrastructure --startup-project src/InventoryManagement.API
dotnet ef database update --project src/InventoryManagement.Infrastructure --startup-project src/InventoryManagement.API
```
(Projenin diğer migration'larını `Infrastructure/Persistence/Migrations/` altında görebilirsin,
komut formatı muhtemelen bunlarla aynı olacak — orada nasıl çalıştırıldığına dair bir not/script
varsa onu kullan.)

**Düşünmen gereken soru:** Migration'ı çalıştırdıktan sonra oluşan dosyayı aç, `Up()` metodunda
gerçekten `RefreshTokens` tablosunun, senin tanımladığın sütunlarla oluştuğunu doğrula.

---

## Adım 3: Repository katmanı

**Dosya:** `src/InventoryManagement.Application/Interfaces/Repositories/IRefreshTokenRepository.cs` (yeni)

`IUserRepository.cs`'teki gibi bir arayüz yaz. İhtiyacın olacak metodlar:
- `Task<RefreshToken> AddAsync(RefreshToken token)` — yeni token kaydet
- `Task<RefreshToken?> GetByTokenAsync(string token)` — refresh endpoint'i bunu kullanacak, gelen token'ı DB'de bulmak için
- `Task UpdateAsync(RefreshToken token)` — `IsRevoked = true` yapıp kaydetmek için (rotation/logout)

**Dosya:** `src/InventoryManagement.Infrastructure/Repositories/RefreshTokenRepository.cs` (yeni)

`UserRepository.cs`'i birebir örnek al — aynı constructor deseni (`AppDbContext` inject),
aynı `FirstOrDefaultAsync` / `Add` + `SaveChangesAsync` kalıbı.

**Dosya:** `src/InventoryManagement.Infrastructure/DependencyInjection.cs`

`services.AddScoped<IUserRepository, UserRepository>();` satırının yanına aynı formatta
`IRefreshTokenRepository` kaydını ekle — bunu unutursan DI, "bu arayüzü kimse implemente
etmiyor" diye runtime'da patlar (derleme zamanında değil, uygulama ayağa kalkarken).

---

## Adım 4: DTO'ları güncelle

**Dosya:** `src/InventoryManagement.Application/DTOs/User/LoginResponseDto.cs`

Şu an muhtemelen tek alan var (`Token`). İki alana çıkar: `AccessToken` ve `RefreshToken`
(isimlendirme önemli — frontend hangi token'ın ne işe yaradığını isimden anlayabilmeli).

**Dosya:** `src/InventoryManagement.Application/DTOs/User/RefreshRequestDto.cs` (yeni)

Client'ın `/api/Auth/refresh`'e ne göndereceğini tanımlar — tek bir alan yeterli:
`RefreshToken` (string).

---

## Adım 5: Token üretme mantığı — `AuthService.cs`

Bu en can alıcı kısım. Şu an `GenerateJwtToken(User user)` metodu var, sadece access token
üretiyor. Yapman gerekenler:

1. **Yeni bir private metod yaz**: `GenerateRefreshToken()` — kriptografik olarak güvenli,
   rastgele bir string üretmeli. `Guid.NewGuid().ToString()` da "çalışır" ama tahmin
   edilebilirliği daha yüksek biçimde tasarlanmıştır (rastgelelik garantisi zayıf); tercih
   edilen yol:
   ```csharp
   using System.Security.Cryptography;
   var randomBytes = RandomNumberGenerator.GetBytes(64);
   return Convert.ToBase64String(randomBytes);
   ```
   Bunu neden `BCrypt.HashPassword` gibi bir şeyle değil de rastgele byte üreterek yaptığımızı
   düşün — burada "hash'lenecek" bir girdi yok, sıfırdan tahmin edilemez bir değer üretiyoruz.

2. **`LoginAsync`'i güncelle**: Şu an sadece `GenerateJwtToken` çağırıp dönüyor. Artık:
   - Access token'ı eskisi gibi üret
   - Yeni refresh token string'ini üret
   - Bir `RefreshToken` entity'si oluştur (`UserId`, `Token`, `ExpiresAt = DateTime.UtcNow.AddDays(7)`, `IsRevoked = false`)
   - `_refreshTokenRepository.AddAsync(...)` ile kaydet (bunun için constructor'a
     `IRefreshTokenRepository` eklemen gerekecek — `AuthService`'in constructor'ına yeni bir
     parametre eklemek gibi düşün, `_userRepository`'nin yanına)
   - `LoginResponseDto` içine ikisini de koyup dön

**Düşünmen gereken soru:** Access token 2 saat, refresh token 7 gün yaşıyor — bu süreleri
neden böyle seçtiğimizi (kısa vs. uzun ömür dengesi) bir cümleyle kendine açıklayabiliyor musun?

---

## Adım 6: Refresh endpoint'i

**Dosya:** `src/InventoryManagement.Application/Interfaces/Services/IAuthService.cs`

Yeni bir metod imzası ekle: `Task<LoginResponseDto?> RefreshAsync(RefreshRequestDto dto);`

**Dosya:** `src/InventoryManagement.Application/Services/AuthService.cs`

`RefreshAsync` metodunu yaz. Akış (`LoginAsync`'teki null-kontrolü zincirine çok benzer):
1. `_refreshTokenRepository.GetByTokenAsync(dto.RefreshToken)` ile token'ı bul
2. Bulunamadıysa → `null` dön
3. Bulunduysa ama `IsRevoked == true` **veya** `ExpiresAt < DateTime.UtcNow` ise → `null` dön
   (İpucu: neden bu ikisini de kontrol etmemiz gerekiyor, sadece birini değil?)
4. Geçerliyse: **eski token'ı iptal et** (`IsRevoked = true`, `UpdateAsync` ile kaydet) — buna
   **rotation** deniyor, her refresh'te eski token bir daha kullanılamaz hale gelir
5. İlgili kullanıcıyı bul (`GetByIdAsync(refreshToken.UserId)` — az önce `SetUserRoleAsync`'te
   kullandığımız metodun aynısı)
6. Yeni bir access token + yeni bir refresh token üret (adım 5'teki gibi), yeni refresh
   token'ı kaydet
7. İkisini `LoginResponseDto` içinde dön

**Dosya:** `src/InventoryManagement.API/Controllers/AuthController.cs`

`Login` metoduyla aynı kalıpta yeni bir endpoint:
```csharp
[HttpPost("refresh")]
[AllowAnonymous]
public async Task<IActionResult> Refresh(RefreshRequestDto dto)
{
    // LoginAsync ile aynı kalıp: sonucu al, null ise Unauthorized, değilse Ok
}
```
**Düşünmen gereken soru:** Neden `[AllowAnonymous]`? Bu isteği atan kişinin zaten geçerli bir
access token'ı yok (o yüzden refresh istiyor), o zaman `[Authorize]` koyarsak ne olur?

---

## Adım 7 (Bonus): Logout

**Dosya:** `IAuthService.cs` + `AuthService.cs`

`Task<bool> LogoutAsync(string refreshToken)` — gelen refresh token'ı bul, bulunduysa
`IsRevoked = true` yapıp kaydet, `true` dön; bulunamadıysa `false`.

**Dosya:** `AuthController.cs`
```csharp
[HttpPost("logout")]
[Authorize]   // burada AllowAnonymous DEĞİL — neden dersin?
public async Task<IActionResult> Logout(RefreshRequestDto dto)
{
    // ...
}
```

---

## Test etme kontrol listesi

Değişiklikleri bitirince, Swagger üzerinden (`/swagger`) veya Postman ile şunları dene:

- [ ] `POST /api/Auth/login` → response'ta hem `accessToken` hem `refreshToken` alanları geliyor mu?
- [ ] Aldığın `refreshToken`'ı `POST /api/Auth/refresh`'e gönder → yeni bir `accessToken` geliyor mu?
- [ ] Refresh'ten dönen **yeni** `refreshToken`'ı not al, sonra **eski** `refreshToken`'ı tekrar
      `/refresh`'e göndermeyi dene → **reddedilmeli** (rotation çalışıyor mu?)
- [ ] Veritabanında elle bir `RefreshToken` satırının `ExpiresAt`'ini geçmişe çek, onu
      `/refresh`'e gönder → reddedilmeli
- [ ] `dotnet build` ile derleme hatası olmadığını doğrula

---

## Özet — değişecek/eklenecek dosyalar

```
YENİ:
  Domain/Entities/RefreshToken.cs
  Application/Interfaces/Repositories/IRefreshTokenRepository.cs
  Application/DTOs/User/RefreshRequestDto.cs
  Infrastructure/Repositories/RefreshTokenRepository.cs

DEĞİŞECEK:
  Infrastructure/Persistence/AppDbContext.cs         (+ DbSet, opsiyonel ilişki tanımı)
  Infrastructure/DependencyInjection.cs               (+ DI kaydı)
  Application/DTOs/User/LoginResponseDto.cs            (Token -> AccessToken + RefreshToken)
  Application/Interfaces/Services/IAuthService.cs      (+ RefreshAsync, + LogoutAsync)
  Application/Services/AuthService.cs                  (+ GenerateRefreshToken, LoginAsync güncelle, + RefreshAsync, + LogoutAsync)
  API/Controllers/AuthController.cs                    (+ POST /refresh, + POST /logout)

+ yeni bir EF Core migration
```

Takıldığın herhangi bir adımda (özellikle migration çalıştırma veya rotation mantığı) bana
sorabilirsin — hatanı görüp birlikte çözeriz.
