namespace InventoryManagement.Application.Exceptions;

// Bir kayıt, biz onu okuyup güncellemeye çalışırken başka biri tarafından değiştirildiğinde
// (EF Core'un DbUpdateConcurrencyException'ı) fırlatılır. Controller katmanında bu, diğer
// InvalidOperationException'lardan (ör. "yetersiz stok") ayrı tutulup 409 Conflict'e çevrilir.
public class ConcurrencyConflictException : Exception
{
    public ConcurrencyConflictException(string message) : base(message)
    {
    }
}
