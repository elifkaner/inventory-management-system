'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL, authFetch } from '@/app/lib/api';
import Toast from '@/app/ui/toast';
import Pagination from '@/app/ui/pagination';
import SearchableSelect from '@/app/ui/searchable-select';
import { formatNoOrphans } from '@/app/lib/utils';

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
  const [modalAction, setModalAction] = useState<'checkout' | 'checkin' | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [codeSearch, setCodeSearch] = useState('');

  // Sekme: 'assignments' | 'service'
  const [activeTab, setActiveTab] = useState<'assignments' | 'service'>('assignments');
  
  // Filters
  const [filterEquipmentId, setFilterEquipmentId] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TransactionFormData>();
  const [toast, setToast] = useState<{isOpen: boolean, message: string, type: 'success' | 'error' | 'info'}>({isOpen: false, message: '', type: 'info'});

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => setToast({isOpen: true, message, type});

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (filterEquipmentId) params.append('equipmentId', filterEquipmentId);
      if (fromDate) {
        const startDate = new Date(fromDate + 'T00:00:00');
        if (!isNaN(startDate.getTime())) {
          params.append('fromDate', startDate.toISOString());
        }
      }
      if (toDate) {
        const endDate = new Date(toDate + 'T23:59:59.999');
        if (!isNaN(endDate.getTime())) {
          params.append('toDate', endDate.toISOString());
        }
      }

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

  const equipmentOptions = useMemo(() => {
    let filteredList = equipmentList;
    if (modalAction === 'checkout') {
      filteredList = equipmentList.filter(eq => eq.status === 'Available');
    } else if (modalAction === 'checkin') {
      filteredList = equipmentList.filter(eq => eq.status === 'InUse');
    }

    return filteredList.map((eq: any) => ({
      value: String(eq.id),
      label: `[${eq.equipmentCode || 'KODSUZ'}] ${eq.equipmentName}`
    }));
  }, [equipmentList, modalAction]);

  const employeeOptions = useMemo(() => {
    const namesSet = new Set<string>();

    equipmentList.forEach(eq => {
      if (eq.assignedEmployeeName && eq.assignedEmployeeName.trim()) {
        namesSet.add(eq.assignedEmployeeName.trim());
      }
    });

    transactions.forEach(t => {
      if (t.employeeName && t.employeeName.trim()) {
        namesSet.add(t.employeeName.trim());
      }
    });

    const defaultNames = ["Ahmet Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Zeynep Şahin", "Emir Kırım", "Ali Öztürk", "Fatma Yıldız", "Canan Tekin"];
    defaultNames.forEach(n => namesSet.add(n));

    return Array.from(namesSet).map(name => ({
      value: name,
      label: name
    }));
  }, [equipmentList, transactions]);

  const serviceCycles = useMemo(() => {
    const cycles: any[] = [];
    const serviceLogs = transactions.filter(t => t.type === 'SentToService' || t.type === 'ReturnedFromService');
    
    // Grupla
    const grouped: Record<number, any[]> = {};
    serviceLogs.forEach(log => {
      if (!grouped[log.equipmentId]) grouped[log.equipmentId] = [];
      grouped[log.equipmentId].push(log);
    });

    for (const eqId in grouped) {
      // Eskiden yeniye sırala
      const eqLogs = grouped[eqId].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      let currentSend: any = null;
      for (const log of eqLogs) {
        if (log.type === 'SentToService') {
          // Eğer önceden açık kalan bir send varsa onu returnsüz ekle
          if (currentSend) {
            cycles.push({ equipmentId: eqId, sendLog: currentSend, returnLog: null, sortDate: new Date(currentSend.date).getTime() });
          }
          currentSend = log;
        } else if (log.type === 'ReturnedFromService') {
          // Bir return logu geldi
          if (currentSend) {
            cycles.push({ equipmentId: eqId, sendLog: currentSend, returnLog: log, sortDate: new Date(log.date).getTime() });
            currentSend = null;
          } else {
            // Send'i olmayan bir return logu (anomali veya eski data)
            cycles.push({ equipmentId: eqId, sendLog: null, returnLog: log, sortDate: new Date(log.date).getTime() });
          }
        }
      }
      // Döngü bitti, hala kapanmamış bir send varsa
      if (currentSend) {
        cycles.push({ equipmentId: eqId, sendLog: currentSend, returnLog: null, sortDate: new Date(currentSend.date).getTime() });
      }
    }

    // Cycles'ı en son işlem tarihine göre yeniden eskiye (DESC) sırala
    return cycles.sort((a, b) => b.sortDate - a.sortDate);
  }, [transactions]);

  const selectedEquipmentId = watch('equipmentId');
  const selectedEquipment = useMemo(() => {
    return equipmentList.find(e => String(e.id) === String(selectedEquipmentId));
  }, [equipmentList, selectedEquipmentId]);

  const handleCodeSearchChange = (val: string) => {
    setCodeSearch(val);
    if (!val.trim()) return;
    
    const cleanVal = val.trim().toLowerCase();
    
    // Yalnızca modalAction'a göre izin verilenleri filtrele
    let allowedEquipments = equipmentList;
    if (modalAction === 'checkout') {
      allowedEquipments = equipmentList.filter(eq => eq.status === 'Available');
    } else if (modalAction === 'checkin') {
      allowedEquipments = equipmentList.filter(eq => eq.status === 'InUse');
    }

    // 1. Koda göre tam veya kısmi eşleşme
    const codeMatch = allowedEquipments.find(eq => (eq.equipmentCode || '').toLowerCase().includes(cleanVal));
    // 2. İsme göre tam veya kısmi eşleşme
    const nameMatch = allowedEquipments.find(eq => (eq.equipmentName || '').toLowerCase().includes(cleanVal));
    
    const match = codeMatch || nameMatch;

    if (match) {
      setValue('equipmentId', match.id, { shouldValidate: true });
    }
  };

  const openModal = (action: 'checkout' | 'checkin') => {
    setCodeSearch('');
    setModalAction(action);
    reset({ 
      equipmentId: 0, 
      employeeName: '', 
      type: action === 'checkout' ? 'CheckOut' : 'CheckIn', 
      condition: 'Working', 
      notes: '' 
    });
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

  const getServiceTypeBadge = (type: string) => {
      if (type === 'SentToService') {
          return (
            <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2.5 py-1 rounded-full text-xs font-bold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              Servise Gönderildi
            </span>
          );
      } else if (type === 'ReturnedFromService') {
          return (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full text-xs font-bold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Servisten Döndü
            </span>
          );
      }
      return <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">{type}</span>;
  };

  const getConditionBadge = (condition: string) => {
      switch(condition) {
          case 'Working':
              return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Sorunsuz / Çalışıyor
                  </span>
              );
          case 'NeedsRepair':
              return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Bakım Gerekiyor
                  </span>
              );
          case 'Damaged':
              return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Hasarlı
                  </span>
              );
          default: return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{condition}</span>;
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative p-8">
      <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast({...toast, isOpen: false})} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ekipman Logları</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Zimmet ve servis geçmişini tek yerden takip edin.</p>
        </div>
        {activeTab === 'assignments' && (
          <div className="flex gap-3">
            <button
              onClick={() => openModal('checkout')}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primaryHover transition-transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Zimmete Ver
            </button>
            <button
              onClick={() => openModal('checkin')}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Geri Al
            </button>
          </div>
        )}
      </div>

      {/* Sekmeler ve Arama */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => { setActiveTab('assignments'); setCurrentPage(1); }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'assignments'
              ? 'bg-white dark:bg-slate-700 text-brand-primary dark:text-blue-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Ekipman Logları
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === 'assignments' ? 'bg-brand-primary/10 text-brand-primary dark:text-blue-400' : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400'}`}>
            {transactions.filter(t => t.type === 'CheckOut' || t.type === 'CheckIn').length}
          </span>
        </button>
        <button
          onClick={() => { setActiveTab('service'); setCurrentPage(1); }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'service'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Servis Kayıtları
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === 'service' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400'}`}>
            {transactions.filter(t => t.type === 'SentToService' || t.type === 'ReturnedFromService').length}
          </span>
        </button>
        </div>
        <div className="relative w-full sm:w-80">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
                placeholder="İsme veya Koda Göre Ara..." 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm shadow-sm transition-colors"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4 items-end mb-6">
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
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm" />
          </div>
          <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Bitiş Tarihi</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm" />
          </div>
          <div className="w-full md:w-auto">
              <button onClick={() => {setFilterEquipmentId(''); setFromDate(''); setToDate('');}} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                  Filtreleri Temizle
              </button>
          </div>
      </div>

      {/* Teslim Logları Sekmesi */}
      {activeTab === 'assignments' && (
        <>


          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden text-sm transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50/70 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 text-xs tracking-wider">
                <tr>
                  <th className="p-4 pl-6 whitespace-nowrap text-center">Tarih / Saat</th>
                  <th className="p-4 whitespace-nowrap text-center">İşlem</th>
                  <th className="p-4 whitespace-nowrap text-center">Zimmet Sahibi Personel</th>
                  <th className="p-4 whitespace-nowrap text-center min-w-[220px]">Ekipman</th>
                  <th className="p-4 whitespace-nowrap text-center">Durum</th>
                  <th className="p-4 whitespace-nowrap text-center min-w-[250px]">Not / Açıklama</th>
                  <th className="p-4 pr-6 whitespace-nowrap text-center">İşlemi Yapan Yetkili</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                {isLoading ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 animate-pulse">Yükleniyor...</td></tr>
                ) : error ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center"><div className="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 p-4 rounded-xl inline-block font-semibold">{error}</div></td></tr>
                ) : (() => {
                  let assignmentRows = transactions.filter(t => t.type === 'CheckOut' || t.type === 'CheckIn');
                  if (searchTerm) {
                    const st = searchTerm.toLowerCase();
                    assignmentRows = assignmentRows.filter(t => 
                      (t.equipmentName && t.equipmentName.toLowerCase().includes(st)) ||
                      (t.equipmentCode && t.equipmentCode.toLowerCase().includes(st))
                    );
                  }
                  if (assignmentRows.length === 0) return <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">Bu filtrelere uygun log bulunamadı.</td></tr>;
                  return assignmentRows.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="p-4 pl-6 whitespace-nowrap text-center">
                          <div className="font-bold text-slate-900 dark:text-slate-100">{new Date(t.date).toLocaleDateString('tr-TR')}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{new Date(t.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-center">{getTypeBadge(t.type)}</td>
                      <td className="p-4 whitespace-normal break-normal text-center max-w-[190px] mx-auto">
                          <div className="flex flex-col items-center justify-center gap-1.5 -mt-1">
                              <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">Zimmet Sahibi</span>
                              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">{t.employeeName}</span>
                          </div>
                      </td>
                      <td className="p-4 whitespace-normal break-normal text-center max-w-[260px] min-w-[220px] mx-auto">
                          <div className="flex flex-col items-center justify-center">
                              <span className="font-semibold [text-wrap:pretty]">{formatNoOrphans(t.equipmentName)}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">{t.equipmentCode}</span>
                          </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-center">{getConditionBadge(t.condition)}</td>
                      <td className="p-4 whitespace-normal break-normal text-center min-w-[250px] max-w-md text-slate-600 dark:text-slate-300 text-sm">{t.notes || '-'}</td>
                      <td className="p-4 pr-6 text-center">
                          <div className="flex flex-col items-center justify-center min-w-[170px] whitespace-normal break-normal mx-auto">
                              <div className="flex flex-col items-center justify-center gap-1 bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 p-2.5 rounded-xl w-full shadow-sm">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">İşlem Yapan</span>
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">👤 {t.createdByUserName || 'Sistem'}</span>
                                <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-100 dark:border-indigo-800">Rol: {t.createdByUserRole || 'Admin'}</span>
                              </div>
                          </div>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
              </table>
            </div>
            {transactions.filter(t => t.type === 'CheckOut' || t.type === 'CheckIn').length > 0 && (
              <Pagination currentPage={currentPage} pageSize={pageSize} totalCount={transactions.filter(t => t.type === 'CheckOut' || t.type === 'CheckIn').length} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} />
            )}
          </div>
        </>
      )}

      {/* Servis Kayıtları Sekmesi */}
      {activeTab === 'service' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden text-sm transition-colors">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-sm text-slate-500 dark:text-slate-400">Ekipman sayfasındaki <strong className="text-slate-700 dark:text-slate-200">Servis Kaydı</strong> butonu üzerinden yapılan tüm servis gönderim ve teslim alma işlemleri.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50/70 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 text-xs tracking-wider">
                <tr>
                  <th className="p-4 pl-6 whitespace-nowrap text-center">Ekipman</th>
                  <th className="p-4 whitespace-nowrap text-center">Gidiş Tarihi</th>
                  <th className="p-4 whitespace-nowrap text-center">Dönüş Tarihi</th>
                  <th className="p-4 whitespace-nowrap text-center">İşlem Durumu</th>
                  <th className="p-4 pr-6 whitespace-nowrap text-center min-w-[300px]">Neler Yapıldı? / Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                {isLoading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 animate-pulse">Yükleniyor...</td></tr>
                ) : (() => {
                  let filteredCycles = serviceCycles;
                  if (searchTerm) {
                    const st = searchTerm.toLowerCase();
                    filteredCycles = filteredCycles.filter((c: any) => {
                      const send = c.sendLog;
                      const ret = c.returnLog;
                      const name = send?.equipmentName || ret?.equipmentName || '';
                      const code = send?.equipmentCode || ret?.equipmentCode || '';
                      return name.toLowerCase().includes(st) || code.toLowerCase().includes(st);
                    });
                  }

                  if (filteredCycles.length === 0) return (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                          <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <p className="font-medium">Henüz servis kaydı bulunmuyor.</p>
                          <p className="text-xs">Ekipman sayfasından &quot;Servis Kaydı Girişi&quot; butonu ile servis işlemi başlatın.</p>
                        </div>
                      </td>
                    </tr>
                  );
                  return filteredCycles.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((cycle: any, idx) => {
                    const send = cycle.sendLog;
                    const ret = cycle.returnLog;
                    const eqName = send ? send.equipmentName : (ret ? ret.equipmentName : 'Bilinmeyen');
                    const eqCode = send ? send.equipmentCode : (ret ? ret.equipmentCode : '-');
                    const isCompleted = !!ret;

                    return (
                      <tr key={idx} className={`hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${isCompleted ? 'border-l-4 border-l-emerald-400' : 'border-l-4 border-l-purple-400'}`}>
                        <td className="p-4 pl-6 whitespace-normal break-normal text-center max-w-[260px] min-w-[220px] mx-auto">
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-semibold [text-wrap:pretty]">{formatNoOrphans(eqName)}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">{eqCode}</span>
                            </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-center">
                            {send ? (
                              <>
                                <div className="font-bold text-slate-900 dark:text-slate-100">{new Date(send.date).toLocaleDateString('tr-TR')}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{new Date(send.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                              </>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                        </td>
                        <td className="p-4 whitespace-nowrap text-center">
                            {ret ? (
                              <>
                                <div className="font-bold text-slate-900 dark:text-slate-100">{new Date(ret.date).toLocaleDateString('tr-TR')}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{new Date(ret.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                              </>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                        </td>
                        <td className="p-4 whitespace-nowrap text-center">
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full text-xs font-bold">Servisten Geldi</span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse">Servise Gitti</span>
                            )}
                        </td>
                        <td className="p-4 pr-6 whitespace-normal break-normal text-slate-600 dark:text-slate-300 text-sm">
                          {ret?.notes || send?.notes || '-'}
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
          {serviceCycles.length > 0 && (
            <Pagination currentPage={currentPage} pageSize={pageSize} totalCount={serviceCycles.length} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} />
          )}
        </div>
      )}

      {/* Add Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col overflow-visible transition-colors my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 shrink-0 rounded-t-3xl">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-primary"></span>
                Yeni İşlem Kaydı Ekle
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(handleSave)} className="flex flex-col flex-1 overflow-visible">
              <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible">
                
                {/* Sol Sütun: Ekipman Seçimi & Personel */}
                <div className="space-y-4">
                  {/* Cihaz Kodu ile Hızlı Arama & Seçim */}
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Cihaz Kodu veya Adı ile Hızlı Ara / Tara
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={codeSearch}
                          onChange={(e) => handleCodeSearchChange(e.target.value)}
                          placeholder="Örn: EQP-001 veya MacBook (Yazınca otomatik seçer)"
                          className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm font-medium"
                        />
                        <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </div>
                    </div>

                    <SearchableSelect
                      label="VEYA Listeden Arayarak Ekipman Seçiniz *"
                      name="equipmentId"
                      options={equipmentOptions}
                      register={register}
                      setValue={setValue}
                      watch={watch}
                      error={!!errors.equipmentId || (selectedEquipmentId === 0 || !selectedEquipmentId)}
                      errorMessage="Ekipman seçimi zorunludur."
                      placeholder="Ekipman kodu veya adı yazarak arayın..."
                    />

                    {selectedEquipment && (
                      <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-2.5 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="truncate">
                          Seçildi: <strong className="font-bold text-emerald-900 dark:text-emerald-200">{selectedEquipment.equipmentName}</strong> (<code className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded">{selectedEquipment.equipmentCode}</code>)
                        </span>
                      </div>
                    )}
                  </div>

                  <SearchableSelect
                    label="Personel Adı *"
                    name="employeeName"
                    options={employeeOptions}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    error={!!errors.employeeName}
                    errorMessage="Personel adı zorunludur."
                    placeholder="Personel seçin veya yazarak yeni ekleyin..."
                    allowCustom={true}
                  />
                </div>

                {/* Sağ Sütun: İşlem Tipi, Durum & Not */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className={`grid ${modalAction === 'checkout' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">İşlem Tipi *</label>
                      <select
                        {...register("type", { required: true })}
                        disabled
                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm opacity-80 cursor-not-allowed"
                      >
                          <option value="CheckOut" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Zimmet Verildi</option>
                          <option value="CheckIn" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Geri Alındı</option>
                      </select>
                    </div>
                    {modalAction === 'checkin' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fiziksel Durum *</label>
                        <select
                          {...register("condition", { required: true })}
                          className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm cursor-pointer"
                        >
                            <option value="Working" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Sorunsuz / Çalışıyor</option>
                            <option value="Damaged" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Hasarlı</option>
                            <option value="NeedsRepair" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Bakım Gerekiyor</option>
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Neler Yapıldı? / Açıklama</label>
                    <textarea
                      {...register("notes")}
                      rows={5}
                      className="w-full p-4 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none text-sm flex-1"
                      placeholder="Örn: Cam değişti, bakım yapıldı veya ekstra detaylar..."
                    />
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50 shrink-0 rounded-b-3xl">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">İptal</button>
                <button type="submit" disabled={isAdding} className="px-5 py-2.5 text-sm font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primaryHover disabled:opacity-50 transition-colors shadow-md shadow-brand-primary/30">
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
