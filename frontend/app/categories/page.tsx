// 'use client' komutu, Next.js'e bu sayfanın sunucuda (server) değil, 
// kullanıcının tarayıcısında (client) çalışacağını söyler. 
// useState ve useEffect gibi React hook'larını kullanabilmek için bu mecburidir.
'use client';
import { useState, useEffect } from 'react';

export default function KategorilerSayfasi() {

    // --- 1. HAFIZA ALANLARI (STATE'LER) ---
    // Component içinde değiştiğinde ekranın anında güncellenmesini sağlayan değişkenler.

    // categories: Ekranda listelenecek tüm kategorileri tutan dizi. Başlangıçta boş bir dizi ([]).
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    // isModalOpen: Ekleme/Düzenleme penceresinin (modal) açık mı kapalı mı olduğunu tutar (true/false).
    const [isModalOpen, setIsModalOpen] = useState(false);

    // categoryName: Modal içindeki input kutusuna (metin kutusu) yazılan yazıyı anlık olarak tutar.
    const [categoryName, setCategoryName] = useState("");

    // editingId: Eğer "Düzenle" butonuna basıldıysa, hangi ID'li kategorinin düzenlendiğini tutar.
    // Eğer yeni kayıt ekleniyorsa değeri 'null' kalır. Bu sayede Kaydet butonunun ne yapacağını anlarız.
    const [editingId, setEditingId] = useState<number | null>(null);

    // Backend projesinin (asansörün gideceği) ana adres.
    const API_BASE_URL = 'http://192.168.2.176:5000/api/Category';


    // --- 2. SAYFA YÜKLENDİĞİNDE VERİLERİ ÇEKME (READ / GET) ---
    // useEffect, sayfa ilk açıldığında veya içindeki değerler değiştiğinde tetiklenir.
    // En sondaki boş dizi [] sayesinde, bu işlemin sadece sayfa ilk açıldığında 1 kez çalışmasını sağlarız.
    // KategorilerSayfasi.tsx içindeki useEffect'ini şu "sağlam" versiyonla değiştir
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch(API_BASE_URL);
                if (!res.ok) return; // Hata varsa boş dön, uygulamayı çökertme
                const data = await res.json();

                // Sadece dolu isimleri al, gereksiz "Bilinmeyen"leri temizle
                const cleanData = data
                    .filter((item: any) => item.name && item.name.trim() !== "")
                    .map((item: any) => ({ id: item.id, name: item.name }));

                setCategories(cleanData);
            } catch (err) {
                console.warn("Backend kapalı veya ulaşılamıyor, şu an veriler yüklenemedi.");
            }
        };
        loadCategories();
    }, []);


    // --- 3. SİLME İŞLEMİ (DELETE) ---
    // Tablodaki "Sil" butonuna tıklandığında çalışır.
    const handleDelete = (id: number, name: string) => {
        // Kullanıcıya yanlışlıkla basma ihtimaline karşı bir onay penceresi çıkartırız.
        const isConfirmed = window.confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`);

        // Eğer kullanıcı "Tamam"a basarsa:
        if (isConfirmed) {
            // İlgili ID'yi adresin sonuna ekleyip (örn: /api/Category/5) DELETE isteği atıyoruz.
            fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            })
                .then(cevap => {
                    if (!cevap.ok) throw new Error('Silme işlemi başarısız');

                    // Backend'de silindi. Şimdi sayfayı yenilemeden ekrandan da anında silmek için
                    // eski listedeki (c.id), sildiğimiz ID'ye eşit olmayanları filtreleyip yeni listeye atıyoruz.
                    const updatedCategories = categories.filter(c => c.id !== id);
                    setCategories(updatedCategories);
                })
                .catch(hata => console.error("Silme hatası:", hata));
        }
    };


    // --- 4. DÜZENLE MODALINI AÇMA ---
    // Tablodaki "Düzenle" butonuna tıklandığında çalışır.
    const handleEditClick = (category: { id: number, name: string }) => {
        setEditingId(category.id); // Hangi kaydı düzenlediğimizi hafızaya al.
        setCategoryName(category.name); // Input kutusunun içine o kategorinin eski adını yazdır.
        setIsModalOpen(true); // Modalı görünür yap.
    };

    // --- 5. KAYDET / GÜNCELLE İŞLEMİ (TAMAMEN DÜZELTİLMİŞ HALİ) ---
    const handleSave = () => {
        if (categoryName.trim() === "") return;

        if (editingId !== null) {
            // GÜNCELLEME (PUT)
            fetch(`${API_BASE_URL}/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingId,
                    name: categoryName
                })
            })
                .then(cevap => {
                    if (!cevap.ok) throw new Error('Güncelleme başarısız');
                    const updatedCategories = categories.map(cat =>
                        cat.id === editingId ? { ...cat, name: categoryName } : cat
                    );
                    setCategories(updatedCategories);
                    closeModal();
                })
                .catch(hata => console.error("Güncelleme hatası:", hata));
        } else {
            // YENİ EKLEME (POST)
            fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: categoryName
                })
            })
                .then(cevap => {
                    if (!cevap.ok) throw new Error('Ekleme başarısız');
                    return cevap.json();
                })
                .then(yeniVeri => {
                    const newCategory = {
                        id: yeniVeri.id,
                        name: yeniVeri.name || categoryName // <--- BURASI DA DÜZELTİLDİ
                    };
                    setCategories([...categories, newCategory]);
                    closeModal();
                })
                .catch(hata => console.error("Ekleme hatası:", hata));
        }
    };

    // --- 6. MODALI KAPATMA VE TEMİZLİK ---
    // "İptal" butonuna basıldığında veya işlem başarıyla bittiğinde çalışır.
    const closeModal = () => {
        setIsModalOpen(false); // Modalı ekrandan gizler.
        setCategoryName(""); // İçinde yazan yazıyı sıfırlar (tekrar açıldığında eski yazı kalmasın diye).
        setEditingId(null); // Düzenleme modundan çıkar, yeni ekleme moduna geri döner.
    };


    // --- 7. ARAYÜZ (HTML/JSX) ÇİZİMİ ---
    // Kullanıcının ekranda göreceği butonlar, tablolar ve pencereler burada tanımlanır.
    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Üst Bilgi ve Buton */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kategoriler</h1>
                <button
                    onClick={() => {
                        // Yeni Kategori Ekle butonuna basılınca temizlik yapıp modalı açıyoruz.
                        setEditingId(null);
                        setCategoryName("");
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    + Yeni Kategori
                </button>
            </div>

            {/* Tablo Alanı */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        {/* Tablo Sütun Başlıkları */}
                        <tr className="bg-gray-100 border-b border-gray-200 text-gray-600  text-sm tracking-wider">
                            <th className="p-4 font-semibold">Kategori Adı</th>
                            <th className="p-4 font-semibold text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Eğer categories dizisi boşsa (uzunluğu 0 ise) ekrana "veri yok" mesajı bas.
                            Eğer doluysa, map() fonksiyonu ile her bir kategori için yeni bir <tr> (satır) oluştur.
                        */}
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="p-8 text-center text-gray-500">
                                    Şu an hiç kategori yok veya veriler yükleniyor...
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                // React, döngülerde her bir elemanın benzersiz bir 'key' değeri olmasını zorunlu tutar.
                                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-800 font-medium">{cat.name}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            {/* Düzenle Butonu - handleEditClick fonksiyonunu çağırır */}
                                            <button
                                                onClick={() => handleEditClick(cat)}
                                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                            >
                                                Düzenle
                                            </button>
                                            {/* Sil Butonu - handleDelete fonksiyonunu çağırır */}
                                            <button
                                                onClick={() => handleDelete(cat.id, cat.name)}
                                                className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal (Pencere) Alanı */}
            {/* isModalOpen değeri sadece 'true' olduğunda aşağıdaki HTML yapısı ekrana çizilir (render edilir). */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            {/* Eğer editingId varsa başlık 'Düzenle', yoksa 'Yeni Kategori' olur. */}
                            {editingId ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
                        </h2>

                        {/* Kullanıcının veri girdiği Input */}
                        <input
                            type="text"
                            placeholder="Kategori adı girin..."
                            className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            value={categoryName} // Input'un içindeki yazı 'categoryName' state'ine bağlıdır.
                            onChange={(e) => setCategoryName(e.target.value)} // Klavye ile her tuşa basıldığında state anında güncellenir.
                        />

                        <div className="flex justify-end gap-2">
                            {/* Modalı kapatma butonu */}
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                İptal
                            </button>
                            {/* Veriyi kaydetme veya güncelleme butonu */}
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                            >
                                {/* Yine duruma göre butonun üstündeki yazıyı değiştiriyoruz */}
                                {editingId ? 'Güncelle' : 'Kaydet'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}