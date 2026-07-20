'use client';

import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';

export default function InventoryLevelsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Geliştirici Test Butonu için Admin State'i
    const [isAdmin, setIsAdmin] = useState(false);

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

    // Konum detaylarını (Depo / Koridor / Raf / Bölüm) ayrıştıran fonksiyon
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

                {/* Geliştirici Test Butonu (Finansal Verileri Gizle/Göster) */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase">Test Rolü:</span>
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${isAdmin ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        {isAdmin ? 'Admin (Para İşlemleri Açık)' : 'Depo Görevlisi (Para Gizli)'}
                    </button>
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6">Ürün Adı & Barkod</th>
                            <th className="p-4 text-center">Stok Sayısı</th>
                            <th className="p-4">Depo & Konum (Koridor/Raf/Bölüm)</th>
                            <th className="p-4">Tedarikçi</th>
                            {isAdmin && (
                                <th className="p-4 text-right">Para İşlemleri (Maliyet/Değer)</th>
                            )}
                            <th className="p-4 pr-6 text-right">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {isLoading ? (
                            <tr><td colSpan={isAdmin ? 6 : 5} className="p-8 text-center text-slate-500 animate-pulse">Veriler Yükleniyor...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={isAdmin ? 6 : 5} className="p-8 text-center text-slate-500">Kayıt bulunamadı.</td></tr>
                        ) : (
                            filteredProducts.map((prod) => {
                                const isCritical = prod.stockQuantity <= 10;
                                const loc = getLocationDetails(prod.locationId);
                                const totalValue = (prod.stockQuantity || 0) * (prod.purchasePrice || 0);

                                return (
                                    <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 font-bold">{prod.productName}</span>
                                                <span className="text-xs text-slate-400 font-mono mt-0.5">{prod.barcode}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${isCritical ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                                                {prod.stockQuantity} Adet
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100 font-semibold">Ana Depo</span>
                                                <span className="text-slate-400">/</span>
                                                <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">Kor: {loc.corridor}</span>
                                                <span className="text-slate-400">/</span>
                                                <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">Raf: {loc.shelf}</span>
                                                <span className="text-slate-400">/</span>
                                                <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">Böl: {loc.section}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600">{getSupplierName(prod.supplierId)}</td>

                                        {isAdmin && (
                                            <td className="p-4 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-xs text-slate-500 font-medium">B. Maliyet: ₺{(prod.purchasePrice || 0).toLocaleString()}</span>
                                                    <span className="text-slate-900 font-bold mt-0.5">Top. Değer: ₺{totalValue.toLocaleString()}</span>
                                                </div>
                                            </td>
                                        )}

                                        <td className="p-4 pr-6 text-right">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${!isCritical ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                                                {!isCritical ? 'Yeterli' : 'Kritik'}
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