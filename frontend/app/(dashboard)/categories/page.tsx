'use client';
import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import Toast from '../../ui/toast';
import ConfirmDeleteModal from '../../ui/confirm-delete-modal';
import Pagination from '@/app/ui/pagination';

export default function KategorilerSayfasi() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null as number | null, name: '' });
    const [searchTerm, setSearchTerm] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Toast State
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
    const [showToast, setShowToast] = useState(false);

    // Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);
    const [deletingCategoryName, setDeletingCategoryName] = useState("");

    // Transfer Modal State
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [transferTargetId, setTransferTargetId] = useState<number | ''>('');
    const [categoryToTransfer, setCategoryToTransfer] = useState<{id: number, name: string} | null>(null);
    const [isTransferring, setIsTransferring] = useState(false);
    const [isTransferSelectOpen, setIsTransferSelectOpen] = useState(false);

    const showToastMsg = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const res = await authFetch(`${API_BASE_URL}/api/Category`);
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Kategoriler yüklenemedi", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return showToastMsg("Kategori adı boş olamaz!", "error");

        try {
            const url = formData.id ? `${API_BASE_URL}/api/Category/${formData.id}` : `${API_BASE_URL}/api/Category`;
            const method = formData.id ? 'PUT' : 'POST';

            const res = await authFetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name })
            });

            if (!res.ok) {
                const errText = await res.text();
                try {
                    const parsed = JSON.parse(errText);
                    throw new Error(parsed.message || "İşlem başarısız");
                } catch {
                    throw new Error(errText || "İşlem başarısız");
                }
            }

            setIsModalOpen(false);
            showToastMsg(formData.id ? "Kategori başarıyla güncellendi." : "Kategori başarıyla eklendi.", "success");
            fetchCategories();
        } catch (error: any) {
            showToastMsg(error.message || "Sunucuyla iletişim kurulamadı.", "error");
        }
    };

    const handleDeleteClick = (id: number, name: string) => {
        setDeletingCategoryId(id);
        setDeletingCategoryName(name);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingCategoryId) return;

        try {
            const res = await authFetch(`${API_BASE_URL}/api/Category/${deletingCategoryId}`, { method: 'DELETE' });
            
            if (res.ok) {
                setCategories(prev => prev.filter(c => c.id !== deletingCategoryId));
                showToastMsg("Kategori başarıyla silindi.", "success");
                setIsDeleteModalOpen(false);
                setDeletingCategoryId(null);
            } else if (res.status === 409) {
                // Backend requires us to transfer products
                const errData = await res.json();
                setIsDeleteModalOpen(false); // Close normal delete modal
                setCategoryToTransfer({ id: deletingCategoryId, name: deletingCategoryName });
                setIsTransferModalOpen(true); // Open transfer modal
                // Do not setDeletingCategoryId(null) yet so we remember what we are deleting
            } else {
                const errText = await res.text();
                try {
                    const parsed = JSON.parse(errText);
                    showToastMsg(parsed.message || "Silme işlemi başarısız oldu.", "error");
                } catch {
                    showToastMsg(errText || "Silme işlemi başarısız oldu.", "error");
                }
                setIsDeleteModalOpen(false);
                setDeletingCategoryId(null);
            }
        } catch (error: any) {
            showToastMsg(error.message || "Sunucuyla iletişim kurulamadı.", "error");
            setIsDeleteModalOpen(false);
            setDeletingCategoryId(null);
        }
    };

    const handleTransferConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryToTransfer || transferTargetId === '') return;

        setIsTransferring(true);
        try {
            const res = await authFetch(`${API_BASE_URL}/api/Category/${categoryToTransfer.id}?reassignToCategoryId=${transferTargetId}`, { method: 'DELETE' });
            
            if (res.ok) {
                setCategories(prev => prev.filter(c => c.id !== categoryToTransfer.id));
                showToastMsg("Kategori silindi ve ürünler başarıyla taşındı.", "success");
                setIsTransferModalOpen(false);
                setCategoryToTransfer(null);
                setTransferTargetId('');
                setDeletingCategoryId(null); // clean up
            } else {
                const errText = await res.text();
                try {
                    const parsed = JSON.parse(errText);
                    showToastMsg(parsed.message || "İşlem başarısız oldu.", "error");
                } catch {
                    showToastMsg(errText || "İşlem başarısız oldu.", "error");
                }
            }
        } catch (error: any) {
            showToastMsg(error.message || "Sunucuyla iletişim kurulamadı.", "error");
        } finally {
            setIsTransferring(false);
        }
    };

    const openModal = (category: any = { id: null, name: '' }) => {
        setFormData(category);
        setIsModalOpen(true);
    };

    const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const sortedCategories = [...filteredCategories].sort((a, b) => {
        if (a.name.toLowerCase() === 'kategorisiz') return -1;
        if (b.name.toLowerCase() === 'kategorisiz') return 1;
        return a.name.localeCompare(b.name);
    });
    const paginatedCategories = sortedCategories.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 font-sans relative transition-colors">
            
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
                targetName={deletingCategoryName}
                isSubmitting={false}
            />

            {/* Kategori Taşıma (Transfer) Modalı */}
            {isTransferModalOpen && categoryToTransfer && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
                    <form onSubmit={handleTransferConfirm} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-rose-50/50 dark:bg-rose-900/20">
                            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400">Ürünleri Taşı ve Sil</h2>
                            <button type="button" onClick={() => setIsTransferModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                <strong className="text-slate-900 dark:text-slate-200">{categoryToTransfer.name}</strong> kategorisinde mevcut ürünler var. 
                                Bu kategoriyi silebilmek için ürünleri başka bir kategoriye taşımanız gerekiyor.
                            </p>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hangi Kategoriye Taşınsın?</label>
                            <div className="relative mt-1">
                                <div 
                                    className="w-full p-2.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg cursor-pointer flex justify-between items-center text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/20"
                                    onClick={() => setIsTransferSelectOpen(!isTransferSelectOpen)}
                                >
                                    <span>
                                        {transferTargetId !== '' 
                                            ? categories.find(c => c.id === transferTargetId)?.name 
                                            : 'Kategori Seçiniz...'}
                                    </span>
                                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isTransferSelectOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {isTransferSelectOpen && (
                                    <div className="absolute z-[80] w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                        <ul className="py-1">
                                            {categories.filter(c => c.id !== categoryToTransfer.id).map((c) => (
                                                <li 
                                                    key={c.id}
                                                    className={`px-3 py-2 cursor-pointer text-sm hover:bg-rose-50 dark:hover:bg-rose-900/30 ${transferTargetId === c.id ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
                                                    onClick={() => {
                                                        setTransferTargetId(c.id);
                                                        setIsTransferSelectOpen(false);
                                                    }}
                                                >
                                                    {c.name}
                                                </li>
                                            ))}
                                            {categories.filter(c => c.id !== categoryToTransfer.id).length === 0 && (
                                                <li className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 text-center">Seçilebilir kategori yok.</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-brand-surface dark:bg-slate-800 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsTransferModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-brand-surfaceDark dark:hover:bg-slate-600 rounded-xl font-medium text-sm transition-colors">Vazgeç</button>
                            <button type="submit" disabled={isTransferring} className="px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 shadow-md rounded-xl font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center min-w-[120px]">
                                {isTransferring ? (
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : "Taşı ve Sil"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Envanter Grupları</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Ürün kategorilerinizi yönetin ve düzenleyin.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Kategori Ara..."
                            value={searchTerm}
                            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                            className="pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary text-sm w-64 transition-colors"
                        />
                        <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <button onClick={() => openModal()} className="bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-brand-primary/20 flex items-center gap-2 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Yeni Kategori Ekle
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-12">Kategori Adı</th>
                            <th className="p-4 pr-6 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {isLoading ? (
                            <tr><td colSpan={2} className="p-8 text-center text-slate-500 dark:text-slate-400 animate-pulse">Yükleniyor...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={2} className="p-8 text-center text-slate-500 dark:text-slate-400">Henüz kategori bulunmuyor.</td></tr>
                        ) : (
                            paginatedCategories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 pl-12 text-slate-900 dark:text-slate-100 font-bold">{cat.name}</td>
                                    <td className="p-4 pr-6 text-right">
                                        {cat.name.toLowerCase() === 'kategorisiz' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-surfaceDark dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold mr-2 border border-slate-200 dark:border-slate-600">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                Sistem Kategorisi
                                            </span>
                                        ) : (
                                            <>
                                                <button onClick={() => openModal(cat)} className="text-brand-primary dark:text-blue-400 hover:text-brand-primaryHover dark:hover:text-blue-300 font-semibold mr-4">Düzenle</button>
                                                <button onClick={() => handleDeleteClick(cat.id, cat.name)} className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold">Sil</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {filteredCategories.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={filteredCategories.length}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{formData.id ? 'Kategori Düzenle' : 'Yeni Kategori'}</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori Adı *</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary text-sm" placeholder="Örn: Elektronik" autoFocus />
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-brand-surface dark:bg-slate-800/50 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-brand-surfaceDark dark:hover:bg-slate-600 rounded-xl font-medium text-sm transition-colors">İptal</button>
                            <button type="submit" className="px-4 py-2 text-white bg-brand-primary hover:bg-brand-primaryHover shadow-md rounded-xl font-medium text-sm transition-colors">Kaydet</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}