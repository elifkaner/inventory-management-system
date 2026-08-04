namespace InventoryManagement.Application.DTOs.Common;

public class PagedResult<T>
{
    public IList<T> Items { get; set; } = new List<T>();

    public int PageSize { get; set; }

    public int PageNumber { get; set; }

    public int TotalPage => PageSize > 0 ? (int)Math.Ceiling(TotalRecord / (double)PageSize) : 1;

    public int TotalRecord { get; set; }
}