namespace InventoryManagement.Application.Exceptions;

// Bir kategori silinmeye çalışılırken, ona bağlı ürünler varsa ve hedef bir kategori
// belirtilmemişse fırlatılır. Controller bunu yakalayıp ProductCount bilgisiyle birlikte
// istemciye döner, böylece istemci kullanıcıya "ürünleri nereye taşımak istersin?" diye sorabilir.
public class CategoryHasProductsException : Exception
{
    public int ProductCount { get; }

    public CategoryHasProductsException(int productCount)
        : base($"Bu kategoriye bağlı {productCount} ürün var. Silmeden önce bu ürünleri başka bir kategoriye taşımalısınız.")
    {
        ProductCount = productCount;
    }
}
