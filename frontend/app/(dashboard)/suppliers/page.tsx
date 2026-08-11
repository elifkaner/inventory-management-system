'use client';
import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
// Yeni eklenen bileşenlerimiz
import Toast from '../../ui/toast';
import ConfirmDeleteModal from '../../ui/confirm-delete-modal';
import Pagination from '@/app/ui/pagination';

export default function TedarikcilerSayfasi() {
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'passive'>('all');
    const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'newest'>('name-asc');
    const [formData, setFormData] = useState<any>({
        id: null, companyName: '', contactName: '', phone: '', email: '',
        taxOffice: '', taxNumber: '', address: '', isActive: true
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // Toast State'leri
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);

    // Pagination State'leri
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Modal State'leri
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingSupplierId, setDeletingSupplierId] = useState<number | null>(null);
    const [deletingSupplierName, setDeletingSupplierName] = useState("");

    // Toast Gösterme Fonksiyonu
    const showToastMessage = (message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // 1. BACKEND'DEN VERİ ÇEKME     
    const fetchSuppliers = async () => {
        try {
            setIsLoading(true);
            const res = await authFetch(`${API_BASE_URL}/api/Supplier`);
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((sup: any) => ({
                    ...sup,
                    contactName: sup.contactPerson || ''
                }));
                setSuppliers(mappedData);
                setTotalCount(mappedData.length);
            }
        } catch (error) {
            console.error("Tedarikçiler yüklenemedi", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const filteredSuppliers = suppliers.filter(sup => {
        const matchesSearch = 
            sup.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sup.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sup.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sup.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sup.taxNumber?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = 
            statusFilter === 'all' ? true :
            statusFilter === 'active' ? sup.isActive === true :
            sup.isActive === false;

        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === 'name-asc') return (a.companyName || '').localeCompare(b.companyName || '', 'tr');
        if (sortBy === 'name-desc') return (b.companyName || '').localeCompare(a.companyName || '', 'tr');
        if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
        return 0;
    });

    const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    };

    // 2. BACKEND'E KAYDETME (POST / PUT)     
    const handleSave = async () => {
        const newErrors: Record<string, boolean> = {};
        let hasError = false;
        const fieldsToValidate = ['companyName', 'taxOffice', 'taxNumber', 'contactName', 'phone'];
        fieldsToValidate.forEach(field => {
            if (!formData[field] || String(formData[field]).trim() === '') {
                newErrors[field] = true;
                hasError = true;
            }
        });
        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            companyName: formData.companyName,
            contactPerson: formData.contactName,
            phone: formData.phone,
            email: formData.email,
            taxOffice: formData.taxOffice,
            taxNumber: formData.taxNumber,
            address: formData.address,
            isActive: formData.isActive
        };

        try {
            const url = formData.id
                ? `${API_BASE_URL}/api/Supplier/${formData.id}`
                : `${API_BASE_URL}/api/Supplier`;
            const method = formData.id ? 'PUT' : 'POST';

            const res = await authFetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(errText || "İşlem başarısız");
            }

            setIsModalOpen(false);
            showToastMessage(formData.id ? "Tedarikçi başarıyla güncellendi." : "Yeni tedarikçi eklendi.", "success");
            fetchSuppliers();
        } catch (error: any) {
            showToastMessage(error.message || "Sunucuya bağlanamadı veya bir hata oluştu.", "error");
        }
    };

    // 3. SİLME İŞLEMİ İÇİN MODAL AÇMA
    const handleDeleteClick = (id: number, companyName: string) => {
        setDeletingSupplierId(id);
        setDeletingSupplierName(companyName);
        setIsDeleteModalOpen(true);
    };

    // 4. BACKEND'DEN SİLME (MODAL ONAYI SONRASI)
    const handleDeleteConfirm = async () => {
        if (!deletingSupplierId) return;

        try {
            const res = await authFetch(`${API_BASE_URL}/api/Supplier/${deletingSupplierId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                showToastMessage("Tedarikçi başarıyla silindi.", "success");
                fetchSuppliers();
            } else {
                const errText = await res.text();
                showToastMessage(errText || "Silme işlemi başarısız oldu.", "error");
            }
        } catch (error) {
            showToastMessage("Sunucuya bağlanırken bir hata oluştu.", "error");
        } finally {
            setIsDeleteModalOpen(false);
            setDeletingSupplierId(null);
        }
    };

    const handleEditClick = (supplier: any) => {
        setFormData({ ...supplier, address: supplier.address || '' });
        setErrors({});
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        setFormData({ id: null, companyName: '', contactName: '', phone: '', email: '', taxOffice: '', taxNumber: '', address: '', isActive: true });
        setErrors({});
        setIsModalOpen(true);
    };

    const ErrorMessage = () => (
        <div className="flex items-center gap-1.5 mt-1.5 text-rose-500 text-xs font-semibold animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Bu alan zorunludur.
        </div>
    );

    return (
        <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 font-sans transition-colors">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">İş Ortakları</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Satın alma yaptığınız firmaların iletişim ve ticari bilgilerini yönetin.</p>
                </div>
                <button onClick={handleAddNewClick} className="bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-brand-primary/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    Yeni İş Ortağı Ekle
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center transition-colors">
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                    {/* Arama Çubuğu */}
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Firma, yetkili, tel veya vergi no ara..." 
                            value={searchTerm} 
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
                            className="w-full pl-10 pr-4 py-2.5 bg-brand-surface dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary text-sm dark:text-slate-200" 
                        />
                    </div>

                    {/* Durum Filtresi */}
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
                        className="px-4 py-2.5 bg-brand-surface dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary cursor-pointer"
                    >
                        <option value="all">Tüm Durumlar (Aktif & Pasif)</option>
                        <option value="active">🟢 Sadece Aktif İş Ortakları</option>
                        <option value="passive">🔴 Sadece Pasif İş Ortakları</option>
                    </select>
                </div>

                {/* Sıralama Filtresi */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Sırala:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-4 py-2.5 bg-brand-surface dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary cursor-pointer"
                    >
                        <option value="name-asc">Firma Adı (A - Z)</option>
                        <option value="name-desc">Firma Adı (Z - A)</option>
                        <option value="newest">En Yeni Eklenen</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6 text-center">Durum</th>
                            <th className="p-4 text-center">Firma Ünvanı</th>
                            <th className="p-4 text-center">Yetkili Kişi</th>
                            <th className="p-4 text-center">İletişim Bilgileri</th>
                            <th className="p-4 text-center">Vergi No</th>
                            <th className="p-4 pr-6 text-center">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {isLoading ? (
                            <tr><td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400 animate-pulse">Tedarikçiler Yükleniyor...</td></tr>
                        ) : paginatedSuppliers.length === 0 ? (
                            <tr><td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">Tedarikçi bulunamadı.</td></tr>
                        ) : (
                            paginatedSuppliers.map((sup) => (
                                <tr key={sup.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 pl-6 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${sup.isActive ? 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800'}`}>
                                            {sup.isActive ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-900 dark:text-slate-100 font-bold text-center whitespace-normal break-normal max-w-[240px]">{sup.companyName}</td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300 text-center whitespace-normal break-normal max-w-[180px]">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-brand-primaryHover dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">{sup.contactName?.charAt(0) || '-'}</div>
                                            {sup.contactName}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400 text-center">
                                        <div className="flex flex-col items-center justify-center gap-1 text-xs">
                                            <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> {sup.phone}</span>
                                            {sup.email && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> {sup.email}</span>}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surface dark:bg-slate-900 rounded px-2 py-1 inline-block">{sup.taxNumber}</span>
                                    </td>
                                    <td className="p-4 pr-6 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => handleEditClick(sup)} className="text-brand-primary dark:text-blue-400 hover:text-brand-primaryHover dark:hover:text-blue-300 transition-colors font-semibold">Düzenle</button>
                                            <button onClick={() => handleDeleteClick(sup.id, sup.companyName)} className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-semibold">Sil</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {filteredSuppliers.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={filteredSuppliers.length}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                )}
            </div>

            {/* Yeni/Düzenle Form Modalı */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-colors">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{formData.id ? 'Firma Düzenle' : 'Yeni Firma Kartı'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <div className="p-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-brand-primary dark:text-blue-400 uppercase tracking-wider mb-4 border-b border-blue-100 dark:border-blue-900/50 pb-2">Kurumsal Bilgiler</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Firma / Şirket Ünvanı *</label>
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm ${errors.companyName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary'}`} placeholder="Örn: X Bilişim San. Tic. A.Ş." />
                                        {errors.companyName && <ErrorMessage />}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vergi Dairesi *</label>
                                            <input type="text" name="taxOffice" value={formData.taxOffice} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm ${errors.taxOffice ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary'}`} placeholder="İlçe / Daire" />
                                            {errors.taxOffice && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vergi No / TCKN *</label>
                                            <input type="number" name="taxNumber" value={formData.taxNumber} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm font-mono ${errors.taxNumber ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary'}`} placeholder="10 Haneli VKN" />
                                            {errors.taxNumber && <ErrorMessage />}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium resize-none text-slate-700 dark:text-slate-300 mb-1">Tam Adres</label>
                                        <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary`} placeholder="Fatura adresi..."></textarea>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-brand-primary dark:text-blue-400 uppercase tracking-wider mb-4 border-b border-blue-100 dark:border-blue-900/50 pb-2">İrtibat Bilgileri</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Yetkili Kişi Ad/Soyad *</label>
                                        <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm ${errors.contactName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary'}`} placeholder="Örn: Ayşe Demir" />
                                        {errors.contactName && <ErrorMessage />}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">İrtibat Telefonu *</label>
                                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm ${errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary'}`} placeholder="+90 5XX..." />
                                            {errors.phone && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-Posta Adresi</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 text-sm border-slate-200 dark:border-slate-600 focus:ring-blue-500/20 focus:border-brand-primary`} placeholder="satis@firma.com" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">Firma Durumu</label>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Pasife alınan tedarikçilerden sipariş açılamaz.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-4 border-t border-slate-100 dark:border-slate-700 bg-brand-surface dark:bg-slate-900/50 flex justify-end gap-3 rounded-b-2xl">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-brand-surfaceDark dark:hover:bg-slate-600 rounded-xl font-medium text-sm transition-colors">İptal Et</button>
                            <button onClick={handleSave} className="px-5 py-2.5 text-white bg-brand-primary hover:bg-brand-primaryHover shadow-md shadow-brand-primary/20 rounded-xl font-medium text-sm transition-colors">
                                {formData.id ? 'Güncelle' : 'Firma Kaydı Tamamla'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Yeni Eklenen Toast ve Silme Modalı Bileşenlerimiz */}
            {showToast && (
                <Toast
                    isOpen={showToast}
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                targetName={deletingSupplierName}
                isSubmitting={false}
            />
        </div>
    );
}