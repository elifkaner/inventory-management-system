using System.Linq;
using System.Text;

namespace InventoryManagement.Application.Common;

public static class CsvHelper
{
    private static readonly char[] FormulaTriggerChars = { '=', '+', '-', '@' };

    public static string Escape(string value)
    {
        // Excel'de "=", "+", "-", "@" ile başlayan hücreler formül olarak çalıştırılabilir
        // (CSV/Formula Injection). Başına apostrof koyarak düz metin olmaya zorluyoruz.
        if (value.Length > 0 && FormulaTriggerChars.Contains(value[0]))
        {
            value = "'" + value;
        }

        if (value.Contains(',') || value.Contains('"') || value.Contains('\n'))
        {
            return "\"" + value.Replace("\"", "\"\"") + "\"";
        }

        return value;
    }

    public static byte[] ToUtf8Bytes(string csv)
    {
        // Excel'in Türkçe karakterleri doğru göstermesi için UTF-8 BOM ekleniyor
        var preamble = Encoding.UTF8.GetPreamble();
        var body = Encoding.UTF8.GetBytes(csv);

        return preamble.Concat(body).ToArray();
    }
}
