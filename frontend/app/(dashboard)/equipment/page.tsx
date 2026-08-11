'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL, authFetch, extractErrorMessage } from '@/app/lib/api';
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

  // Servis Kaydı modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedServiceEquipmentId, setSelectedServiceEquipmentId] = useState<number | null>(null);
  const [isServiceProcessing, setIsServiceProcessing] = useState(false);
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceChangedParts, setServiceChangedParts] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<EquipmentFormData>();

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
        
        const validStatuses = ['Available', 'InUse', 'UnderMaintenance', 'Retired', 'InService',
          'Kullanılabilir', 'Kullanımda', 'Servis Bekliyor', 'Hurda', 'Serviste'];
        
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

  // Servis Kaydı panelinde gösterilecek cihazlar: Hurda, Servis Bekliyor veya Serviste
  const serviceEligibleList = equipmentList.filter((e: any) =>
    ['UnderMaintenance', 'Retired', 'InService'].includes(e.status)
  );

  const generateLowestAvailableEqpSku = (list: any[]) => {
    const usedNumbers = new Set<number>();
    (list || []).forEach((eq: any) => {
      if (eq.equipmentCode) {
        const match = eq.equipmentCode.match(/\d+/);
        if (match) {
          const num = parseInt(match[0], 10);
          if (num > 0) {
            usedNumbers.add(num);
          }
        }
      }
    });

    let candidate = 1;
    while (usedNumbers.has(candidate)) {
      candidate++;
    }

    const numStr = String(candidate);
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
      const autoCode = generateLowestAvailableEqpSku(equipmentList);
      reset({ id: null, equipmentName: '', equipmentCode: autoCode, status: 'Available', currentHolderName: '' });
    }
    setIsModalOpen(true);
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
        showToast(extractErrorMessage(errText), 'error');
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

  // Servis kaydı işlemi: "send" veya "return"
  const handleServiceRecord = async (action: 'send' | 'return') => {
    if (!selectedServiceEquipmentId) {
      showToast('Lütfen bir cihaz seçin.', 'error');
      return;
    }
    setIsServiceProcessing(true);
    try {
      let finalDescription = '';
      if (action === 'return') {
        const descText = serviceDescription.trim() ? `İşlem: ${serviceDescription.trim()}` : '';
        const partsText = serviceChangedParts.trim() ? `Değişen Parçalar: ${serviceChangedParts.trim()}` : '';
        finalDescription = [descText, partsText].filter(Boolean).join(' | ');
      }

      const res = await authFetch(`${API_BASE_URL}/api/Equipment/service-record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          equipmentId: selectedServiceEquipmentId, 
          action,
          description: action === 'return' ? finalDescription : undefined
        })
      });

      if (res.ok) {
        const label = action === 'send' ? 'Cihaz servise gönderildi.' : 'Cihaz servisten teslim alındı. Son bakım tarihi güncellendi.';
        showToast(label);
        setIsServiceModalOpen(false);
        setSelectedServiceEquipmentId(null);
        setServiceDescription('');
        setServiceChangedParts('');
        fetchData();
      } else {
        const errText = await res.text();
        showToast(extractErrorMessage(errText), 'error');
      }
    } catch (err) {
      showToast('Sunucu hatası.', 'error');
    } finally {
      setIsServiceProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Available': return <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold">Kullanılabilir</span>;
          case 'InUse': return <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs font-bold">Kullanımda</span>;
          case 'UnderMaintenance': return <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold">Servis Bekliyor</span>;
          case 'Retired': return <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 px-2 py-1 rounded text-xs font-bold">Hurda</span>;
          case 'InService': return <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded text-xs font-bold">Serviste</span>;
          default: return <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold">{status || 'Belirsiz'}</span>;
      }
  };

  const getMaintenanceBadge = (lastMaintenanceDate: string | null | undefined) => {
    if (!lastMaintenanceDate) {
      return (
        <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full text-xs font-bold">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Yeni Satın Alındı
        </span>
      );
    }
    return (
      <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
        {new Date(lastMaintenanceDate).toLocaleDateString('tr-TR')}
      </span>
    );
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
            {/* Servis Kaydı Girişi butonu */}
            <button
              onClick={() => { setSelectedServiceEquipmentId(null); setServiceDescription(''); setServiceChangedParts(''); setIsServiceModalOpen(true); }}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition-transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Servis Kaydı Girişi
            </button>
            {/* Yeni Ekipman Girişi butonu */}
            <button
            onClick={() => openModal()}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primaryHover transition-transform hover:-translate-y-0.5"
            >
            <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Yeni Ekipman Girişi
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
                  <td className="p-4 text-center">{getMaintenanceBadge(e.lastMaintenanceDate)}</td>
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
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SKU / Cihaz Kodu</label>
                    <input
                      type="text"
                      {...register("equipmentCode")}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-mono text-sm uppercase"
                      placeholder="Örn: EQP-001"
                    />
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      * Boş olan ilk EQP-XXX kodu otomatik atanır.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Durumu *</label>
                    <select
                      {...register("status", { required: true })}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
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
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-sm cursor-not-allowed"
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

      {/* Servis Kaydı Modalı */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden transition-colors">
            {/* Modal Başlık */}
            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-amber-50/70 dark:bg-amber-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Servis Kaydı</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hurda / Servis Bekliyor / Serviste cihazları yönetin</p>
                </div>
              </div>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Cihaz Seçimi */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Cihaz Seçin
                  <span className="ml-2 text-xs font-normal text-slate-400">(Hurda, Servis Bekliyor veya Serviste olanlar)</span>
                </label>
                <div className="relative mb-3">
                  <input 
                      type="text" 
                      value={serviceSearch} 
                      onChange={e => setServiceSearch(e.target.value)} 
                      placeholder="Cihaz Adı veya Kodu ile ara..." 
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {serviceEligibleList.filter((eq: any) => 
                  !serviceSearch || 
                  (eq.equipmentName && eq.equipmentName.toLowerCase().includes(serviceSearch.toLowerCase())) ||
                  (eq.equipmentCode && eq.equipmentCode.toLowerCase().includes(serviceSearch.toLowerCase()))
                ).length === 0 ? (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Şu an servis kapsamında değerlendirilebilecek veya aramaya uygun cihaz bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {serviceEligibleList.filter((eq: any) => 
                      !serviceSearch || 
                      (eq.equipmentName && eq.equipmentName.toLowerCase().includes(serviceSearch.toLowerCase())) ||
                      (eq.equipmentCode && eq.equipmentCode.toLowerCase().includes(serviceSearch.toLowerCase()))
                    ).map((eq: any) => (
                      <label
                        key={eq.id}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedServiceEquipmentId === eq.id
                            ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-500'
                            : 'border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceEquipment"
                          value={eq.id}
                          checked={selectedServiceEquipmentId === eq.id}
                          onChange={() => setSelectedServiceEquipmentId(eq.id)}
                          className="accent-amber-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm truncate">{eq.equipmentName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{eq.equipmentCode}</p>
                        </div>
                        <div className="shrink-0">{getStatusBadge(eq.status)}</div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Bilgi kutusu */}
              {selectedServiceEquipmentId && (() => {
                const sel = serviceEligibleList.find((e: any) => e.id === selectedServiceEquipmentId);
                const canSend = sel?.status === 'UnderMaintenance' || sel?.status === 'Retired';
                const canReturn = sel?.status === 'InService';
                return (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3.5 text-xs text-blue-700 dark:text-blue-300 space-y-1 mb-4">
                    <p className="font-bold">İşlem Açıklamaları:</p>
                    <p className={canSend ? '' : 'opacity-40 line-through'}>
                      • <strong>Servise Gönder</strong> → Cihaz durumu <span className="font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-1 rounded">Serviste</span> olarak güncellenir.
                      {!canSend && <span className="ml-1 font-bold text-amber-600 dark:text-amber-400 no-underline" style={{textDecoration:'none'}}>(Mevcut durum: {sel?.status})</span>}
                    </p>
                    <p className={canReturn ? '' : 'opacity-40 line-through'}>
                      • <strong>Servisten Teslim Al</strong> → Durum <span className="font-mono bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1 rounded">Kullanılabilir</span> olur, son bakım tarihi bugün olarak kaydedilir.
                      {!canReturn && <span className="ml-1 font-bold text-amber-600 dark:text-amber-400 no-underline" style={{textDecoration:'none'}}>(Yalnızca &quot;Serviste&quot; olanlar için)</span>}
                    </p>
                  </div>
                );
              })()}

              {selectedServiceEquipmentId && (() => {
                const sel = serviceEligibleList.find((e: any) => e.id === selectedServiceEquipmentId);
                const canReturn = sel?.status === 'InService';
                if (!canReturn) return null;
                return (
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Neler Yapıldı? / Açıklama
                        <span className="ml-2 text-xs font-normal text-slate-400">(Örn: Rutin bakım yapıldı, temizlendi)</span>
                      </label>
                      <textarea 
                          value={serviceDescription}
                          onChange={e => setServiceDescription(e.target.value)}
                          rows={2}
                          placeholder="İşlem detaylarını buraya yazın..." 
                          className="w-full p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm shadow-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Değişen Parçalar <span className="text-emerald-600 dark:text-emerald-400 font-medium">(Opsiyonel)</span>
                      </label>
                      <textarea 
                          value={serviceChangedParts}
                          onChange={e => setServiceChangedParts(e.target.value)}
                          rows={2}
                          placeholder="Örn: Cam değişti, batarya yenilendi..." 
                          className="w-full p-4 border border-emerald-100 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm shadow-sm resize-none"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Aksiyon Butonları */}
              {(() => {
                const sel = serviceEligibleList.find((e: any) => e.id === selectedServiceEquipmentId);
                const canSend = !!sel && (sel.status === 'UnderMaintenance' || sel.status === 'Retired');
                const canReturn = !!sel && sel.status === 'InService';
                return (
                  <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsServiceModalOpen(false)}
                      className="flex-1 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      type="button"
                      onClick={() => handleServiceRecord('send')}
                      disabled={!canSend || isServiceProcessing}
                      title={!canSend ? 'Yalnızca "Servis Bekliyor" veya "Hurda" durumundaki cihazlar servise gönderilebilir.' : ''}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-amber-500 rounded-full hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-amber-500/30"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      {isServiceProcessing ? 'İşleniyor...' : 'Servise Gönder'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleServiceRecord('return')}
                      disabled={!canReturn || isServiceProcessing}
                      title={!canReturn ? 'Yalnızca "Serviste" durumundaki cihazlar teslim alınabilir.' : ''}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-500 rounded-full hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-emerald-500/30"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {isServiceProcessing ? 'İşleniyor...' : 'Servisten Teslim Al'}
                    </button>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
