FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY src/InventoryManagement.API/InventoryManagement.API.csproj src/InventoryManagement.API/
COPY src/InventoryManagement.Application/InventoryManagement.Application.csproj src/InventoryManagement.Application/
COPY src/InventoryManagement.Infrastructure/InventoryManagement.Infrastructure.csproj src/InventoryManagement.Infrastructure/
COPY src/InventoryManagement.Domain/InventoryManagement.Domain.csproj src/InventoryManagement.Domain/
RUN dotnet restore src/InventoryManagement.API/InventoryManagement.API.csproj

COPY src/ src/
RUN dotnet publish src/InventoryManagement.API/InventoryManagement.API.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

RUN apt-get update && apt-get install -y libgssapi-krb5-2 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/publish .
COPY src/InventoryManagement.API/.env ./.env

EXPOSE 5000
ENTRYPOINT ["dotnet", "InventoryManagement.API.dll"]
