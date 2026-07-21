'use client';

import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';

export default function InventoryLevelsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [prodRes, locRes, supRes] = await Promise.all([
                    authFetch(`${API_BASE_URL}/api/Product`),
                    authFetch(`${API_BASE_URL}/api/WarehouseLocation`),
                    authFetch(`${API_BASE_URL}/api/Supplier`)
                ]);

                if (prodRes.ok) setProducts(await prodRes.json());
                if (locRes.ok) setLocations(await locRes.json());
                if (supRes.ok) setSuppliers(await supRes.json());
            } catch (error) {
                console.error("Veriler yüklenemedi:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(prod =>
        prod.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Konum detaylarını (Koridor / Raf / Bölüm) ayrıştıran fonksiyon
    const getLocationDetails = (locationId: number) => {
        if (!locationId) return { corridor: "-", shelf: "-", section: "-" };
        const loc = locations.find(l => l.id === locationId);
        if (!loc) return { corridor: "Bilinmiyor", shelf: "-", section: "-" };
        return { corridor: loc.corridor, shelf: loc.shelf, section: loc.section };
    };

    const getSupplierName = (supplierId: number) => {
        if (!supplierId) return "Bilinmiyor";
        const sup = suppliers.find(s => s.id === supplierId);
        return sup ? sup.companyName : "Bilinmiyor";
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Envanter Miktarı</h1>
                    <p className="text-slate-500 mt-1 text-sm">Fiziksel depo konumlarına ve tedarikçilere göre stok durumunuzu anlık takip edin.</p>
                </div>
            </div>

            {/* ARAMA VE FİLTRE */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-[28rem]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Ürün adı veya barkoda göre ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>

            {/* LİSTELEME TABLOSU */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6">Ürün Adı</th>
                            <th className="p-4">Barkod</th>
                            <th className="p-4 text-center">Stok Sayısı</th>
                            <th className="p-4 text-center">Koridor</th>
                            <th className="p-4 text-center">Raf</th>
                            <th className="p-4 text-center">Bölüm</th>
                            <th className="p-4">Tedarikçi</th>
                            <th className="p-4 pr-6 text-right">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {isLoading ? (
                            <tr><td colSpan={8} className="p-8 text-center text-slate-500 animate-pulse">Veriler Yükleniyor...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={8} className="p-8 text-center text-slate-500">Kayıt bulunamadı.</td></tr>
                        ) : (
                            filteredProducts.map((prod) => {
                                const isCritical = prod.stockQuantity <= 10;
                                const isOutOfStock = prod.stockQuantity === 0;
                                const loc = getLocationDetails(prod.locationId);

                                return (
                                    <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 pl-6 text-slate-900 font-bold">{prod.productName}</td>
                                        <td className="p-4 font-mono text-xs text-slate-500">
                                            <span className="bg-slate-100 border border-slate-200 rounded px-2 py-1">{prod.barcode}</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${isOutOfStock ? 'bg-slate-200 text-slate-500' : isCritical ? 'bg-rose-100 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>
                                                {prod.stockQuantity}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center text-slate-600">{loc.corridor}</td>
                                        <td className="p-4 text-center text-slate-600">{loc.shelf}</td>
                                        <td className="p-4 text-center text-slate-600">{loc.section}</td>
                                        <td className="p-4 text-slate-600">{getSupplierName(prod.supplierId)}</td>
                                        <td className="p-4 pr-6 text-right">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${isOutOfStock ? 'bg-slate-100 text-slate-600 border border-slate-200' : !isCritical ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
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
        </div>
    );
}