namespace InventoryManagement.Application.Common;

public static class PaginationHelper
{
    private const int MaxPageSize = 100;
    private const int DefaultPageSize = 20;

    private const int MaxTopN = 50;
    private const int DefaultTopN = 10;
    private const int MaxMonthsBack = 60;
    private const int DefaultMonthsBack = 6;

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

    public static bool TryValidateTopN(int topN, out int validTopN, out string? errorMessage)
    {
        errorMessage = null;
        validTopN = topN;

        if (validTopN < 1)
        {
            validTopN = DefaultTopN;
        }

        if (validTopN > MaxTopN)
        {
            validTopN = MaxTopN;
        }

        return true;
    }

    public static bool TryValidateMonthsBack(int monthsBack, out int validMonthsBack, out string? errorMessage)
    {
        errorMessage = null;
        validMonthsBack = monthsBack;

        if (validMonthsBack < 1)
        {
            validMonthsBack = DefaultMonthsBack;
        }

        if (validMonthsBack > MaxMonthsBack)
        {
            validMonthsBack = MaxMonthsBack;
        }

        return true;
    }
}
