'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import SearchableSelect from '@/app/ui/searchable-select';
import Toast from '../../ui/toast';
import ConfirmDeleteModal from '../../ui/confirm-delete-modal';
import ErrorMessage from '@/app/ui/error-message';
import StatusBadge from '@/app/ui/status-badge';

type ProductFormData = {
    id?: number | null;
    productName: string;
    skuCode: string;
    barcode: string;
    categoryId: number | string;
    brandId: number | string;
    modelId: number | string;
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
    const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
    const [models, setModels] = useState<{ id: number; name: string }[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; targetName: string }>({ isOpen: false, id: null, targetName: '' });
    const [infoModal, setInfoModal] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'info' }>({ isOpen: false, message: '', type: 'info' });

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: { isActive: true }
    });

    const selectedBrandId = watch("brandId");

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const [catRes, supRes, prodRes, locRes, brandRes] = await Promise.all([
                authFetch(`${API_BASE_URL}/api/Category`),
                authFetch(`${API_BASE_URL}/api/Supplier`),
                authFetch(`${API_BASE_URL}/api/Product`),
                authFetch(`${API_BASE_URL}/api/WarehouseLocation`),
                authFetch(`${API_BASE_URL}/api/Brand`)
            ]);

            if (catRes.ok) setCategories(await catRes.json());
            if (supRes.ok) setSuppliers(await supRes.json());
            if (prodRes.ok) setProducts(await prodRes.json());
            if (locRes.ok) setLocations(await locRes.json());
            if (brandRes.ok) setBrands(await brandRes.json());

        } catch (err) {
            setInfoModal({ isOpen: true, message: "Veriler sunucudan çekilemedi.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const fetchModelsByBrand = async () => {
            if (selectedBrandId) {
                try {
                    const res = await authFetch(`${API_BASE_URL}/api/Model?brandId=${selectedBrandId}`);
                    if (res.ok) {
                        setModels(await res.json());
                    }
                } catch (error) {
                    console.error("Modeller çekilirken hata oluştu", error);
                }
            } else {
                setModels([]);
            }
        };

        fetchModelsByBrand();
    }, [selectedBrandId]);

    const filteredProducts = products.filter(prod =>
        prod.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.skuCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            const isEditing = !!data.id;
            const basePayload = {
                productName: data.productName,
                skuCode: data.skuCode,
                barcode: data.barcode,
                purchasePrice: Number(String(data.purchasePrice).replace(',', '.')) || 0,
                salePrice: Number(String(data.salePrice).replace(',', '.')) || 0,
                categoryId: Number(data.categoryId),
                supplierId: Number(data.supplierId) || null,
                locationId: data.locationId ? Number(data.locationId) : null,
                brandId: Number(data.brandId),
                modelId: Number(data.modelId),
                isActive: data.isActive
            };

            const finalPayload = isEditing ? basePayload : { ...basePayload, stockQuantity: Number(data.stockQuantity) || 0 };

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

    const handleEditClick = async (product: any) => {
        const foundCat = categories.find(c => c.name === product.category);
        const foundSup = suppliers.find(s => s.companyName === product.supplier);

        const brandName = product.brand || product.brandName;
        const foundBrand = brands.find(b => b.name === brandName);
        const resolvedBrandId = product.brandId || (foundBrand ? foundBrand.id : '');

        let resolvedModelId = product.modelId || '';

        if (!resolvedModelId && resolvedBrandId) {
            try {
                const res = await authFetch(`${API_BASE_URL}/api/Model?brandId=${resolvedBrandId}`);
                if (res.ok) {
                    const brandModels = await res.json();
                    setModels(brandModels);

                    const modelName = product.model || product.modelName;
                    const foundModel = brandModels.find((m: any) => m.name === modelName);
                    if (foundModel) {
                        resolvedModelId = foundModel.id;
                    }
                }
            } catch (err) {
                console.error("Model verileri eşleştirilirken hata oluştu:", err);
            }
        }

        reset({
            id: product.id,
            productName: product.productName,
            purchasePrice: product.purchasePrice,
            salePrice: product.salePrice,
            skuCode: product.skuCode || '',
            barcode: product.barcode || '',
            stockQuantity: product.stockQuantity,
            categoryId: foundCat ? String(foundCat.id) : '',
            brandId: resolvedBrandId ? String(resolvedBrandId) : '',
            modelId: resolvedModelId ? String(resolvedModelId) : '',
            supplierId: foundSup ? String(foundSup.id) : '',
            locationId: product.locationId ? String(product.locationId) : null,
            isActive: product.isActive
        });
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        reset({
            id: null, productName: '', purchasePrice: '', salePrice: '', skuCode: '', barcode: '',
            stockQuantity: '', categoryId: '', brandId: '', isActive: true, supplierId: '', modelId: '', locationId: null
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number, productName: string) => setDeleteModal({ isOpen: true, id, targetName: productName });

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        setIsSubmitting(true);
        try {
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
                <button onClick={handleAddNewClick} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Ürün Ekle
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                    <input type="text" placeholder="Ürün adı, SKU veya Barkod ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse table-auto">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                            <th className="px-3 py-3 pl-6 w-1 whitespace-nowrap">Durum</th>
                            <th className="px-3 py-3">Ürün Adı</th>
                            <th className="px-3 py-3">Marka / Model</th>
                            <th className="px-3 py-3">Kategori</th>
                            <th className="px-3 py-3">SKU Kodu</th>
                            <th className="px-3 py-3">Barkod</th>
                            <th className="px-3 py-3 text-right w-1 whitespace-nowrap">Satış Fiyatı</th>
                            <th className="px-3 py-3 text-center w-1 whitespace-nowrap">Stok</th>
                            <th className="px-3 py-3 pr-6 text-right w-1 whitespace-nowrap">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {isLoading ? (
                            <tr><td colSpan={9} className="p-8 text-center text-slate-500 animate-pulse font-medium">Veritabanından ürünler çekiliyor...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={9} className="p-8 text-center text-slate-500">Kayıt bulunamadı.</td></tr>
                        ) : (
                            filteredProducts.map((prod) => (
                                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-3 py-3 pl-6 w-1 whitespace-nowrap">
                                        <StatusBadge isActive={prod.isActive} />
                                    </td>
                                    <td className="px-3 py-3 text-slate-900 font-semibold">{prod.productName}</td>
                                    <td className="px-3 py-3">
                                        <div className="flex flex-col">
                                            <span className="text-slate-700 font-semibold text-sm">{prod.brand || prod.brandName || '-'}</span>
                                            <span className="text-slate-400 text-xs">{prod.model || prod.modelName || '-'}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-slate-500 font-medium">{prod.category || 'Kategorisiz'}</td>

                                    <td className="px-3 py-3 align-middle">
                                        <span className="font-mono text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded px-2 py-1 break-all">
                                            {prod.skuCode || '-'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        <span className="font-mono text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded px-2 py-1 break-all">
                                            {prod.barcode || '-'}
                                        </span>
                                    </td>

                                    <td className="px-3 py-3 text-right text-slate-900 font-bold w-1 whitespace-nowrap">₺ {prod.salePrice?.toLocaleString()}</td>
                                    <td className="px-3 py-3 text-center w-1 whitespace-nowrap">
                                        <span className={`inline-flex items-center justify-center gap-1 min-w-[70px] px-3 py-1 rounded-full text-xs font-bold ${prod.stockQuantity < 10 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {prod.stockQuantity} Adet
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 pr-6 text-right w-1 whitespace-nowrap">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => handleEditClick(prod)} className="text-emerald-600 hover:text-emerald-800 transition-colors font-semibold">Düzenle</button>
                                            <button onClick={() => handleDeleteClick(prod.id, prod.productName)} className="text-rose-500 hover:text-rose-700 transition-colors font-semibold">Sil</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative">
                            <input type="hidden" {...register("id")} />
                            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                                <h2 className="text-xl font-bold text-slate-800">{watch("id") ? "Düzenle" : "Yeni Ürün Kartı"}</h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 tracking-wider mb-4 border-b pb-2">Temel Bilgiler *</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Adı *</label>
                                            <input type="text" {...register("productName", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm ${errors.productName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                            {errors.productName && <ErrorMessage />}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">SKU Kodu *</label>
                                                <input type="text" {...register("skuCode", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm font-mono ${errors.skuCode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                                {errors.skuCode && <ErrorMessage />}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Barkod *</label>
                                                <input type="text" {...register("barcode", { required: true })} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm font-mono ${errors.barcode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`} />
                                                {errors.barcode && <ErrorMessage />}
                                            </div>
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
                                                    name="brandId"
                                                    options={brands.map(b => ({ value: b.id, label: b.name }))}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.brandId}
                                                    placeholder="Marka Seçiniz"
                                                />
                                            </div>
                                            <div>
                                                <SearchableSelect
                                                    label="Model *"
                                                    name="modelId"
                                                    options={models.map(m => ({ value: m.id, label: m.name }))}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.modelId}
                                                    placeholder="Model Seçiniz"
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
                                                    direction="up"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t mt-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-900">Satış Durumu</label>
                                                <p className="text-xs text-slate-500">Pasife alınan ürünler listelenemez.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" {...register("isActive")} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-sm">İptal Et</button>
                                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 rounded-xl font-medium text-sm disabled:opacity-70 flex items-center gap-2">
                                    {isSubmitting && <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    {watch("id") ? 'Güncelle' : 'Ürün Kaydını Tamamla'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}