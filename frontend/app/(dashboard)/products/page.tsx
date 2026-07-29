'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import SearchableSelect from '@/app/ui/searchable-select';

// LEGO PARÇALARIMIZ (BİLEŞENLER)
import Toast from '../../ui/toast';
import ConfirmDeleteModal from '../../ui/confirm-delete-modal';
import ErrorMessage from '@/app/ui/error-message';
import StatusBadge from '@/app/ui/status-badge';

type ProductFormData = {
    id?: number | null;
    productName: string;
    barcode: string;
    categoryId: number | string;
    brandName: string;
    model: string;
    purchasePrice: number | string;
    salePrice: number | string;
    stockQuantity: number | string;
    supplierId: number | string;
    locationId: number | string | null;
    isActive: boolean;
};

export default function UrunEnvanterSayfasi() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [suppliers, setSuppliers] = useState<{ id: number; companyName: string }[]>([]);
    const [locations, setLocations] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; targetName: string }>({ isOpen: false, id: null, targetName: '' });
    const [infoModal, setInfoModal] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'info' }>({ isOpen: false, message: '', type: 'info' });

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: { isActive: true }
    });

    // Marka ve Modelleri ürün listesinden benzersiz (unique) olarak çıkartıyoruz
    const uniqueBrands = Array.from(new Set(products.map(p => p.brandName).filter(Boolean)));
    const uniqueModels = Array.from(new Set(products.map(p => p.model).filter(Boolean)));

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const [catRes, supRes, prodRes, locRes] = await Promise.all([
                authFetch(`${API_BASE_URL}/api/Category`),
                authFetch(`${API_BASE_URL}/api/Supplier`),
                authFetch(`${API_BASE_URL}/api/Product`),
                authFetch(`${API_BASE_URL}/api/WarehouseLocation`)
            ]);

            if (catRes.ok) setCategories(await catRes.json());
            if (supRes.ok) setSuppliers(await supRes.json());
            if (prodRes.ok) setProducts(await prodRes.json());
            if (locRes.ok) setLocations(await locRes.json());
        } catch (err) {
            setInfoModal({ isOpen: true, message: "Veriler sunucudan çekilemedi.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredProducts = products.filter(prod =>
        prod.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatName = (text: string) => text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            const isEditing = !!data.id;
            const basePayload = {
                productName: data.productName,
                barcode: data.barcode,
                purchasePrice: Number(String(data.purchasePrice).replace(',', '.')) || 0,
                salePrice: Number(String(data.salePrice).replace(',', '.')) || 0,
                categoryId: Number(data.categoryId),
                supplierId: Number(data.supplierId) || null,
                locationId: data.locationId ? Number(data.locationId) : null,
                brandName: data.brandName ? formatName(data.brandName) : null,
                model: data.model ? formatName(data.model) : null,
                isActive: data.isActive
            };

            const finalPayload = isEditing ? basePayload : { ...basePayload, stockQuantity: Number(data.stockQuantity) || 0 };

            // API_BASE_URL eklendi (Düzenleme hatası çözüldü)
            const url = isEditing ? `${API_BASE_URL}/api/Product/${data.id}` : `${API_BASE_URL}/api/Product`;
            const method = isEditing ? 'PUT' : 'POST';

            const response = await authFetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) throw new Error("Kayıt Başarısız!");

            setInfoModal({ isOpen: true, message: isEditing ? "Ürün başarıyla güncellendi." : "Yeni ürün başarıyla eklendi.", type: 'success' });
            setIsModalOpen(false);
            fetchData();
        } catch (error: any) {
            setInfoModal({ isOpen: true, message: error?.message || "Sunucuya bağlanılamadı.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (product: any) => {
        const foundCat = categories.find(c => c.name === product.category);
        const foundSup = suppliers.find(s => s.companyName === product.supplier);

        reset({
            id: product.id,
            productName: product.productName,
            purchasePrice: product.purchasePrice,
            salePrice: product.salePrice,
            barcode: product.barcode,
            stockQuantity: product.stockQuantity,
            categoryId: foundCat ? String(foundCat.id) : '',
            brandName: product.brandName || '',
            model: product.model || '',
            supplierId: foundSup ? String(foundSup.id) : '',
            locationId: product.locationId ? String(product.locationId) : null,
            isActive: product.isActive
        });
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        reset({
            id: null, productName: '', purchasePrice: '', salePrice: '', barcode: '',
            stockQuantity: '', categoryId: '', brandName: '', isActive: true, supplierId: '', model: '', locationId: null
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number, productName: string) => setDeleteModal({ isOpen: true, id, targetName: productName });

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        setIsSubmitting(true);
        try {
            // API_BASE_URL eklendi (Silme hatası çözüldü)
            const res = await authFetch(`${API_BASE_URL}/api/Product/${deleteModal.id}`, { method: 'DELETE' });

            if (res.ok) {
                setInfoModal({ isOpen: true, message: "Ürün başarıyla silindi.", type: 'success' });
                setDeleteModal({ isOpen: false, id: null, targetName: '' });
                fetchData();
            } else {
                setInfoModal({ isOpen: true, message: "Ürün silinirken bir hata oluştu (Stok hareketi olabilir).", type: 'error' });
            }
        } catch (error) {
            setInfoModal({ isOpen: true, message: "Sunucuya bağlanırken hata oluştu.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans relative">

            <Toast isOpen={infoModal.isOpen} message={infoModal.message} type={infoModal.type} onClose={() => setInfoModal({ ...infoModal, isOpen: false })} />
            <ConfirmDeleteModal isOpen={deleteModal.isOpen} targetName={deleteModal.targetName} isSubmitting={isSubmitting} onClose={() => setDeleteModal({ isOpen: false, id: null, targetName: '' })} onConfirm={confirmDelete} />

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

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                    <input type="text" placeholder="Ürün adı veya SKU koduna göre ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6">Durum</th><th className="p-4">Açıklaması</th><th className="p-4">Kategori</th><th className="p-4">SKU Kodu</th><th className="p-4 text-right">Satış Fiyatı</th><th className="p-4 text-center">Stok</th><th className="p-4 pr-9 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {isLoading ? (
                            <tr><td colSpan={7} className="p-8 text-center text-slate-500 animate-pulse font-medium">Veritabanından ürünler çekiliyor...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={7} className="p-8 text-center text-slate-500">Kayıtlı ürün bulunamadı.</td></tr>
                        ) : (
                            filteredProducts.map((prod) => (
                                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <StatusBadge isActive={prod.isActive} />
                                    </td>
                                    <td className="p-4 text-slate-900 font-semibold">{prod.productName}</td>
                                    <td className="p-4 text-slate-500 font-medium">{prod.category || 'Kategorisiz'}</td>
                                    <td className="p-4 align-middle"><span className="font-mono text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded px-2 py-1">{prod.barcode}</span></td>
                                    <td className="p-4 text-right text-slate-900 font-bold">₺{prod.salePrice?.toLocaleString()}</td>
                                    <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-bold ${prod.stockQuantity < 10 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>{prod.stockQuantity} Adet</span></td>
                                    <td className="p-4 pr-6 text-right">
                                        <button onClick={() => handleEditClick(prod)} className="text-emerald-600 hover:text-emerald-800 transition-colors mr-3 font-semibold">Düzenle</button>
                                        <button onClick={() => handleDeleteClick(prod.id, prod.productName)} className="text-rose-500 hover:text-rose-700 transition-colors font-semibold">Sil</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* DÜZENLE/EKLE MODALI */}
            {/* DÜZENLE/EKLE MODALI */}
            {isModalOpen && (
                // 1. DEĞİŞİKLİK: overflow-y-auto'yu siyah arka plana (overlay) verdik
                <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-900/50 backdrop-blur-sm">

                    {/* 2. DEĞİŞİKLİK: Modalın ortalanması ve overlay üzerinde kayabilmesi için esnek kapsayıcı */}
                    <div className="flex items-center justify-center min-h-screen p-4">

                        {/* 3. DEĞİŞİKLİK: max-h-[90vh] ve overflow-hidden sınıflarını KALDIRDIK. Artık modal özgürce uzayabilir. */}
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative">
                            <input type="hidden" {...register("id")} />

                            {/* Modal Header */}
                            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                                <h2 className="text-xl font-bold text-slate-800">{watch("id") ? "Ürün Düzenle" : "Yeni Ürün Kartı"}</h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Modal Body - 4. DEĞİŞİKLİK: overflow-y-auto buradan kaldırıldı */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 tracking-wider mb-4 border-b pb-2">Temel Bilgiler *</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Adı *</label>
                                            <input type="text" {...register("productName", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm ${errors.productName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                            {errors.productName && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">SKU / Barkod *</label>
                                            <input type="text" {...register("barcode", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm font-mono ${errors.barcode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                            {errors.barcode && <ErrorMessage />}
                                        </div>

                                        <SearchableSelect
                                            label="Kategori *"
                                            name="categoryId"
                                            options={categories.map(c => ({ value: c.id, label: c.name }))}
                                            register={register} setValue={setValue} watch={watch}
                                            error={!!errors.categoryId}
                                            placeholder="Kategori Seçiniz"
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <SearchableSelect
                                                    label="Marka *"
                                                    name="brandName"
                                                    options={uniqueBrands.map(b => ({ value: String(b), label: String(b) }))}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.brandName}
                                                    placeholder="Seç veya Yaz..."
                                                    allowCustom={true}
                                                />
                                            </div>
                                            <div>
                                                <SearchableSelect
                                                    label="Model *"
                                                    name="model"
                                                    options={uniqueModels.map(m => ({ value: String(m), label: String(m) }))}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.model}
                                                    placeholder="Seç veya Yaz..."
                                                    allowCustom={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 tracking-wider mb-4 border-b pb-2">Ticari & Depo Bilgileri *</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Alış Fiyatı (₺) *</label>
                                                <input type="number" step="0.01" {...register("purchasePrice", { required: true })} className={`w-full p-2.5 border rounded-lg text-sm ${errors.purchasePrice ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                                {errors.purchasePrice && <ErrorMessage />}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Satış Fiyatı (₺) *</label>
                                                <input type="number" step="0.01" {...register("salePrice", { required: true })} className={`w-full p-2.5 border rounded-lg text-sm ${errors.salePrice ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                                {errors.salePrice && <ErrorMessage />}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Başlangıç Stoğu *</label>
                                                <input type="number" disabled={!!watch("id")} {...register("stockQuantity", { required: !watch("id") })} className={`w-full p-2.5 border rounded-lg text-sm disabled:bg-slate-100 ${errors.stockQuantity ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                                {errors.stockQuantity && <ErrorMessage />}
                                            </div>
                                            <div>
                                                <SearchableSelect
                                                    label="Tedarikçi *"
                                                    name="supplierId"
                                                    options={suppliers.map(s => ({ value: s.id, label: s.companyName }))}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.supplierId}
                                                    placeholder="Tedarikçi Seçiniz"
                                                />
                                            </div>
                                        </div>

                                        <SearchableSelect
                                            label="Depo Konumu (Opsiyonel)"
                                            name="locationId"
                                            options={locations.map(l => ({ value: l.id, label: `${l.corridor || '-'} Koridoru, ${l.shelf || '-'} Raf, Bölüm ${l.section || '-'}` }))}
                                            register={register} setValue={setValue} watch={watch}
                                            placeholder="Lokasyon Seçiniz..."
                                        />

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-900">Satışa Açık Mı?</label>
                                                <p className="text-xs text-slate-500">Pasife alınan ürünler satış ekranında görünmez.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" {...register("isActive")} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-sm">İptal Et</button>
                                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 rounded-xl font-medium text-sm disabled:opacity-70">
                                    {isSubmitting ? "İşleniyor..." : (watch("id") ? 'Ürünü Güncelle' : 'Ürünü Kaydet')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}