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

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const fetchMovements = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await authFetch(`${API_BASE_URL}/api/StockMovement?page=${currentPage}&pageSize=${pageSize}`);
            if (res.ok) {
                const data = await res.json();
                const rawData = Array.isArray(data) ? data : data.items || [];
                const sortedData = rawData.sort((a: any, b: any) => {
                    const dateA = new Date(a.createdAt || a.date).getTime();
                    const dateB = new Date(b.createdAt || b.date).getTime();
                    return dateB - dateA;
                });
                setMovements(sortedData);
                setTotalCount(Array.isArray(data) ? sortedData.length : data.totalRecord || data.TotalRecord || data.totalCount || 0);
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
    }, [currentPage, pageSize]);

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
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Yeni Stok Hareketi
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden text-sm transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">Tarih / Saat</th>
                                <th className="px-6 py-4">İşlem Tipi</th>
                                <th className="px-6 py-4">Ürün</th>
                                <th className="px-6 py-4 text-right">Miktar</th>
                                <th className="px-6 py-4 w-1/3">Açıklama</th>
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
                                        Henüz bir depo hareketi bulunmuyor.
                                    </td>
                                </tr>
                            ) : movements.map((movement) => (
                                <tr key={movement.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{new Date(movement.createdAt || movement.date).toLocaleDateString('tr-TR')}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">{new Date(movement.createdAt || movement.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <MovementBadge type={movement.transactionType || movement.type} />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                        {movement.productName}
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold">
                                        {(movement.transactionType || movement.type) === 'IN' ? (
                                            <span className="text-emerald-600">+{movement.quantity}</span>
                                        ) : (
                                            <span className="text-rose-600">-{movement.quantity}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-xs text-slate-500 dark:text-slate-400" title={movement.description}>
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
