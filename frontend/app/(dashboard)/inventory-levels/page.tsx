'use client';

import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import Pagination from '@/app/ui/pagination';

export default function InventoryLevelsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [prodRes, supRes] = await Promise.all([
                    authFetch(`${API_BASE_URL}/api/Product?pageSize=10000`),
                    authFetch(`${API_BASE_URL}/api/Supplier`)
                ]);

                if (prodRes.ok) {
                    const data = await prodRes.json();
                    setProducts(Array.isArray(data) ? data : (data.items || data.Items || []));
                }
                if (supRes.ok) {
                    setSuppliers(await supRes.json());
                }
            } catch (error) {
                console.error("Veriler yüklenemedi:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // SKU Araması Eklendi
    const filteredProducts = products.filter(prod =>
        prod.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.skuCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const parseLocation = (locationString: string) => {
        if (!locationString) return { corridor: "-", shelf: "-", section: "-" };
        const parts = locationString.split('-');
        return { 
            corridor: parts[0] ? parts[0].trim() : "-", 
            shelf: parts[1] ? parts[1].trim() : "-", 
            section: parts[2] ? parts[2].trim() : "-" 
        };
    };

    const getSupplierName = (supplierId: number) => {
        if (!supplierId) return "Bilinmiyor";
        const sup = suppliers.find(s => s.id === supplierId);
        return sup ? sup.companyName : "Bilinmiyor";
    };

    return (
        <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 font-sans transition-colors">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Envanter Miktarı</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Fiziksel depo konumlarına ve tedarikçilere göre stok durumunuzu anlık takip edin.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center transition-colors">
                <div className="relative w-full md:w-[28rem]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Ürün adı, SKU veya barkoda göre ara..."
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                        className="w-full pl-10 pr-4 py-2.5 bg-brand-surface dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary text-sm dark:text-slate-200"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden overflow-x-auto transition-colors">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6 text-center">Ürün Adı</th>
                            <th className="p-4 text-center">SKU Kodu</th>
                            <th className="p-4 text-center">Barkod</th>
                            <th className="p-4 text-center">Stok Sayısı</th>
                            <th className="p-4 text-center">Koridor</th>
                            <th className="p-4 text-center">Raf</th>
                            <th className="p-4 text-center">Bölüm</th>
                            <th className="p-4 text-center">Tedarikçi</th>
                            <th className="p-4 pr-6 text-center">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {isLoading ? (
                            <tr><td colSpan={9} className="p-8 text-center text-slate-500 dark:text-slate-400 animate-pulse">Veriler Yükleniyor...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={9} className="p-8 text-center text-slate-500 dark:text-slate-400">Kayıt bulunamadı.</td></tr>
                        ) : (
                            paginatedProducts.map((prod) => {
                                const isCritical = prod.stockQuantity <= 10;
                                const isOutOfStock = prod.stockQuantity === 0;
                                const loc = parseLocation(prod.location);

                                return (
                                    <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="p-4 pl-6 text-slate-900 dark:text-slate-100 font-bold text-center whitespace-normal break-words max-w-[200px]">{prod.productName}</td>

                                        {/* SKU Kodu Sütunu */}
                                        <td className="p-4 font-mono text-xs text-slate-500 dark:text-slate-400 text-center">
                                            <span className="bg-brand-surfaceDark dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1">{prod.skuCode || '-'}</span>
                                        </td>

                                        {/* Barkod Sütunu */}
                                        <td className="p-4 font-mono text-xs text-slate-500 dark:text-slate-400 text-center">
                                            <span className="bg-brand-surfaceDark dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1">{prod.barcode || '-'}</span>
                                        </td>

                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${isOutOfStock ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300' : isCritical ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400' : 'bg-blue-50 dark:bg-blue-900/50 text-brand-primaryHover dark:text-blue-400'}`}>
                                                {prod.stockQuantity}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center text-slate-600 dark:text-slate-400">{loc.corridor}</td>
                                        <td className="p-4 text-center text-slate-600 dark:text-slate-400">{loc.shelf}</td>
                                        <td className="p-4 text-center text-slate-600 dark:text-slate-400">{loc.section}</td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400 text-center">{getSupplierName(prod.supplierId)}</td>
                                        <td className="p-4 pr-6 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${isOutOfStock ? 'bg-brand-surfaceDark dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600' : !isCritical ? 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800'}`}>
                                                {isOutOfStock ? 'Tükendi' : !isCritical ? 'Yeterli' : 'Kritik'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {filteredProducts.length > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={filteredProducts.length}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            )}
        </div>
    );
}