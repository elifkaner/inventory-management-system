namespace InventoryManagement.Application.Common;

public static class PaginationHelper
{
    private const int MaxPageSize = 100;
    private const int DefaultPageSize = 20;

    public static bool TryValidate(int? page, int? pageSize, out int? validPage, out int? validPageSize, out string? errorMessage)
    {
        validPage = page;
        validPageSize = pageSize;
        errorMessage = null;

        if (page.HasValue && page < 1)
        {
            errorMessage = "Sayfa numarası 1'den küçük olamaz.";
            return false;
        }

        if (validPageSize.HasValue && validPageSize < 1)
        {
            validPageSize = DefaultPageSize;
        }

        if (validPageSize.HasValue && validPageSize > MaxPageSize)
        {
            validPageSize = MaxPageSize;
        }

        return true;
    }
}
