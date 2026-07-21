using System.Text;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using DotNetEnv;
using InventoryManagement.Application;
using InventoryManagement.Infrastructure;
using InventoryManagement.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

DotNetEnv.Env.Load();

var connectionString =
    $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
    $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
    $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
    $"Username={Environment.GetEnvironmentVariable("DB_USER")};" +
    $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";

var builder = WebApplication.CreateBuilder(args);

// URL, ortam değişkeni ASPNETCORE_URLS ile kontrol edilir (docker-compose'da
// http://0.0.0.0:5000 olarak set edilir); yerelde de aynı varsayılan kullanılır.
builder.WebHost.UseUrls(Environment.GetEnvironmentVariable("ASPNETCORE_URLS") ?? "http://0.0.0.0:5000");


// Controller + JSON Ayarları
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });


// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT token'ı buraya yapıştır (başına 'Bearer ' yazmana gerek yok)"
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        { new OpenApiSecuritySchemeReference("Bearer", document), new List<string>() }
    });
});


// Application + Infrastructure (Clean Architecture katmanları)
builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);


// JWT Authentication
var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET")!;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
            ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Rate Limiting — /api/Auth altındaki uç noktaları (login, register, refresh, vs.) IP başına
// dakikada 5 istekle sınırlar. Brute-force şifre denemesi ve token tahmin saldırılarını yavaşlatır.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("AuthPolicy", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));
});


var app = builder.Build();


// Ngrok tüneli üzerinden dışarıya açıldığımızda, Kestrel'e TCP seviyesinde
// bağlanan taraf ngrok olur (gerçek istemci değil). Bu middleware, ngrok'un
// eklediği X-Forwarded-For/X-Forwarded-Proto header'larını okuyup gerçek istemci
// IP'sini HttpContext.Connection.RemoteIpAddress'in üzerine yazar — aksi halde
// rate limiter (AuthPolicy) tüm istemcileri ngrok'un tek IP'si sanır.
// NOT: KnownNetworks/KnownProxies boş bırakıldığı için bu header'lar HERHANGİ bir
// kaynaktan (doğrudan 5050 portuna bağlanan biri dahil) geliyorsa güvenilir sayılır —
// artık bu portu tek bir sabit reverse proxy (nginx) korumadığı için, doğrudan porta
// erişimi olan biri X-Forwarded-For'u sahteleyip rate limiter'ı atlatabilir.
var forwardedHeadersOptions = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
};
forwardedHeadersOptions.KnownIPNetworks.Clear();
forwardedHeadersOptions.KnownProxies.Clear();
app.UseForwardedHeaders(forwardedHeadersOptions);


// Bekleyen tüm migration'ları uygulama başlarken otomatik uygular — elle
// "dotnet ef database update" çalıştırmayı unutma riskini ortadan kaldırır.
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
}


// İlk admin kullanıcısını oluşturur (ADMIN_EMAIL/ADMIN_PASSWORD .env'de tanımlıysa ve henüz yoksa).
using (var scope = app.Services.CreateScope())
{
    var authService = scope.ServiceProvider.GetRequiredService<InventoryManagement.Application.Interfaces.Services.IAuthService>();
    await authService.SeedAdminAsync();
}


app.UseSwagger();
app.UseSwaggerUI();


// app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

app.MapControllers();


app.Run();
