'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import SearchableSelect from '@/app/ui/searchable-select';
import Toast from '../../ui/toast';
import ConfirmDeleteModal from '../../ui/confirm-delete-modal';
import ErrorMessage from '@/app/ui/error-message';
import StatusBadge from '@/app/ui/status-badge';
import Pagination from '@/app/ui/pagination';
import { useDebounce } from 'use-debounce';
import { formatNoOrphans } from '@/app/lib/utils';

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
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [filterCategoryId, setFilterCategoryId] = useState<string>("");
    const [filterBrandId, setFilterBrandId] = useState<string>("");
    const [filterModelId, setFilterModelId] = useState<string>("");
    const [filterSupplierId, setFilterSupplierId] = useState<string>("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; targetName: string }>({ isOpen: false, id: null, targetName: '' });
    const [infoModal, setInfoModal] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'info' }>({ isOpen: false, message: '', type: 'info' });

    // Sipariş Modal ve Pending Orders State'leri
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [orderQuantities, setOrderQuantities] = useState<{ [key: number]: number }>({});
    const [isSubmittingOrder, setIsSubmittingOrder] = useState<{ [key: number]: boolean }>({});
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [criticalProducts, setCriticalProducts] = useState<any[]>([]);
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });
    const [isFetchingCritical, setIsFetchingCritical] = useState(false);
    
    // Ürün Ekleme Modu: 'new' (Sıfırdan) veya 'existing' (Var olanı kopyala/doldur)
    const [entryMode, setEntryMode] = useState<'new' | 'existing'>('new');

    useEffect(() => {
        const stored = localStorage.getItem('pendingOrders');
        if (stored) {
            try { setPendingOrders(JSON.parse(stored)); } catch (e) { console.error(e); }
        }
    }, []);

    const updatePendingOrders = (newOrders: any[]) => {
        setPendingOrders(newOrders);
        localStorage.setItem('pendingOrders', JSON.stringify(newOrders));
    };

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: { isActive: true }
    });

    const selectedBrandId = watch("brandId");
    const watchedSkuCode = watch("skuCode");
    const [debouncedSkuCode] = useDebounce(watchedSkuCode, 800);

    const [formModels, setFormModels] = useState<any[]>([]);
    const [allModels, setAllModels] = useState<any[]>([]);

    const filteredBrands = filterCategoryId ? brands.filter(b => b.categoryId?.toString() === filterCategoryId) : brands;
    const filteredModels = filterBrandId ? allModels.filter(m => m.brandId?.toString() === filterBrandId) : allModels;

    // Performans İyileştirmesi 3: Parent bileşen her render olduğunda options dizisinin 
    // bellekte yeni bir referans oluşturmasını engelliyoruz.
    const categoryOptions = useMemo(() => categories.map(c => ({ value: c.id, label: c.name })), [categories]);
    const brandOptions = useMemo(() => brands.map(b => ({ value: b.id, label: b.name })), [brands]);
    const modelOptions = useMemo(() => formModels.map(m => ({ value: m.id, label: m.name })), [formModels]);
    const supplierOptions = useMemo(() => suppliers.map(s => ({ value: s.id, label: s.companyName })), [suppliers]);

    const fetchMetadata = useCallback(async () => {
        try {
            const [catRes, supRes, locRes, brandRes, modelRes] = await Promise.all([
                authFetch(`${API_BASE_URL}/api/Category`),
                authFetch(`${API_BASE_URL}/api/Supplier`),
                authFetch(`${API_BASE_URL}/api/WarehouseLocation`),
                authFetch(`${API_BASE_URL}/api/Brand`),
                authFetch(`${API_BASE_URL}/api/Model`)
            ]);

            if (catRes.ok) setCategories(await catRes.json());
            if (supRes.ok) setSuppliers(await supRes.json());
            if (locRes.ok) setLocations(await locRes.json());
            if (brandRes.ok) setBrands(await brandRes.json());
            if (modelRes.ok) setAllModels(await modelRes.json());
        } catch (err) {
            console.error("Metadata çekilemedi", err);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const statusQuery = statusFilter === "active" ? "&isActive=true" : statusFilter === "passive" ? "&isActive=false" : "";
            const categoryQuery = filterCategoryId ? `&categoryId=${filterCategoryId}` : "";
            const brandQuery = filterBrandId ? `&brandId=${filterBrandId}` : "";
            const modelQuery = filterModelId ? `&modelId=${filterModelId}` : "";
            const supplierQuery = filterSupplierId ? `&supplierId=${filterSupplierId}` : "";
            const res = await authFetch(`${API_BASE_URL}/api/Product?search=${debouncedSearchTerm}${statusQuery}${categoryQuery}${brandQuery}${modelQuery}${supplierQuery}&page=${currentPage}&pageSize=${pageSize}`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                    setTotalCount(data.length);
                } else {
                    setProducts(data.items || data.Items || []);
                    setTotalCount(data.totalRecord || data.TotalRecord || data.totalCount || 0);
                }
            } else {
                setInfoModal({ isOpen: true, message: "Ürünler sunucudan çekilemedi.", type: 'error' });
            }
        } catch (err) {
            setInfoModal({ isOpen: true, message: "Sunucu bağlantı hatası.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearchTerm, currentPage, pageSize, statusFilter, filterCategoryId, filterBrandId, filterModelId, filterSupplierId]);

    useEffect(() => {
        fetchMetadata();
    }, [fetchMetadata]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const fetchModelsByBrand = async () => {
            if (selectedBrandId) {
                try {
                    const res = await authFetch(`${API_BASE_URL}/api/Model?brandId=${selectedBrandId}`);
                    if (res.ok) {
                        setFormModels(await res.json());
                    }
                } catch (error) {
                    console.error("Modeller çekilirken hata oluştu", error);
                }
            } else {
                setFormModels([]);
            }
        };

        fetchModelsByBrand();
    }, [selectedBrandId]);

    // SKU Auto-fill logic
    useEffect(() => {
        const currentId = watch("id");
        // Sadece 'existing' modundayken (var olan ürün eklerken) ve skuCode doluysa çalışsın
        if (currentId || entryMode !== 'existing' || !debouncedSkuCode || debouncedSkuCode.trim() === '') return;

        const checkSkuAndAutofill = async () => {
            try {
                // Backendden o SKU'ya sahip ürünü ara
                const res = await authFetch(`${API_BASE_URL}/api/Product?search=${debouncedSkuCode}`);
                if (res.ok) {
                    const data = await res.json();
                    const items = Array.isArray(data) ? data : (data.items || data.Items || []);
                    // Tam eşleşen SKU var mı?
                    const match = items.find((p: any) => p.skuCode === debouncedSkuCode);
                    
                    if (match) {
                        const foundCat = categories.find(c => c.name === match.category);
                        const foundSup = suppliers.find(s => s.companyName === match.supplier);
                        
                        const brandName = match.brand || match.brandName;
                        const foundBrand = brands.find(b => b.name === brandName);
                        const resolvedBrandId = match.brandId || (foundBrand ? foundBrand.id : '');
                        let resolvedModelId = match.modelId || '';

                        // Model seçeneklerini getir
                        if (!resolvedModelId && resolvedBrandId) {
                            try {
                                const modelRes = await authFetch(`${API_BASE_URL}/api/Model?brandId=${resolvedBrandId}`);
                                if (modelRes.ok) {
                                    const brandModels = await modelRes.json();
                                    setFormModels(brandModels);

                                    const modelName = match.model || match.modelName;
                                    const foundModel = brandModels.find((m: any) => m.name === modelName);
                                    if (foundModel) {
                                        resolvedModelId = foundModel.id;
                                    }
                                }
                            } catch (err) {
                                console.error("Model verileri çekilemedi:", err);
                            }
                        } else if (resolvedBrandId) {
                             // Sadece form seçeneklerini doldurmak için de modeli çekiyoruz
                             try {
                                 const modelRes = await authFetch(`${API_BASE_URL}/api/Model?brandId=${resolvedBrandId}`);
                                 if (modelRes.ok) {
                                     setFormModels(await modelRes.json());
                                 }
                             } catch(err) {}
                        }

                        setValue("id", match.id, { shouldValidate: true });
                        setValue("productName", match.productName, { shouldValidate: true });
                        setValue("barcode", match.barcode || '', { shouldValidate: true });
                        setValue("categoryId", foundCat ? String(foundCat.id) : '', { shouldValidate: true });
                        setValue("supplierId", foundSup ? String(foundSup.id) : '', { shouldValidate: true });
                        
                        if (resolvedBrandId) setValue("brandId", String(resolvedBrandId), { shouldValidate: true });
                        if (resolvedModelId) setValue("modelId", String(resolvedModelId), { shouldValidate: true });

                        setInfoModal({ isOpen: true, message: `SKU Kodu (${debouncedSkuCode}) ile eşleşen ürün bilgileri otomatik dolduruldu!`, type: 'info' });
                    }
                }
            } catch (error) {
                console.error("SKU kontrol hatası:", error);
            }
        };

        checkSkuAndAutofill();
    }, [debouncedSkuCode, entryMode]); // eslint-disable-line react-hooks/exhaustive-deps

    // SKU Auto-generate logic
    const watchedCategoryId = watch("categoryId");
    useEffect(() => {
        const currentId = watch("id");
        // Sadece 'new' modundayken ve kategori seçildiğinde çalışsın
        if (currentId || entryMode !== 'new' || !watchedCategoryId) return;

        const generateSku = async () => {
            try {
                const cat = categories.find(c => String(c.id) === String(watchedCategoryId));
                if (!cat) return;

                // Kategorinin ilk 3 harfini al, büyük harfe çevir
                const prefix = cat.name.length >= 3 ? cat.name.substring(0, 3).toUpperCase() : cat.name.toUpperCase().padEnd(3, 'X');
                const skuPrefix = `SKU-${prefix}-`;

                // Bu kategoriye ait ürünleri çekip max numarayı bulalım
                const res = await authFetch(`${API_BASE_URL}/api/Product?categoryId=${watchedCategoryId}&pageSize=10000`);
                if (res.ok) {
                    const data = await res.json();
                    const items = Array.isArray(data) ? data : (data.items || data.Items || []);
                    
                    let maxNum = 0;
                    items.forEach((p: any) => {
                        if (p.skuCode && p.skuCode.startsWith(skuPrefix)) {
                            const parts = p.skuCode.split('-');
                            if (parts.length === 3) {
                                const numStr = parts[2];
                                const num = parseInt(numStr, 10);
                                if (!isNaN(num) && num > maxNum) {
                                    maxNum = num;
                                }
                            }
                        }
                    });

                    const nextNum = maxNum + 1;
                    const nextSku = `${skuPrefix}${nextNum.toString().padStart(3, '0')}`;
                    // Eğer kullanıcı kendisi bir şey yazmamışsa veya zaten otomatik doldurulmuş bir şey varsa değiştir
                    setValue("skuCode", nextSku, { shouldValidate: true });
                    
                    // Sadece rakamlardan oluşan otomatik barkod üret (13 hane, 869 ön ekiyle)
                    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000).toString();
                    const nextBarcode = `869${randomDigits}`;
                    setValue("barcode", nextBarcode, { shouldValidate: true });
                }
            } catch (error) {
                console.error("SKU generate hatası:", error);
            }
        };

        generateSku();
    }, [watchedCategoryId, entryMode, categories, setValue, watch]);

    const paginatedProducts = products;

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

            // Yeni ürün eklendiğinde veya güncellendiğinde sipariş listesinden düşür
            const updatedPending = pendingOrders.filter(p => p.skuCode !== data.skuCode && p.productName !== data.productName);
            if (updatedPending.length !== pendingOrders.length) {
                updatePendingOrders(updatedPending);
            }

            setInfoModal({ isOpen: true, message: isEditing ? "Ürün başarıyla güncellendi." : "Yeni ürün başarıyla eklendi.", type: 'success' });
            setIsModalOpen(false);
            fetchProducts();
        } catch (error: any) {
            setInfoModal({ isOpen: true, message: error?.message || "Sunucuya bağlanılamadı.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateOrder = async (product: any) => {
        const quantity = orderQuantities[product.id] || 50;
        if (quantity <= 0) return;

        setIsSubmittingOrder(prev => ({ ...prev, [product.id]: true }));
        try {
            const payload = {
                productId: product.id,
                transactionType: 'IN',
                transactionAmounth: 0,
                quantity: quantity,
                description: 'Otomatik Kritik Stok Siparişi'
            };

            const res = await authFetch(`${API_BASE_URL}/api/StockMovement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setInfoModal({ isOpen: true, message: `${product.productName} için ${quantity} adet sipariş oluşturuldu!`, type: 'success' });
                // Pending orders listesine ekle (zaten varsa miktarını güncelle)
                const existingIndex = pendingOrders.findIndex(p => p.id === product.id);
                let newOrders = [...pendingOrders];
                if (existingIndex >= 0) {
                    newOrders[existingIndex].orderQuantity += quantity;
                } else {
                    newOrders.push({ ...product, orderQuantity: quantity, orderDate: new Date().toISOString() });
                }
                updatePendingOrders(newOrders);
                
                // Update local state temporarily so it reflects without re-fetching
                setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stockQuantity: p.stockQuantity + quantity } : p));
                setCriticalProducts(prev => prev.map(p => p.id === product.id ? { ...p, stockQuantity: p.stockQuantity + quantity } : p));
                setOrderQuantities(prev => ({ ...prev, [product.id]: 0 }));
            } else {
                setInfoModal({ isOpen: true, message: 'Sipariş oluşturulamadı.', type: 'error' });
            }
        } catch (error) {
            setInfoModal({ isOpen: true, message: 'Sunucu bağlantı hatası.', type: 'error' });
        } finally {
            setIsSubmittingOrder(prev => ({ ...prev, [product.id]: false }));
        }
    };

    const handleOpenOrderModal = async () => {
        setIsOrderModalOpen(true);
        setIsFetchingCritical(true);
        try {
            const res = await authFetch(`${API_BASE_URL}/api/Product?pageSize=10000`);
            if (res.ok) {
                const data = await res.json();
                const allProds = Array.isArray(data) ? data : (data.items || data.Items || []);
                setCriticalProducts(allProds.filter((p: any) => p.stockQuantity <= 25));
            }
        } catch (error) {
            console.error("Kritik stoklar çekilemedi", error);
        } finally {
            setIsFetchingCritical(false);
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
                    setFormModels(brandModels);

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
        setEntryMode('new');
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
                fetchProducts();
            } else {
                setInfoModal({ isOpen: true, message: "Ürün silinirken bir hata oluştu (Stok hareketi olabilir).", type: 'error' });
            }
        } catch (error) {
            setInfoModal({ isOpen: true, message: "Sunucuya bağlanırken hata oluştu.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExportCsv = async () => {
        try {
            const res = await authFetch(`${API_BASE_URL}/api/Product/export`);
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `urunler_${new Date().getTime()}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                setInfoModal({ isOpen: true, message: "Dışa aktarma başarısız oldu.", type: 'error' });
            }
        } catch (error) {
            setInfoModal({ isOpen: true, message: "Dışa aktarma sırasında hata oluştu.", type: 'error' });
        }
    };

    const hasActiveFilters = searchTerm !== "" || statusFilter !== "all" || filterCategoryId !== "" || filterBrandId !== "" || filterModelId !== "" || filterSupplierId !== "";

    return (
        <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 font-sans relative transition-colors duration-200">
            <Toast isOpen={infoModal.isOpen} message={infoModal.message} type={infoModal.type} onClose={() => setInfoModal({ ...infoModal, isOpen: false })} />
            <ConfirmDeleteModal isOpen={deleteModal.isOpen} targetName={deleteModal.targetName} isSubmitting={isSubmitting} onClose={() => setDeleteModal({ isOpen: false, id: null, targetName: '' })} onConfirm={confirmDelete} />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ürün Envanter Yönetimi</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Stok kartlarını, fiyat listelerini ve envanter durumlarını merkezi olarak takip edin.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleOpenOrderModal}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 rounded-full font-semibold shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        Kritik Stok Siparişi
                    </button>
                    <button onClick={handleAddNewClick} className="bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-3 rounded-full font-semibold shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Yeni Ürün Ekle
                    </button>
                </div>
            </div>

            {/* Sipariş Geçilenler Panosu */}
            {pendingOrders.length > 0 && (
                <div className="bg-rose-50/50 dark:bg-rose-900/10 p-5 rounded-2xl border border-rose-200 dark:border-rose-800/50 mb-6 transition-all">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            Sipariş Geçilenler (Tedarik Bekleniyor)
                        </h2>
                        {pendingOrders.length > 4 && (
                            <a href="/pending-orders" className="text-sm font-bold text-rose-700 dark:text-rose-400 hover:text-rose-500 transition-colors flex items-center gap-1">
                                Hepsini Gör
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </a>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {pendingOrders.slice(0, 4).map(order => (
                            <div key={order.id} className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 flex items-center gap-4 hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{order.productName}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">SKU: {order.skuCode || '-'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-brand-primary dark:text-brand-primaryHover">+{order.orderQuantity} Adet</p>
                                    <p className="text-[10px] text-slate-400">{new Date(order.orderDate).toLocaleDateString('tr-TR')}</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setConfirmModal({
                                            isOpen: true,
                                            title: 'Siparişi İptal Et',
                                            message: 'Bu siparişi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
                                            onConfirm: () => {
                                                const newPending = pendingOrders.filter(p => p.id !== order.id);
                                                updatePendingOrders(newPending);
                                                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                                            }
                                        });
                                    }}
                                    className="ml-2 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Siparişi İptal Et"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white/80 backdrop-blur-md dark:bg-slate-800 p-4 rounded-2xl shadow-lg shadow-brand-primary/5 border border-brand-primary/10 dark:border-slate-700 mb-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-2">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                        <input type="text" placeholder="Ürün adı, SKU veya Barkod ara..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} className="w-full pl-10 pr-4 py-2.5 bg-brand-surface dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary text-sm dark:text-slate-200 transition-colors" />
                    </div>
                    {hasActiveFilters && (
                        <button 
                            onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("all");
                                setFilterCategoryId("");
                                setFilterBrandId("");
                                setFilterModelId("");
                                setFilterSupplierId("");
                                setCurrentPage(1);
                            }}
                            className="text-sm font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1.5"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            Filtreleri Temizle
                        </button>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                    <div className="w-full sm:w-1/5">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Durum</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm"
                        >
                            <option value="all">Tümü</option>
                            <option value="active">Aktif</option>
                            <option value="passive">Pasif</option>
                        </select>
                    </div>
                    <div className="w-full sm:w-1/5">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Kategori</label>
                        <select
                            value={filterCategoryId}
                            onChange={(e) => { 
                                setFilterCategoryId(e.target.value); 
                                setFilterBrandId(""); // Kategori değişince marka ve modeli sıfırla
                                setFilterModelId("");
                                setCurrentPage(1); 
                            }}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm"
                        >
                            <option value="">Tüm Kategoriler</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:w-1/5">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Marka</label>
                        <select
                            value={filterBrandId}
                            onChange={(e) => { 
                                setFilterBrandId(e.target.value); 
                                setFilterModelId(""); // Marka değişince modeli sıfırla
                                setCurrentPage(1); 
                            }}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm"
                        >
                            <option value="">Tüm Markalar</option>
                            {filteredBrands.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:w-1/5">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Model</label>
                        <select
                            value={filterModelId}
                            onChange={(e) => { setFilterModelId(e.target.value); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm"
                        >
                            <option value="">Tüm Modeller</option>
                            {filteredModels.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:w-1/5">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tedarikçi</label>
                        <select
                            value={filterSupplierId}
                            onChange={(e) => { setFilterSupplierId(e.target.value); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm"
                        >
                            <option value="">Tüm Tedarikçiler</option>
                            {suppliers.map(s => (
                                <option key={s.id} value={s.id}>{s.companyName}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm dark:bg-slate-800 rounded-3xl shadow-2xl shadow-brand-primary/5 dark:shadow-none overflow-hidden flex flex-col border border-brand-primary/10 dark:border-slate-700/50">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse table-auto min-w-[1100px]">
                    <thead>
                        <tr className="bg-slate-50/70 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold tracking-wider">
                            <th className="px-4 py-3 pl-6 w-1 whitespace-nowrap text-center">Durum</th>
                            <th className="px-4 py-3 min-w-[220px] text-center">Ürün Adı</th>
                            <th className="px-4 py-3 min-w-[140px] text-center">Marka / Model</th>
                            <th className="px-4 py-3 text-center">Kategori</th>
                            <th className="px-4 py-3 text-center">Tedarikçi</th>
                            <th className="px-4 py-3 whitespace-nowrap min-w-[120px] text-center">SKU Kodu</th>
                            <th className="px-4 py-3 whitespace-nowrap min-w-[140px] text-center">Barkod</th>
                            <th className="px-4 py-3 text-center w-1 whitespace-nowrap">Satış Fiyatı</th>
                            <th className="px-4 py-3 text-center w-1 whitespace-nowrap">Stok Durumu</th>
                            <th className="px-4 py-3 text-center w-1 whitespace-nowrap">Stok</th>
                            <th className="px-4 py-3 pr-6 text-center w-1 whitespace-nowrap">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {isLoading ? (
                            <tr><td colSpan={10} className="p-8 text-center text-slate-500 dark:text-slate-400 animate-pulse font-medium">Veritabanından ürünler çekiliyor...</td></tr>
                        ) : paginatedProducts.length === 0 ? (
                            <tr><td colSpan={10} className="p-8 text-center text-slate-500 dark:text-slate-400">Kayıt bulunamadı.</td></tr>
                        ) : (
                            paginatedProducts.map((prod) => (
                                <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-4 py-3 pl-6 w-1 whitespace-nowrap text-center">
                                        <StatusBadge isActive={prod.isActive} />
                                    </td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-slate-100 font-semibold text-center whitespace-normal break-normal [text-wrap:pretty] max-w-[220px]">{formatNoOrphans(prod.productName)}</td>
                                    <td className="px-4 py-3 text-center whitespace-normal break-normal max-w-[160px]">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">{prod.brand || prod.brandName || '-'}</span>
                                            <span className="text-slate-400 dark:text-slate-500 text-xs">{prod.model || prod.modelName || '-'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium text-center whitespace-normal break-normal max-w-[140px]">{prod.category || 'Kategorisiz'}</td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium text-center whitespace-normal break-normal max-w-[140px]">{prod.supplier || '-'}</td>

                                    <td className="px-4 py-3 align-middle text-center">
                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surfaceDark dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded px-2 py-1 whitespace-nowrap">
                                            {prod.skuCode || '-'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle text-center">
                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surfaceDark dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded px-2 py-1 whitespace-nowrap">
                                            {prod.barcode || '-'}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center text-slate-900 dark:text-slate-100 font-bold w-1 whitespace-nowrap">₺ {prod.salePrice?.toLocaleString()}</td>
                                    
                                    <td className="px-4 py-3 text-center w-1 whitespace-nowrap">
                                        <span className={`inline-flex items-center justify-center min-w-[70px] px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                            prod.stockQuantity === 0 
                                                ? 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400' 
                                                : (prod.stockQuantity > 25 
                                                    ? 'bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' 
                                                    : 'bg-rose-100/50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400')
                                        }`}>
                                            {prod.stockQuantity === 0 ? 'Tükendi' : (prod.stockQuantity > 25 ? 'Yeterli' : 'Kritik')}
                                        </span>
                                    </td>
                                    
                                    <td className="px-4 py-3 text-center w-1 whitespace-nowrap">
                                        <span className={`inline-flex items-center justify-center gap-1 min-w-[70px] px-3 py-1 rounded-full text-xs font-bold ${prod.stockQuantity <= 25 ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' : 'bg-brand-surfaceDark dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                            {prod.stockQuantity} Adet
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 pr-6 text-center w-1 whitespace-nowrap">
                                        <div className="flex justify-center gap-3">
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
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setCurrentPage(1); // Sayfa boyutu değiştiğinde 1. sayfaya dön
                    }}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-xl dark:bg-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(92,107,192,0.15)] dark:shadow-none w-full max-w-4xl relative transition-colors border border-brand-primary/10 dark:border-slate-700">
                            <input type="hidden" {...register("id")} />
                            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                                        {watch("id") && entryMode !== 'existing' ? 'Ürün Düzenle' : (entryMode === 'existing' ? 'Var Olan Ürünü Güncelle' : 'Yeni Ürün')}
                                    </h2>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                
                                {(!watch("id") || entryMode === 'existing') && (
                                    <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-lg w-full max-w-sm">
                                        <button 
                                            type="button" 
                                            onClick={() => { 
                                                setEntryMode('new'); 
                                                reset({
                                                    id: null, productName: '', purchasePrice: '', salePrice: '', skuCode: '', barcode: '',
                                                    stockQuantity: '', categoryId: '', brandId: '', isActive: true, supplierId: '', modelId: '', locationId: null
                                                });
                                            }}
                                            className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all ${entryMode === 'new' ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        >
                                            Yeni Ürün Girişi
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setEntryMode('existing')}
                                            className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all ${entryMode === 'existing' ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        >
                                            Var Olan Ürün Ekle
                                        </button>
                                    </div>
                                )}
                                {(!watch("id") || entryMode === 'existing') && entryMode === 'new' && (
                                    <p className="text-xs text-slate-500 mt-2">Kategori seçildiğinde SKU kodu (örn: SKU-KAT-001) otomatik oluşturulur.</p>
                                )}
                                {(!watch("id") || entryMode === 'existing') && entryMode === 'existing' && (
                                    <p className="text-xs text-slate-500 mt-2">Sistemdeki bir ürünün SKU kodunu yazarak bilgilerini otomatik çekebilirsiniz.</p>
                                )}
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Temel Bilgiler *</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ürün Adı *</label>
                                            <input type="text" {...register("productName", { required: true })} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm ${errors.productName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`} />
                                            {errors.productName && <ErrorMessage />}
                                        </div>
                                        
                                        <SearchableSelect
                                            label="Kategori *"
                                            name="categoryId"
                                            options={categoryOptions}
                                            register={register} setValue={setValue} watch={watch}
                                            error={!!errors.categoryId}
                                            placeholder="Kategori Seçiniz"
                                            disabled={entryMode === 'existing'}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SKU Kodu *</label>
                                                <input type="text" {...register("skuCode", { required: true })} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm font-mono ${errors.skuCode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`} />
                                                {errors.skuCode && <ErrorMessage />}
                                                {!watch("id") && entryMode === 'new' && (
                                                    <p className="text-[10px] text-slate-400 mt-1 italic">Kategori seçilince SKU ve Barkod otomatik atanacaktır.</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Barkod *</label>
                                                <input type="text" {...register("barcode", { required: true })} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:border-emerald-500 text-sm font-mono ${errors.barcode ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`} />
                                                {errors.barcode && <ErrorMessage />}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <SearchableSelect
                                                    label="Marka *"
                                                    name="brandId"
                                                    options={brandOptions}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.brandId}
                                                    placeholder="Marka Seçiniz"
                                                    disabled={entryMode === 'existing'}
                                                    direction="up"
                                                />
                                            </div>
                                            <div>
                                                <SearchableSelect
                                                    label="Model *"
                                                    name="modelId"
                                                    options={modelOptions}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.modelId}
                                                    placeholder="Model Seçiniz"
                                                    disabled={entryMode === 'existing'}
                                                    direction="up"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Ticari & Depo Bilgileri *</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alış Fiyatı (₺) *</label>
                                                <input type="number" step="0.01" {...register("purchasePrice", { required: true })} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm ${errors.purchasePrice ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`} />
                                                {errors.purchasePrice && <ErrorMessage />}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Satış Fiyatı (₺) *</label>
                                                <input type="number" step="0.01" {...register("salePrice", { required: true })} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm ${errors.salePrice ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`} />
                                                {errors.salePrice && <ErrorMessage />}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Başlangıç Stoğu *</label>
                                                <input type="number" disabled={!!watch("id")} {...register("stockQuantity", { required: !watch("id") })} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm disabled:bg-slate-100 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 ${errors.stockQuantity ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`} />
                                                {errors.stockQuantity && <ErrorMessage />}
                                            </div>
                                            <div>
                                                <SearchableSelect
                                                    label="Tedarikçi *"
                                                    name="supplierId"
                                                    options={supplierOptions}
                                                    register={register} setValue={setValue} watch={watch}
                                                    error={!!errors.supplierId}
                                                    placeholder="Tedarikçi Seçiniz"
                                                    direction="up"
                                                    disabled={entryMode === 'existing'}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">Satış Durumu</label>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Pasife alınan ürünler listelenemez.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" {...register("isActive")} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 py-4 border-t border-slate-100 dark:border-slate-700 bg-brand-surface dark:bg-slate-800/80 flex justify-end gap-3 rounded-b-3xl border-0">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-brand-surfaceDark dark:hover:bg-slate-600 rounded-full font-bold text-sm transition-colors shadow-sm">İptal Et</button>
                                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-white bg-brand-primary hover:bg-brand-primaryHover shadow-md shadow-brand-primary/20 rounded-full font-bold text-sm disabled:opacity-70 flex items-center gap-2 transition-colors">
                                    {isSubmitting && <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    {watch("id") ? 'Güncelle' : 'Ürün Kaydını Tamamla'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirm Modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden text-center p-8 border border-slate-100 dark:border-slate-700">
                        <div className="mx-auto w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">{confirmModal.title}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                            {confirmModal.message}
                        </p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))} className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors shadow-sm">İptal</button>
                            <button onClick={confirmModal.onConfirm} className="flex-1 px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-500/30 transition-colors">Evet, İptal Et</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sipariş Modal */}
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/80">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                    <span className="bg-rose-100 dark:bg-rose-900/50 p-2 rounded-lg text-rose-600 dark:text-rose-400">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </span>
                                    Kritik Stok Sipariş Yönetimi
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Stoğu 25 ve altında olan ürünler için hızlıca sipariş girişi oluşturun.</p>
                            </div>
                            <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="space-y-4">
                                {isFetchingCritical ? (
                                    <div className="text-center py-12 flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                                        <svg className="animate-spin h-8 w-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Kritik stoklar kontrol ediliyor...
                                    </div>
                                ) : criticalProducts.filter(p => p.stockQuantity <= 25).length === 0 ? (
                                    <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                                        Kritik stok seviyesinde ürün bulunmamaktadır. Harika! 🎉
                                    </div>
                                ) : (
                                    criticalProducts.filter(p => p.stockQuantity <= 25).map((prod) => (
                                        <div key={prod.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-brand-primary/50 transition-colors shadow-sm">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate">{prod.productName}</h4>
                                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                                                    <span>Stok: <strong className="text-rose-600 dark:text-rose-400">{prod.stockQuantity}</strong></span>
                                                    <span>|</span>
                                                    <span className="truncate">Tedarikçi: {prod.supplier || 'Belirtilmemiş'}</span>
                                                    <span>|</span>
                                                    <span>SKU: {prod.skuCode || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <div className="relative w-24">
                                                    <input 
                                                        type="number" 
                                                        min="1"
                                                        value={orderQuantities[prod.id] !== undefined ? orderQuantities[prod.id] : 50} 
                                                        onChange={(e) => setOrderQuantities({...orderQuantities, [prod.id]: parseInt(e.target.value) || 0})}
                                                        className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-primary/20"
                                                    />
                                                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Adet</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleCreateOrder(prod)}
                                                    disabled={isSubmittingOrder[prod.id] || (orderQuantities[prod.id] !== undefined && orderQuantities[prod.id] <= 0)}
                                                    className="bg-brand-primary hover:bg-brand-primaryHover text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                                                >
                                                    {isSubmittingOrder[prod.id] ? (
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                                    )}
                                                    Sipariş Gir
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex justify-end">
                            <button onClick={() => setIsOrderModalOpen(false)} className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors">
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}