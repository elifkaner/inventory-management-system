'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL, authFetch } from '@/app/lib/api';

export default function ModelsClient() {
  const [models, setModels] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [modRes, brRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/api/Model`),
        authFetch(`${API_BASE_URL}/api/Brand`)
      ]);
      
      if (modRes.ok && brRes.ok) {
        const modData = await modRes.json();
        const brData = await brRes.json();
        setModels(Array.isArray(modData) ? modData : modData.items || []);
        setBrands(Array.isArray(brData) ? brData : brData.items || []);
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

  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName.trim() || !selectedBrandId) return;

    setIsAdding(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/Model`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelName: newModelName, brandId: parseInt(selectedBrandId) })
      });
      if (res.ok) {
        setNewModelName('');
        setSelectedBrandId('');
        setIsAddModalOpen(false);
        fetchData();
      } else {
        alert('Model eklenirken bir hata oluştu.');
      }
    } catch (err) {
      alert('Sunucu hatası.');
    } finally {
      setIsAdding(false);
    }
  };

  const getBrandName = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    return brand ? (brand.brandName || brand.name) : '-';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Modeller</h1>
          <p className="text-sm text-slate-500 mt-1">Sistemde tanımlı modelleri listeleyin ve yönetin.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Yeni Model Ekle
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Model Adı</th>
              <th className="px-6 py-4">Bağlı Marka</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {isLoading ? (
              <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-500">Yükleniyor...</td></tr>
            ) : error ? (
              <tr><td colSpan={2} className="px-6 py-8 text-center text-rose-500">{error}</td></tr>
            ) : models.length === 0 ? (
              <tr><td colSpan={2} className="px-6 py-8 text-center text-slate-500">Henüz model bulunmuyor.</td></tr>
            ) : (
              models.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{m.modelName || m.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold">
                      {m.brandName || getBrandName(m.brandId)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">Yeni Model Ekle</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddModel} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bağlı Olduğu Marka</label>
                <select
                  required
                  value={selectedBrandId}
                  onChange={(e) => setSelectedBrandId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Seçiniz...</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.brandName || b.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Model Adı</label>
                <input
                  type="text"
                  required
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: iPhone 15, Galaxy S24..."
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">İptal</button>
                <button type="submit" disabled={isAdding} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {isAdding ? 'Ekleniyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
