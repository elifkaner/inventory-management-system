using System.Text;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using DotNetEnv;
using InventoryManagement.Application;
using InventoryManagement.Infrastructure;
using InventoryManagement.Infrastructure.Persistence;
using InventoryManagement.Infrastructure.Realtime;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

if (File.Exists(".env"))
{
    DotNetEnv.Env.Load(".env");
}
else if (File.Exists(Path.Combine(AppContext.BaseDirectory, ".env")))
{
    DotNetEnv.Env.Load(Path.Combine(AppContext.BaseDirectory, ".env"));
}
else
{
    DotNetEnv.Env.Load();
}

var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT");

// Eğer environment variable doldurulmamışsa (Cloud Run tarafında), Neon varsayılan değerlerine düş
if (string.IsNullOrWhiteSpace(dbHost)) dbHost = "ep-super-rice-axutcxia-pooler.c-4.us-east-2.aws.neon.tech";
if (string.IsNullOrWhiteSpace(dbUser)) dbUser = "neondb_owner";
if (string.IsNullOrWhiteSpace(dbPassword)) dbPassword = "npg_dn4uVOeJWj8T";
if (string.IsNullOrWhiteSpace(dbName)) dbName = "neondb";
if (string.IsNullOrWhiteSpace(dbPort)) dbPort = "5432";

var sslMode = Environment.GetEnvironmentVariable("DB_SSL_MODE") 
    ?? (dbHost.Contains("neon.tech") ? "Require" : "Prefer");

var connectionString =
    $"Host={dbHost};" +
    $"Port={dbPort};" +
    $"Database={dbName};" +
    $"Username={dbUser};" +
    $"Password={dbPassword};" +
    $"SSL Mode={sslMode};";
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

builder.Services.AddHttpContextAccessor();
builder.Services.AddMemoryCache();
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

        // Tarayıcılar WebSocket bağlantısında Authorization header'ı gönderemez,
        // SignalR bu yüzden token'ı query string ile taşır (?access_token=...).
        // Sadece Hub yoluna gelen isteklerde bunu kabul ediyoruz.
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ProductionCors", policy =>
    {
        policy.WithOrigins(
            "https://inventory-frontend-1059155057805.europe-west1.run.app",
            "http://localhost:3000",
            "http://localhost:5050",
            "http://127.0.0.1:3000"
        )
        .SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
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



var forwardedHeadersOptions = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
};
forwardedHeadersOptions.KnownIPNetworks.Clear();
forwardedHeadersOptions.KnownProxies.Clear();
app.UseForwardedHeaders(forwardedHeadersOptions);


// Bekleyen tüm migration'ları uygulama başlarken otomatik uygular
try
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await dbContext.Database.MigrateAsync();
    }
}
catch (Exception ex)
{
    Console.WriteLine($"[WARNING] Database migration failed: {ex.Message}");
}

// İlk admin kullanıcısını oluşturur
try
{
    using (var scope = app.Services.CreateScope())
    {
        var authService = scope.ServiceProvider.GetRequiredService<InventoryManagement.Application.Interfaces.Services.IAuthService>();
        await authService.SeedAdminAsync();
    }
}
catch (Exception ex)
{
    Console.WriteLine($"[WARNING] Admin seeding failed: {ex.Message}");
}


app.UseSwagger();
app.UseSwaggerUI();


// app.UseHttpsRedirection();

app.UseCors("ProductionCors");

app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

app.MapControllers();
app.MapHub<StockMovementHub>("/hubs/stock-movements").RequireAuthorization();


app.Run();
