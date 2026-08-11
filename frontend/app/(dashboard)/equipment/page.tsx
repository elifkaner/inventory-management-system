'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL, authFetch } from '@/app/lib/api';
import Toast from '@/app/ui/toast';
import ConfirmDeleteModal from '@/app/ui/confirm-delete-modal';
import Pagination from '@/app/ui/pagination';
import { formatNoOrphans } from '@/app/lib/utils';

type EquipmentFormData = {
  id?: number | null;
  equipmentName: string;
  equipmentCode: string;
  status: string;
  currentHolderName: string;
};

export default function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<EquipmentFormData>();

  const [toast, setToast] = useState<{isOpen: boolean, message: string, type: 'success' | 'error' | 'info'}>({isOpen: false, message: '', type: 'info'});
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, id: number | null, name: string}>({isOpen: false, id: null, name: ''});
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => setToast({isOpen: true, message, type});

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/Equipment`);
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.items || [];
        
        const validStatuses = ['Available', 'InUse', 'UnderMaintenance', 'Retired', 'Kullanılabilir', 'Kullanımda', 'Servis Bekliyor', 'Hurda'];
        
        const formatName = (name: string) => {
            if (!name) return name;
            if (name.includes('.')) {
                return name.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
            }
            return name;
        };
        
        const mappedList = list.map((e: any) => {
            let finalStatus = e.status;
            let finalHolder = e.currentHolderName;
            
            // Eğer status alanı geçerli bir durum değilse (örneğin "mehmet.kaya" yazıyorsa)
            if (e.status && !validStatuses.includes(e.status)) {
                finalHolder = e.status;
                finalStatus = 'InUse';
            }
            
            return {
                ...e,
                status: finalStatus,
                currentHolderName: formatName(finalHolder)
            };
        });

        setEquipmentList(mappedList);
      } else if (res.status === 404) {
        // API might not exist yet
        setError('Ekipman API henüz hazır değil. Lütfen backend ekibi ile iletişime geçin.');
      } else {
        setError('Veriler yüklenirken sorun oluştu.');
      }
    } catch (err) {
      setError('Sunucu bağlantı hatası. API henüz oluşturulmamış olabilir.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredList = equipmentList.filter((e: any) => 
    (e.equipmentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.equipmentCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.currentHolderName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateFixedEqpSku = (list: any[]) => {
    let maxNum = 0;
    (list || []).forEach((eq: any) => {
      if (eq.equipmentCode) {
        const match = eq.equipmentCode.match(/\d+/);
        if (match) {
          const num = parseInt(match[0], 10);
          if (num > maxNum) maxNum = num;
        }
      }
    });

    const nextNum = maxNum + 1;
    const numStr = String(nextNum);
    const padded = numStr.padStart(Math.max(3, numStr.length), '0');
    return `EQP-${padded}`;
  };

  const openModal = (equipment: any = null) => {
    if (equipment) {
      reset({ 
          id: equipment.id, 
          equipmentName: equipment.equipmentName, 
          equipmentCode: equipment.equipmentCode || '',
          status: equipment.status || 'Available',
          currentHolderName: equipment.currentHolderName || ''
      });
    } else {
      const autoCode = generateFixedEqpSku(equipmentList);
      reset({ id: null, equipmentName: '', equipmentCode: autoCode, status: 'Available', currentHolderName: '' });
    }
    setIsModalOpen(true);
  };

  const handleEquipmentNameChange = (nameVal: string) => {
    if (!watch("id") && !isCodeUserEdited) {
      const smartCode = generateSmartSku(nameVal, equipmentList);
      setValue("equipmentCode", smartCode);
    }
  };

  const handleSave = async (data: EquipmentFormData) => {
    setIsAdding(true);
    try {
      const url = data.id ? `${API_BASE_URL}/api/Equipment/${data.id}` : `${API_BASE_URL}/api/Equipment`;
      const method = data.id ? 'PUT' : 'POST';
      
      const payload = { 
          equipmentName: data.equipmentName, 
          equipmentCode: data.equipmentCode,
          status: data.status
      };

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
        showToast(data.id ? 'Ekipman başarıyla güncellendi.' : 'Ekipman başarıyla eklendi.');
      } else {
        const errText = await res.text();
        showToast(errText || 'İşlem sırasında bir hata oluştu.', 'error');
      }
    } catch (err) {
      showToast('Sunucu hatası veya API mevcut değil.', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    
    try {
      const res = await authFetch(`${API_BASE_URL}/api/Equipment/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        setEquipmentList(prev => prev.filter(e => e.id !== deleteModal.id));
        showToast('Ekipman başarıyla silindi.');
        setDeleteModal({isOpen: false, id: null, name: ''});
      }
    } catch (error) {
      showToast("Sunucuyla iletişim kurulamadı.", 'error');
      setDeleteModal({isOpen: false, id: null, name: ''});
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Available': return <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold">Kullanılabilir</span>;
          case 'InUse': return <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs font-bold">Kullanımda</span>;
          case 'UnderMaintenance': return <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold">Servis Bekliyor</span>;
          case 'Retired': return <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 px-2 py-1 rounded text-xs font-bold">Hurda</span>;
          default: return <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold">{status || 'Belirsiz'}</span>;
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative p-8">
      <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast({...toast, isOpen: false})} />
      
      <ConfirmDeleteModal 
        isOpen={deleteModal.isOpen} 
        targetName={deleteModal.name} 
        isSubmitting={isDeleting} 
        onClose={() => setDeleteModal({...deleteModal, isOpen: false})} 
        onConfirm={handleDeleteConfirm} 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ekipman Takibi</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Depo içi zimmetli araç ve cihazlarınızı takip edin.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Ekipman, SKU veya Personel Ara..."
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                    className="pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm w-72 transition-colors"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button
            onClick={() => openModal()}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primaryHover transition-transform hover:-translate-y-0.5"
            >
            <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Yeni Ekipman
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden text-sm transition-colors">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50/70 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 text-xs tracking-wider">
            <tr>
              <th className="p-4 pl-6 whitespace-nowrap text-center">Ekipman Adı</th>
              <th className="p-4 whitespace-nowrap text-center">SKU / Seri No</th>
              <th className="p-4 whitespace-nowrap text-center">Durum</th>
              <th className="p-4 whitespace-nowrap text-center">Zimmetli Kişi</th>
              <th className="p-4 whitespace-nowrap text-center">Son Bakım Tarihi</th>
              <th className="p-4 pr-6 whitespace-nowrap text-center">İşlemler</th>
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
            ) : filteredList.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">Henüz kayıtlı ekipman bulunmuyor.</td></tr>
            ) : (
              filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((e: any) => (
                <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 pl-6 text-slate-900 dark:text-slate-100 font-bold text-center whitespace-normal break-normal [text-wrap:pretty] max-w-[220px]">{formatNoOrphans(e.equipmentName)}</td>
                  <td className="p-4 text-center">
                    <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded whitespace-nowrap">{e.equipmentCode || '-'}</span>
                  </td>
                  <td className="p-4 text-center">{getStatusBadge(e.status)}</td>
                  <td className="p-4 font-semibold text-center whitespace-normal break-normal max-w-[180px]">{e.currentHolderName || '-'}</td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 pr-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => openModal(e)} className="text-brand-primary dark:text-blue-400 hover:text-brand-primaryHover dark:hover:text-blue-300 font-semibold">Düzenle</button>
                      <button onClick={() => setDeleteModal({isOpen: true, id: e.id, name: e.equipmentName})} className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold">Sil</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filteredList.length > 0 && (
          <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={filteredList.length}
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
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transition-colors">
            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{watch("id") ? 'Ekipman Düzenle' : 'Yeni Ekipman Ekle'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleSave)} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ekipman Adı *</label>
                <input
                  type="text"
                  {...register("equipmentName", { required: true })}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
                  placeholder="Örn: El Terminali - Zebra TC21 veya MacBook Pro"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">SKU / Cihaz Kodu</label>
                      <button
                        type="button"
                        onClick={() => setValue("equipmentCode", generateFixedEqpSku(equipmentList))}
                        className="text-xs text-brand-primary dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                        title="Otomatik EQP-XXX SKU üret"
                      >
                        ⚡ Otomatik Üret
                      </button>
                    </div>
                    <input
                      type="text"
                      {...register("equipmentCode")}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-mono text-sm uppercase"
                      placeholder="Örn: EQP-001"
                    />
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      * EQP-XXX (001...999 ➔ 1000) formatında otomatik atanır.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Durumu *</label>
                    <select
                      {...register("status", { required: true })}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    >
                        <option value="Available" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Kullanılabilir</option>
                        <option value="InUse" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Kullanımda</option>
                        <option value="UnderMaintenance" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Servis Bekliyor</option>
                        <option value="Retired" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Hurda</option>
                    </select>
                  </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Zimmetli Kişi</label>
                <input
                  type="text"
                  {...register("currentHolderName")}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-slate-100 dark:bg-slate-800"
                  placeholder="Zimmet İşlemleri Log Paneli Üzerinden Yapılmaktadır"
                  disabled
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
