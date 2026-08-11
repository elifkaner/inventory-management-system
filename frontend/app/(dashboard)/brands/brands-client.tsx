'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL, authFetch } from '@/app/lib/api';
import Toast from '@/app/ui/toast';
import ConfirmDeleteModal from '@/app/ui/confirm-delete-modal';
import Pagination from '@/app/ui/pagination';
import SearchableSelect from '@/app/ui/searchable-select';

type BrandFormData = {
  id?: number | null;
  name: string;
  categoryId: string;
};

export default function BrandsClient() {
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BrandFormData>();

  const [toast, setToast] = useState<{isOpen: boolean, message: string, type: 'success' | 'error' | 'info'}>({isOpen: false, message: '', type: 'info'});
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, id: number | null, name: string}>({isOpen: false, id: null, name: ''});
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => setToast({isOpen: true, message, type});

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [brRes, catRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/api/Brand`),
        authFetch(`${API_BASE_URL}/api/Category`)
      ]);
      
      if (brRes.ok && catRes.ok) {
        const brData = await brRes.json();
        const catData = await catRes.json();
        const brandsList = Array.isArray(brData) ? brData : brData.items || [];
        setBrands(brandsList);
        setBrands(brandsList);
        setCategories(Array.isArray(catData) ? catData : catData.items || []);
      } else {
        setError('Veriler yüklenirken sorun oluştu.');
      }
    } catch (err) {
      setError('Sunucu bağlantı hatası.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategoryName = (categoryId: number) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : '-';
  };

  const filteredBrands = brands.filter((b: any) => {
    const matchesSearch = (b.brandName || b.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.categoryName || getCategoryName(b.categoryId)).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategoryId ? b.categoryId === parseInt(filterCategoryId) : true;
    return matchesSearch && matchesCategory;
  });

  const openModal = (brand: any = null) => {
    if (brand) {
      reset({ id: brand.id, name: brand.brandName || brand.name, categoryId: brand.categoryId ? String(brand.categoryId) : '' });
    } else {
      reset({ id: null, name: '', categoryId: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (data: BrandFormData) => {
    setIsAdding(true);
    try {
      const url = data.id ? `${API_BASE_URL}/api/Brand/${data.id}` : `${API_BASE_URL}/api/Brand`;
      const method = data.id ? 'PUT' : 'POST';
      
      const payload = { 
          name: data.name, 
          brandName: data.name, 
          categoryId: parseInt(data.categoryId) 
      };

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
        showToast(data.id ? 'Marka başarıyla güncellendi.' : 'Marka başarıyla eklendi.');
      } else {
        const errText = await res.text();
        showToast(errText || 'İşlem sırasında bir hata oluştu.', 'error');
      }
    } catch (err) {
      showToast('Sunucu hatası.', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/Brand/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setBrands(prev => prev.filter(b => b.id !== deleteModal.id));
        showToast('Marka başarıyla silindi.');
        setDeleteModal({isOpen: false, id: null, name: ''});
      } else {
        const errText = await res.text();
        showToast(errText || "Silme işlemi başarısız oldu.", 'error');
        setDeleteModal({isOpen: false, id: null, name: ''});
      }
    } catch (error) {
      showToast("Sunucuyla iletişim kurulamadı.", 'error');
      setDeleteModal({isOpen: false, id: null, name: ''});
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast({...toast, isOpen: false})} />
      
      <ConfirmDeleteModal 
        isOpen={deleteModal.isOpen} 
        targetName={deleteModal.name} 
        isSubmitting={isDeleting} 
        onClose={() => setDeleteModal({...deleteModal, isOpen: false})} 
        onConfirm={handleDeleteConfirm} 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Markalar</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sistemde tanımlı markaları listeleyin ve yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Marka Ara..."
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                    className="pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-brand-surface dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary text-sm w-64 transition-colors"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="relative hidden md:block">
                <select
                    value={filterCategoryId}
                    onChange={(e) => {setFilterCategoryId(e.target.value); setCurrentPage(1);}}
                    className="pl-4 pr-10 py-2.5 border border-slate-200 dark:border-slate-600 bg-brand-surface dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary text-sm transition-colors appearance-none"
                >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            <button
            onClick={() => openModal()}
            className="inline-flex items-center justify-center px-4 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg shadow-sm hover:bg-brand-primaryHover transition-colors"
            >
            <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Yeni Marka Ekle
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden text-sm transition-colors">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-brand-surface dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="pl-12 pr-6 py-4">Marka Adı</th>
              <th className="px-6 py-4">Bağlı Kategori</th>
              <th className="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
            {isLoading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">Yükleniyor...</td></tr>
            ) : error ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-rose-500">{error}</td></tr>
            ) : filteredBrands.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">Henüz marka bulunmuyor.</td></tr>
            ) : (
              filteredBrands.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((b: any) => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="pl-12 pr-6 py-4 font-medium text-slate-900 dark:text-slate-100">{b.brandName || b.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-brand-surfaceDark dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-semibold">
                      {b.categoryName || getCategoryName(b.categoryId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openModal(b)} className="text-brand-primary dark:text-blue-400 hover:text-brand-primaryHover dark:hover:text-blue-300 font-semibold mr-4">Düzenle</button>
                    <button onClick={() => setDeleteModal({isOpen: true, id: b.id, name: b.brandName || b.name})} className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold">Sil</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filteredBrands.length > 0 && (
          <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={filteredBrands.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
              }}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-visible transition-colors">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 rounded-t-2xl">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{watch("id") ? 'Marka Düzenle' : 'Yeni Marka Ekle'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleSave)} className="p-6">
              <div className="mb-4">
                <SearchableSelect
                    label="Bağlı Olduğu Kategori"
                    name="categoryId"
                    options={categories.map(c => ({ value: c.id, label: c.name }))}
                    register={register} setValue={setValue} watch={watch}
                    error={!!errors.categoryId}
                    placeholder="Kategori Seçiniz"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Marka Adı</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Örn: Apple, Samsung..."
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-brand-surfaceDark dark:hover:bg-slate-600 transition-colors">İptal</button>
                <button type="submit" disabled={isAdding} className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-brand-primaryHover disabled:opacity-50 transition-colors">
                  {isAdding ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
