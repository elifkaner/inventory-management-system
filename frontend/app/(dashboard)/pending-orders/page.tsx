'use client';
import { useState, useEffect } from 'react';
import { formatNoOrphans } from '@/app/lib/utils';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import Toast from '@/app/ui/toast';
import Pagination from '@/app/ui/pagination';

export default function PendingOrdersPage() {
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'info' }>({ isOpen: false, message: '', type: 'info' });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const fetchPendingOrders = async () => {
        try {
            const res = await authFetch(`${API_BASE_URL}/api/PendingOrder`);
            if (res.ok) {
                const data = await res.json();
                setPendingOrders(data);
            }
        } catch (error) {
            console.error("Bekleyen siparişler getirilemedi:", error);
            setToast({ isOpen: true, message: 'Siparişler yüklenemedi.', type: 'error' });
        }
    };

    const handleRemoveOrder = (id: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Siparişi İptal Et',
            message: 'Bu siparişi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
            onConfirm: async () => {
                try {
                    const res = await authFetch(`${API_BASE_URL}/api/PendingOrder/${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        setToast({ isOpen: true, message: 'Sipariş başarıyla iptal edildi.', type: 'info' });
                        fetchPendingOrders();
                    }
                } catch (error) {
                    setToast({ isOpen: true, message: 'Sipariş iptal edilemedi.', type: 'error' });
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleClearAll = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Tüm Siparişleri İptal Et',
            message: 'Tüm siparişleri iptal etmek istediğinize emin misiniz? Tüm liste temizlenecek ve bu işlem geri alınamaz.',
            onConfirm: async () => {
                try {
                    // Tek tek silmek yerine hepsini silen endpoint de yapılabilirdi, 
                    // ama şimdilik mevcut pendingOrders'i dönüp silebiliriz
                    for (const order of pendingOrders) {
                        await authFetch(`${API_BASE_URL}/api/PendingOrder/${order.id}`, { method: 'DELETE' });
                    }
                    setToast({ isOpen: true, message: 'Tüm siparişler başarıyla iptal edildi.', type: 'success' });
                    fetchPendingOrders();
                } catch (error) {
                    setToast({ isOpen: true, message: 'Siparişler iptal edilirken hata oluştu.', type: 'error' });
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const totalPages = Math.ceil(pendingOrders.length / pageSize);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentOrders = pendingOrders.slice(indexOfFirstItem, indexOfLastItem);

    // Silme sonrası sayfa boşalırsa bir önceki sayfaya geç
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [pendingOrders.length, currentPage, totalPages]);

    return (
        <div className="w-full flex flex-col min-h-[calc(100vh-2rem)] md:min-h-full">
            <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast(prev => ({ ...prev, isOpen: false }))} />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-2xl">
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        Sipariş Geçilenler
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Kritik stok seviyesine düşüp siparişi verilmiş ürünlerin tam listesi.</p>
                </div>

                {pendingOrders.length > 0 && (
                    <button 
                        onClick={handleClearAll}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Tüm Siparişleri İptal Et
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden flex-1 flex flex-col border border-slate-100 dark:border-slate-700/50">
                <div className="overflow-x-auto w-full flex-1">
                    <table className="w-full text-left border-collapse table-auto min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/70 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold tracking-wider">
                                <th className="px-6 py-4">Ürün Adı</th>
                                <th className="px-6 py-4">Kategori / Marka</th>
                                <th className="px-6 py-4 text-center">Tedarikçi</th>
                                <th className="px-6 py-4 text-center">Sipariş Edilen Miktar</th>
                                <th className="px-6 py-4 text-center">Sipariş Tarihi</th>
                                <th className="px-6 py-4 pr-8 text-right w-1 whitespace-nowrap">Sipariş İptal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {pendingOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="font-semibold text-lg">Sipariş geçilen ürün bulunmamaktadır.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentOrders.map((order, idx) => (
                                    <tr key={`${order.id}-${idx}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                                        <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-bold whitespace-normal max-w-[250px]">
                                            {formatNoOrphans(order.productName)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 dark:text-slate-300">{order.category || '-'}</span>
                                                <span className="text-xs text-slate-400 dark:text-slate-500">{order.brand || order.brandName || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">{order.supplier || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center min-w-[70px] px-3 py-1.5 rounded-lg text-sm font-bold bg-amber-100/50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-700/30">
                                                +{order.orderQuantity} Adet
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">
                                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </td>
                                        <td className="px-6 py-4 pr-8 text-right w-1 whitespace-nowrap">
                                            <button 
                                                onClick={() => handleRemoveOrder(order.id)}
                                                className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                title="Siparişi İptal Et"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
                            {pendingOrders.length > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={pendingOrders.length}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            )}
            </div>

            {/* Confirm Modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden text-center p-8 border border-slate-100 dark:border-slate-700">
                        <div className="mx-auto w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">{confirmModal.title}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                            {confirmModal.message}
                        </p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))} className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors shadow-sm">İptal</button>
                            <button onClick={confirmModal.onConfirm} className="flex-1 px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-500/30 transition-colors">Evet, İptal Et</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
