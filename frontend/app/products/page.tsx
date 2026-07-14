'use client';
import { useState, useEffect } from 'react';
import { getProductByBarcode, ProductResponseDto } from '@/app/lib/api';
import { useForm } from 'react-hook-form'; // YENİ: Kütüphanemizi çağırdık

// YENİ: Formumuzdaki verilerin tiplerini (TypeScript için) bir kez tanımlıyoruz.
type ProductFormData = {
    productName: string;
    barcode: string;
    categoryId: number | string;
    brandName: string;
    purchasePrice: number | string;
    salePrice: number | string;
    stockQuantity: number | string;
    supplierId: number | string;
    isActive: boolean;
};

export default function UrunEnvanterSayfasi() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [suppliers, setSuppliers] = useState<{ id: number; companyName: string }[]>([]);

    // --- YENİ NESİL FORM YÖNETİMİ BAŞLANGICI ---
    // ESKİDEN BURADA OLAN formData, errors, setErrors, handleInputChange GİBİ MANUEL YAPILARIN HEPSİ SİLİNDİ!

    const {
        register, // İnputları forma bağlayan kancamız
        handleSubmit, // Kaydetme işlemini tetikleyen fonksiyonumuz
        reset, // Formu sıfırlamak veya düzenleme modunda doldurmak için kullanacağız
        formState: { errors } // Hataları bizim yerimize otomatik tutan obje
    } = useForm<ProductFormData>({
        defaultValues: { isActive: true } // Form ilk açıldığında aktif butonu açık gelsin
    });
    // --- YENİ NESİL FORM YÖNETİMİ BİTİŞİ ---

    const [barcodeQuery, setBarcodeQuery] = useState("");
    const [barcodeResult, setBarcodeResult] = useState<ProductResponseDto | null>(null);
    const [barcodeError, setBarcodeError] = useState<string | null>(null);
    const [barcodeLoading, setBarcodeLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, supRes] = await Promise.all([
                    fetch('http://192.168.2.176:5000/api/Category'),
                    fetch('http://192.168.2.176:5000/api/Supplier')
                ]);

                if (catRes.ok) {
                    const catData = await catRes.json();
                    setCategories(catData);
                }

                if (supRes.ok) {
                    const supData = await supRes.json();
                    setSuppliers(supData);
                }
            } catch (err) {
                console.error("Veri çekme hatası:", err);
            }
        };
        fetchData();
    }, []);

    const handleBarcodeSearch = async () => {
        const trimmed = barcodeQuery.trim();
        if (!trimmed) return;

        setBarcodeLoading(true);
        setBarcodeError(null);
        setBarcodeResult(null);

        try {
            const product = await getProductByBarcode(trimmed);
            if (!product) {
                setBarcodeError(`"${trimmed}" barkoduna sahip ürün bulunamadı.`);
            } else {
                setBarcodeResult(product);
            }
        } catch (err) {
            setBarcodeError(err instanceof Error ? err.message : 'Ürün sorgulanırken bir hata oluştu.');
        } finally {
            setBarcodeLoading(false);
        }
    };

    const filteredProducts = products.filter(prod =>
        prod.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatName = (text: string) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    // YENİ: KAYDETME FONKSİYONU
    // data parametresi formdaki tüm verileri otomatik ve hatasız olarak getirir. "fieldsToValidate" ameleliğine gerek kalmadı!
    const onSubmit = async (data: ProductFormData) => {
        try {
            const productData = {
                productName: data.productName,
                barcode: data.barcode,
                purchasePrice: Number(data.purchasePrice) || 0,
                salePrice: Number(data.salePrice) || 0,
                stockQuantity: Number(data.stockQuantity) || 0,
                categoryId: Number(data.categoryId) || 1,
                supplierId: Number(data.supplierId) || null,
                brandName: data.brandName ? formatName(data.brandName) : null,
                locationId: 1,
                isActive: data.isActive
            };

            const response = await fetch('http://192.168.2.176:5000/api/Product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Veritabanına kaydedilemedi! Eksik veya hatalı bilgi olabilir.');
            }

            alert("Harika! Ürün başarıyla eklendi.");
            setIsModalOpen(false);
            window.location.reload();

        } catch (error: any) {
            console.error("Kaydetme Hatası:", error);
            alert("Bağlantı Hatası (Failed to fetch): Arka uç kapalı olabilir veya CORS izni yoktur.");
        }
    };

    const handleEditClick = (product: any) => {
        // YENİ: setFormData yerine reset() kullanıyoruz. Formdaki tüm kutuları kütüphane otomatik dolduruyor!
        reset({
            productName: product.productName,
            purchasePrice: product.purchasePrice,
            salePrice: product.salePrice,
            barcode: product.barcode,
            stockQuantity: product.stockQuantity,
            categoryId: product.categoryId || '',
            brandName: product.brandName || '',
            supplierId: product.supplierId || '',
            isActive: product.isActive
        });
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        // YENİ: Yeni ekle denildiğinde formu tertemiz sıfırlıyoruz.
        reset({
            productName: '', purchasePrice: '', salePrice: '', barcode: '',
            stockQuantity: '', categoryId: '', brandName: '', isActive: true, supplierId: ''
        });
        setIsModalOpen(true);
    };

    const ErrorMessage = () => (
        <div className="flex items-center gap-1.5 mt-1.5 text-rose-500 text-xs font-semibold animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Bu alanı doldurmak zorunludur.
        </div>
    );

    return (
        <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
            {/* ÜST BAŞLIK */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ürün Envanter Yönetimi</h1>
                    <p className="text-slate-500 mt-1 text-sm">Stok kartlarını, fiyat listelerini ve envanter durumlarını merkezi olarak takip edin.</p>
                </div>
                <button onClick={handleAddNewClick} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Ürün Ekle
                </button>
            </div>

            {/* KPI KARTLARI (TASARIM AYNI KALDI) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><div className="flex items-center gap-3 mb-2"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toplam Ürün</span></div><h3 className="text-2xl font-black text-slate-900">1,240 <span className="text-sm font-medium text-slate-400">Adet</span></h3></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><div className="flex items-center gap-3 mb-2"><div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kritik Stok</span></div><h3 className="text-2xl font-black text-amber-600">14 <span className="text-sm font-medium text-slate-400">Kalem</span></h3></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><div className="flex items-center gap-3 mb-2"><div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Envanter Değeri</span></div><h3 className="text-2xl font-black text-slate-900">₺450,200</h3></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><div className="flex items-center gap-3 mb-2"><div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktif Satış</span></div><h3 className="text-2xl font-black text-emerald-600">%94.2</h3></div>
            </div>

            {/* ARAMA */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                    <input type="text" placeholder="Ürün adı veya SKU koduna göre ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => alert("Kategori filtreleme özelliği yakında aktif edilecek!")} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">Kategori Filtresi</button>
                    <button onClick={() => alert("Excel'e aktarma özelliği yakında eklenecek!")} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">Dışa Aktar</button>
                </div>
            </div>

            {/* TABLO */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6">Durum</th><th className="p-4">Ürün Açıklaması</th><th className="p-4">Kategori</th><th className="p-4">SKU Kodu</th><th className="p-4 text-right">Satış Fiyatı</th><th className="p-4 text-center">Stok</th><th className="p-4 pr-9 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {isLoading && (
                            <tr><td colSpan={7} className="p-8 text-center text-slate-500 animate-pulse font-medium">Veritabanından ürünler çekiliyor...</td></tr>
                        )}
                        {!isLoading && error && (
                            <tr><td colSpan={7} className="p-8 text-center text-rose-500 font-bold">Bağlantı Hatası: {error}</td></tr>
                        )}
                        {!isLoading && !error && filteredProducts.map((prod) => (
                            <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 pl-6"><span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${prod.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>{prod.isActive ? 'Aktif' : 'Pasif'}</span></td>
                                <td className="p-4 text-slate-900 font-semibold">{prod.productName}</td>
                                <td className="p-4 text-slate-500">{prod.categoryName}</td>
                                <td className="p-4 font-mono text-xs text-slate-500 bg-slate-50 rounded px-2 py-1 inline-block mt-2">{prod.barcode}</td>
                                <td className="p-4 text-right text-slate-900 font-bold">₺{prod.salePrice?.toLocaleString()}</td>
                                <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-bold ${prod.stockQuantity < 10 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>{prod.stockQuantity} Adet</span></td>
                                <td className="p-4 pr-6 text-right"><button onClick={() => handleEditClick(prod)} className="text-emerald-600 hover:text-emerald-800 transition-colors mr-3 font-semibold">Düzenle</button></td>
                            </tr>
                        ))}
                        {!isLoading && !error && filteredProducts.length === 0 && (
                            <tr><td colSpan={7} className="p-8 text-center text-slate-500">Ürün bulunamadı veya veritabanı boş.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL (FORM ALANI) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                    {/* YENİ: Div yerine direkt form etiketi kullanıyoruz. onSubmit'e kütüphanenin fonksiyonunu bağladık */}
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

                        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">Yeni Ürün Kartı</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>

                        <div className="p-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* SOL SÜTUN */}
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-slate-400 tracking-wider mb-4 border-b pb-2">Temel Bilgiler *</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Adı *</label>
                                        {/* YENİ: value ve onChange sildik, yerine sadece register ekledik. */}
                                        <input type="text" {...register("productName", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm ${errors.productName ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-emerald-500/20'}`} placeholder="Örn: Kavrulmuş Çekirdek" />
                                        {errors.productName && <ErrorMessage />}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">SKU / Barkod *</label>
                                        <input type="text" {...register("barcode", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm font-mono ${errors.barcode ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-emerald-500/20'}`} placeholder="Örn: SKU-1001" />
                                        {errors.barcode && <ErrorMessage />}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori *</label>
                                            <select {...register("categoryId", { required: true })} className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none ${errors.categoryId ? 'border-rose-500' : 'border-slate-200'}`}>
                                                <option value="">Kategori Seçiniz...</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            {errors.categoryId && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Marka Adı *</label>
                                            <input type="text" {...register("brandName", { required: true })} className={`w-full p-2.5 border rounded-lg ${errors.brandName ? 'border-rose-500' : 'border-slate-200'}`} />
                                            {errors.brandName && <ErrorMessage />}
                                        </div>
                                    </div>
                                </div>

                                {/* SAĞ SÜTUN */}
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-slate-400 tracking-wider mb-4 border-b pb-2">Ticari Bilgiler *</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Alış Fiyatı (₺) *</label>
                                            <input type="number" step="0.01" {...register("purchasePrice", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm ${errors.purchasePrice ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-emerald-500/20'}`} placeholder="0.00" />
                                            {errors.purchasePrice && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Satış Fiyatı (₺) *</label>
                                            <input type="number" step="0.01" {...register("salePrice", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm bg-emerald-50/30 ${errors.salePrice ? 'border-rose-500 !bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-emerald-500/20'}`} placeholder="0.00" />
                                            {errors.salePrice && <ErrorMessage />}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Başlangıç Stoğu *</label>
                                            <input type="number" {...register("stockQuantity", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm ${errors.stockQuantity ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-emerald-500/20'}`} placeholder="0" />
                                            {errors.stockQuantity && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Tedarikçi *</label>
                                            <select {...register("supplierId", { required: true })} className={`w-full p-2.5 border rounded-lg ${errors.supplierId ? 'border-rose-500' : 'border-slate-200'}`}>
                                                <option value="">Tedarikçi Seçiniz...</option>
                                                {suppliers.map((sup) => (
                                                    <option key={sup.id} value={sup.id}>{sup.companyName}</option>
                                                ))}
                                            </select>
                                            {errors.supplierId && <ErrorMessage />}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-900">Ürün Durumu</label>
                                            <p className="text-xs text-slate-500">Pasife alınan ürünler satışta görünmez.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            {/* YENİ: Checkbox'ı da register ile bağladık */}
                                            <input type="checkbox" {...register("isActive")} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-sm">İptal Et</button>
                            {/* YENİ: type="submit" yapıldı. Butona basılınca formdaki handleSubmit otomatik tetiklenecek */}
                            <button type="submit" className="px-5 py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 rounded-xl font-medium text-sm">Ürünü Kaydet</button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
}