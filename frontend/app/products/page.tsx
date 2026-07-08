'use client';
import { useState } from 'react';

export default function UrunlerSayfasi() {
    // 1. ARAYÜZ (UI) HAFIZALARI
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. AKILLI FORM HAFIZALARI (Seçtikçe dolacak olanlar)
    const [seciliKategori, setSeciliKategori] = useState("");
    const [seciliAltKategori, setSeciliAltKategori] = useState("");

    // 3. SAHTE VERİ TABANI (API gelene kadar bizi idare edecek kurallar)
    // Hangi kategorinin altında hangi alt kategoriler var?
    const kategoriKurallari: Record<string, string[]> = {
        "Elektronik": ["Laptop", "Akıllı Telefon"],
        "Giyim": ["Tişört", "Ayakkabı"]
    };

    // Hangi alt kategori seçildiğinde hangi özellikler sorulmalı? (İşte şov burası!)
    const ozellikKurallari: Record<string, string[]> = {
        "Laptop": ["RAM Kapasitesi", "İşlemci Modeli", "Ekran Boyutu"],
        "Akıllı Telefon": ["Dahili Hafıza", "Kamera Çözünürlüğü", "Renk"],
        "Tişört": ["Beden", "Kumaş Tipi"],
        "Ayakkabı": ["Ayakkabı Numarası", "Kullanım Alanı"]
    };

    // Modalı kapatıp formu sıfırlayan temizlikçi
    const formuSifirla = () => {
        setIsModalOpen(false);
        setSeciliKategori("");
        setSeciliAltKategori("");
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Üst Bilgi ve Ekle Butonu */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Ürün Listesi</h1>
                    <p className="text-sm text-gray-500 mt-1">Sistemdeki tüm ürünleri ve varyant stoklarını yönetin.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
                >
                    <span>+</span> Ürün Ekle
                </button>
            </div>

            {/* Şimdilik boş duran tablo alanı (Burayı sonra dolduracağız) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                Ürün listesi yakında buraya gelecek...
            </div>

            {/* AKILLI FORM (MODAL) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">

                        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
                            Yeni Ürün Ekle (Sahibinden Mantığı)
                        </h2>

                        {/* 1. ADIM: ANA KATEGORİ SEÇİMİ */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ana Kategori</label>
                            <select
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={seciliKategori}
                                onChange={(e) => {
                                    setSeciliKategori(e.target.value);
                                    setSeciliAltKategori(""); // Ana kategori değişirse, alt kategoriyi sıfırla!
                                }}
                            >
                                <option value="">Lütfen Seçiniz...</option>
                                <option value="Elektronik">Elektronik</option>
                                <option value="Giyim">Giyim</option>
                            </select>
                        </div>

                        {/* 2. ADIM: ALT KATEGORİ SEÇİMİ (Sadece Ana Kategori seçildiyse görünür) */}
                        {seciliKategori && (
                            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <label className="block text-sm font-medium text-blue-800 mb-1">
                                    {seciliKategori} Alt Kategorisi
                                </label>
                                <select
                                    className="w-full p-2.5 border border-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={seciliAltKategori}
                                    onChange={(e) => setSeciliAltKategori(e.target.value)}
                                >
                                    <option value="">Seçiniz...</option>
                                    {/* Seçilen ana kategoriye göre alt kategorileri dizi içinden döngüyle basıyoruz */}
                                    {kategoriKurallari[seciliKategori].map(alt => (
                                        <option key={alt} value={alt}>{alt}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* 3. ADIM: DİNAMİK ÖZELLİKLER (Sadece Alt Kategori seçildiyse görünür) */}
                        {seciliAltKategori && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                                    {seciliAltKategori} Özellikleri
                                </h3>

                                <div className="space-y-3">
                                    {/* Seçilen alt kategoriye göre kurallardan özellikleri bulup input çiziyoruz */}
                                    {ozellikKurallari[seciliAltKategori].map(ozellik => (
                                        <div key={ozellik}>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                {ozellik}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={`${ozellik} girin...`}
                                                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Butonlar */}
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <button
                                onClick={formuSifirla}
                                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                // Şimdilik sadece görsel, işlevi daha sonra ekleyeceğiz
                                disabled={!seciliAltKategori}
                                className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${!seciliAltKategori ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                Devam Et
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}