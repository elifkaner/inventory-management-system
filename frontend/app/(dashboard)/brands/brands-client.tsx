'use client';

import { useState, useEffect, FormEvent } from 'react';
import { API_BASE_URL, authFetch } from '@/app/lib/api';

export default function BrandsClient() {
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({ id: null as number | null, name: '', categoryId: '' });

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
        setBrands(Array.isArray(brData) ? brData : brData.items || []);
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

  const openModal = (brand: any = null) => {
    if (brand) {
      setFormData({ id: brand.id, name: brand.brandName || brand.name, categoryId: brand.categoryId ? String(brand.categoryId) : '' });
    } else {
      setFormData({ id: null, name: '', categoryId: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.categoryId) return;

    setIsAdding(true);
    try {
      const url = formData.id ? `${API_BASE_URL}/api/Brand/${formData.id}` : `${API_BASE_URL}/api/Brand`;
      const method = formData.id ? 'PUT' : 'POST';
      
      // Some backends expect 'Name', some expect 'BrandName'. Providing both for safety based on previous usage.
      const payload = { 
          name: formData.name, 
          brandName: formData.name, 
          categoryId: parseInt(formData.categoryId) 
      };

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('İşlem sırasında bir hata oluştu.');
      }
    } catch (err) {
      alert('Sunucu hatası.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`"${name}" markasını silmek istediğinize emin misiniz?`)) return;
    
    try {
      const res = await authFetch(`${API_BASE_URL}/api/Brand/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBrands(prev => prev.filter(b => b.id !== id));
      } else {
        alert("Silme işlemi başarısız oldu.");
      }
    } catch (error) {
      alert("Sunucuyla iletişim kurulamadı.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Markalar</h1>
          <p className="text-sm text-slate-500 mt-1">Sistemde tanımlı markaları listeleyin ve yönetin.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Yeni Marka Ekle
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Marka Adı</th>
              <th className="px-6 py-4">Bağlı Kategori</th>
              <th className="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {isLoading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Yükleniyor...</td></tr>
            ) : error ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-rose-500">{error}</td></tr>
            ) : brands.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Henüz marka bulunmuyor.</td></tr>
            ) : (
              brands.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{b.brandName || b.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold">
                      {b.categoryName || getCategoryName(b.categoryId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openModal(b)} className="text-blue-600 hover:text-blue-800 font-semibold mr-4">Düzenle</button>
                    <button onClick={() => handleDelete(b.id, b.brandName || b.name)} className="text-rose-500 hover:text-rose-700 font-semibold">Sil</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">{formData.id ? 'Marka Düzenle' : 'Yeni Marka Ekle'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bağlı Olduğu Kategori</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Seçiniz...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Marka Adı</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Apple, Samsung..."
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">İptal</button>
                <button type="submit" disabled={isAdding} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
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
