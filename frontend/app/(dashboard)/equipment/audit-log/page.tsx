'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL, authFetch } from '@/app/lib/api';
import Toast from '@/app/ui/toast';
import Pagination from '@/app/ui/pagination';

type TransactionFormData = {
  equipmentId: number;
  employeeName: string;
  type: string;
  condition: string;
  notes: string;
};

export default function EquipmentAuditLogPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [equipmentList, setEquipmentList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  // Filters
  const [filterEquipmentId, setFilterEquipmentId] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionFormData>();
  const [toast, setToast] = useState<{isOpen: boolean, message: string, type: 'success' | 'error' | 'info'}>({isOpen: false, message: '', type: 'info'});

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => setToast({isOpen: true, message, type});

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (filterEquipmentId) params.append('equipmentId', filterEquipmentId);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      const res = await authFetch(`${API_BASE_URL}/api/EquipmentTransaction?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : data.items || []);
      } else {
        setError('Loglar yüklenirken sorun oluştu.');
      }
    } catch (err) {
      setError('Sunucu bağlantı hatası.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEquipments = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/api/Equipment`);
      if (res.ok) {
        const data = await res.json();
        setEquipmentList(Array.isArray(data) ? data : data.items || []);
      }
    } catch (err) {
      console.error("Ekipmanlar yüklenemedi", err);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  useEffect(() => {
    fetchTransactions();
    setCurrentPage(1); // Reset to first page when filters change
  }, [filterEquipmentId, fromDate, toDate]);

  const openModal = () => {
    reset({ equipmentId: 0, employeeName: '', type: 'CheckOut', condition: 'Working', notes: '' });
    setIsModalOpen(true);
  };

  const handleSave = async (data: TransactionFormData) => {
    setIsAdding(true);
    try {
      const payload = { 
          equipmentId: Number(data.equipmentId), 
          employeeName: data.employeeName,
          type: data.type,
          condition: data.condition,
          notes: data.notes
      };

      const res = await authFetch(`${API_BASE_URL}/api/EquipmentTransaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchTransactions();
        showToast('İşlem kaydı başarıyla eklendi.');
      } else {
        const errData = await res.json().catch(() => null);
        const errText = errData && errData.length ? errData.map((e: any) => e.errorMessage).join(', ') : 'İşlem sırasında bir hata oluştu.';
        showToast(errText, 'error');
      }
    } catch (err) {
      showToast('Sunucu hatası veya API mevcut değil.', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  const getTypeBadge = (type: string) => {
      if (type === 'CheckOut') {
          return <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold">Zimmet Verildi</span>;
      } else if (type === 'CheckIn') {
          return <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold">Geri Alındı</span>;
      }
      return <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold">{type}</span>;
  };

  const getConditionText = (condition: string) => {
      switch(condition) {
          case 'Working': return 'Sorunsuz / Çalışıyor';
          case 'Damaged': return 'Hasarlı';
          case 'NeedsRepair': return 'Bakım Gerekiyor';
          default: return condition;
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative p-8">
      <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast({...toast, isOpen: false})} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ekipman Teslim Logları</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Personellere zimmetlenen ve geri alınan ekipmanların geçmişi.</p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primaryHover transition-transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Yeni İşlem Kaydı
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Ekipman Filtresi</label>
              <select
                  value={filterEquipmentId}
                  onChange={(e) => setFilterEquipmentId(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
              >
                  <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Tüm Ekipmanlar</option>
                  {equipmentList.map(eq => (
                      <option key={eq.id} value={eq.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{eq.equipmentCode} - {eq.equipmentName}</option>
                  ))}
              </select>
          </div>
          <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Başlangıç Tarihi</label>
              <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
              />
          </div>
          <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Bitiş Tarihi</label>
              <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
              />
          </div>
          <div className="w-full md:w-auto">
              <button 
                  onClick={() => {setFilterEquipmentId(''); setFromDate(''); setToDate('');}}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                  Filtreleri Temizle
              </button>
          </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden text-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50/70 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 text-xs tracking-wider">
            <tr>
              <th className="pl-6 pr-4 py-4 whitespace-nowrap text-center">Tarih / Saat</th>
              <th className="px-4 py-4">İşlem</th>
              <th className="px-4 py-4">Personel</th>
              <th className="px-4 py-4">Ekipman</th>
              <th className="px-4 py-4">Durum</th>
              <th className="px-4 py-4">Not / Ekleyen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium">
            {isLoading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 animate-pulse">Yükleniyor...</td></tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 p-4 rounded-xl inline-block font-semibold">
                        {error}
                    </div>
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">Bu filtrelere uygun log bulunamadı.</td></tr>
            ) : (
              transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((t: any) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="pl-6 pr-4 py-4 whitespace-nowrap text-center">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{new Date(t.date).toLocaleDateString('tr-TR')}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{new Date(t.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                  </td>
                  <td className="px-4 py-4">{getTypeBadge(t.type)}</td>
                  <td className="px-4 py-4 font-bold text-slate-900 dark:text-slate-100">{t.employeeName}</td>
                  <td className="px-4 py-4">
                      <div className="flex flex-col">
                          <span className="font-semibold">{t.equipmentName}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{t.equipmentCode}</span>
                      </div>
                  </td>
                  <td className="px-4 py-4">{getConditionText(t.condition)}</td>
                  <td className="px-4 py-4">
                      <div className="flex flex-col min-w-[250px] whitespace-normal break-words">
                          <span>{t.notes || '-'}</span>
                          <div className="flex flex-col gap-1 mt-1">
                            <span className="text-xs text-brand-primary dark:text-blue-400 font-semibold">
                              Kullanıcı: {t.createdByUserName || 'Sistem'}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              Rol: {t.createdByUserRole || 'Admin'}
                            </span>
                          </div>
                      </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        {transactions.length > 0 && (
          <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={transactions.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
              }}
          />
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transition-colors">
            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Yeni İşlem Kaydı Ekle</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleSave)} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ekipman Seçiniz *</label>
                <select
                  {...register("equipmentId", { required: true, min: 1 })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                    <option value="0" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Seçim Yapın...</option>
                    {equipmentList.map(eq => (
                        <option key={eq.id} value={eq.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{eq.equipmentCode} - {eq.equipmentName}</option>
                    ))}
                </select>
                {errors.equipmentId && <p className="text-xs text-rose-500 mt-1">Ekipman seçimi zorunludur.</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Personel Adı *</label>
                <input
                  type="text"
                  {...register("employeeName", { required: true })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  placeholder="Zimmeti alan veya teslim eden..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">İşlem Tipi *</label>
                    <select
                      {...register("type", { required: true })}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    >
                        <option value="CheckOut" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Zimmet Verildi</option>
                        <option value="CheckIn" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Geri Alındı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fiziksel Durum *</label>
                    <select
                      {...register("condition", { required: true })}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    >
                        <option value="Working" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Sorunsuz / Çalışıyor</option>
                        <option value="Damaged" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Hasarlı</option>
                        <option value="NeedsRepair" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Bakım Gerekiyor</option>
                    </select>
                  </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Not / Açıklama</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                  placeholder="Ekstra detaylar..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">İptal</button>
                <button type="submit" disabled={isAdding} className="px-5 py-2.5 text-sm font-bold text-white bg-brand-primary rounded-full hover:bg-brand-primaryHover disabled:opacity-50 transition-colors shadow-md shadow-brand-primary/30">
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
