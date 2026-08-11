'use client';
import React, { useState, useEffect } from 'react';
import MovementBadge from '../../ui/stock-movements/movement-badge';
import AddMovementModal from '../../ui/stock-movements/add-movement-modal';
import { API_BASE_URL, authFetch } from '@/app/lib/api';
import Pagination from '@/app/ui/pagination';

export default function StockMovementsClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movements, setMovements] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
    const [selectedYear, setSelectedYear] = useState<number | ''>(new Date().getFullYear());
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const months = [
        { value: 0, label: 'Ocak' }, { value: 1, label: 'Şubat' }, { value: 2, label: 'Mart' },
        { value: 3, label: 'Nisan' }, { value: 4, label: 'Mayıs' }, { value: 5, label: 'Haziran' },
        { value: 6, label: 'Temmuz' }, { value: 7, label: 'Ağustos' }, { value: 8, label: 'Eylül' },
        { value: 9, label: 'Ekim' }, { value: 10, label: 'Kasım' }, { value: 11, label: 'Aralık' }
    ];
    const years = [2024, 2025, 2026, 2027];

    const fetchMovements = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            
            // If searching, fetch a large chunk to filter client-side since backend doesn't support product name search
            if (debouncedSearch) {
                params.append('page', '1');
                params.append('pageSize', '10000');
            } else {
                params.append('page', currentPage.toString());
                params.append('pageSize', pageSize.toString());
            }

            if (selectedYear !== '') {
                if (selectedMonth !== '') {
                    const startDate = new Date(selectedYear, Number(selectedMonth), 1, 0, 0, 0);
                    const endDate = new Date(selectedYear, Number(selectedMonth) + 1, 0, 23, 59, 59);
                    params.append('fromDate', startDate.toISOString());
                    params.append('toDate', endDate.toISOString());
                } else {
                    // If year is selected but no month, filter by entire year
                    const startDate = new Date(selectedYear, 0, 1, 0, 0, 0);
                    const endDate = new Date(selectedYear, 11, 31, 23, 59, 59);
                    params.append('fromDate', startDate.toISOString());
                    params.append('toDate', endDate.toISOString());
                }
            }

            const res = await authFetch(`${API_BASE_URL}/api/StockMovement?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                const rawData = Array.isArray(data) ? data : data.items || [];
                let sortedData = rawData.sort((a: any, b: any) => {
                    const dateA = new Date(a.createdAt || a.date).getTime();
                    const dateB = new Date(b.createdAt || b.date).getTime();
                    return dateB - dateA;
                });

                if (debouncedSearch) {
                    sortedData = sortedData.filter((m: any) => 
                        (m.productName || '').toLowerCase().includes(debouncedSearch.toLowerCase())
                    );
                    setTotalCount(sortedData.length);
                    sortedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
                } else {
                    setTotalCount(Array.isArray(data) ? sortedData.length : data.totalRecord || data.TotalRecord || data.totalCount || 0);
                }
                
                setMovements(sortedData);
            } else {
                setError('Hareketler yüklenirken bir sorun oluştu.');
            }
        } catch (err) {
            setError('Sunucu bağlantı hatası.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovements();
    }, [currentPage, pageSize, selectedMonth, selectedYear, debouncedSearch]);

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchMovements(); // Re-fetch data on success
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Depo Hareketleri</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Stok giriş, çıkış ve fire işlemlerini yönetin.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-lg shadow-sm hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors whitespace-nowrap"
                >
                    <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Yeni Stok Hareketi
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Ürün Adında Ara</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Örn: Laptop..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
                        />
                        <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                <div className="w-full md:w-1/4">
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${selectedYear === '' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>Ay Filtresi</label>
                    <select
                        value={selectedMonth}
                        disabled={selectedYear === ''}
                        onChange={(e) => { setSelectedMonth(e.target.value === '' ? '' : Number(e.target.value)); setCurrentPage(1); }}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Tüm Aylar</option>
                        {months.map(m => (
                            <option key={m.value} value={m.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{m.label}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/4">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Yıl Filtresi</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => { 
                            const val = e.target.value;
                            if (val === '') {
                                setSelectedYear('');
                                setSelectedMonth(''); // Reset month when "All Years" is selected
                            } else {
                                setSelectedYear(Number(val)); 
                            }
                            setCurrentPage(1); 
                        }}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
                    >
                        <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Tüm Yıllar</option>
                        {years.map(y => (
                            <option key={y} value={y} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden text-sm transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-brand-surface dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-center">Tarih / Saat</th>
                                <th className="px-6 py-4 text-center">İşlem Tipi</th>
                                <th className="px-6 py-4 text-center">Ürün</th>
                                <th className="px-6 py-4 text-center">Miktar</th>
                                <th className="px-6 py-4 text-center">Açıklama</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="animate-spin h-6 w-6 text-emerald-500 mb-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Veriler yükleniyor...
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-rose-500 font-medium">
                                        {error}
                                    </td>
                                </tr>
                            ) : movements.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        Filtrelerinize uygun depo hareketi bulunamadı.
                                    </td>
                                </tr>
                            ) : movements.map((movement) => (
                                <tr key={movement.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4 text-center">
                                        <div className="font-bold text-slate-900 dark:text-slate-100">{new Date(movement.createdAt || movement.date).toLocaleDateString('tr-TR')}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{new Date(movement.createdAt || movement.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <MovementBadge type={movement.transactionType || movement.type} />
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-slate-100 whitespace-normal break-words max-w-[220px]">
                                        {movement.productName}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold">
                                        {(movement.transactionType || movement.type) === 'IN' ? (
                                            <span className="text-emerald-600 font-bold">+{movement.quantity}</span>
                                        ) : (
                                            <span className="text-rose-600 font-bold">-{movement.quantity}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-normal break-words max-w-xs text-slate-500 dark:text-slate-400" title={movement.description}>
                                        {movement.description || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {movements.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={totalCount}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                )}
            </div>

            <AddMovementModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
