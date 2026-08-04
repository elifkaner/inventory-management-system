'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import MovementBadge from '@/app/ui/stock-movements/movement-badge';

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [criticalProducts, setCriticalProducts] = useState<any[]>([]);
  const [recentMovements, setRecentMovements] = useState<any[]>([]);
  const [supplierCount, setSupplierCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [summaryRes, productsRes, movementsRes, suppliersRes] = await Promise.all([
          authFetch(`${API_BASE_URL}/api/Product/summary`),
          authFetch(`${API_BASE_URL}/api/Product`),
          authFetch(`${API_BASE_URL}/api/StockMovement?pageSize=5`), // Assuming backend respects pageSize or we slice frontend
          authFetch(`${API_BASE_URL}/api/Supplier`)
        ]);

        if (summaryRes.ok) setSummary(await summaryRes.json());
        
        if (productsRes.ok) {
          const allProducts = await productsRes.json();
          // HACK: Backend isCritical filtresi gelene kadar frontend'de stockQuantity <= 10 olanları filtrele
          const criticals = Array.isArray(allProducts) ? allProducts : allProducts.items || [];
          setCriticalProducts(criticals.filter((p: any) => p.stockQuantity <= 500).slice(0, 5));
        }

        if (movementsRes.ok) {
          const movs = await movementsRes.json();
          const movsArray = Array.isArray(movs) ? movs : movs.items || [];
          // Get the latest 5 (assuming backend sorts by date desc, if not we slice)
          setRecentMovements(movsArray.slice(0, 5));
        }

        if (suppliersRes.ok) {
          const sups = await suppliersRes.json();
          const supsArray = Array.isArray(sups) ? sups : sups.items || [];
          setSupplierCount(supsArray.length);
        }

      } catch (error) {
        console.error("Dashboard verileri yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-100 transition-colors duration-200">

      {/* 1. ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Genel Bakış</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">İşletmenizin anlık envanter durumu ve operasyonel özetini takip edin.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/products" className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Yeni Envanter Ekle
          </Link>
        </div>
      </div>

      {/* 2. 4'LÜ ÖZET İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* Kart 1 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Toplam Stok Kalemi</p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {isLoading ? 'Yükleniyor...' : (summary?.totalProducts || 0)}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Sistemde kayıtlı toplam ürün çeşidi</span>
          </div>
        </div>

        {/* Kart 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Düşük Stok Alarmı</p>
              <h3 className="text-3xl font-extrabold text-rose-600 dark:text-rose-500">
                {isLoading ? 'Yükleniyor...' : (summary?.criticalStockCount || 0)}
              </h3>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-xl group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-rose-600 dark:text-rose-400">
            <span>Acil sipariş verilmesi gerekenler</span>
          </div>
        </div>

        {/* Kart 3 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Aktif B2B Portföyü</p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {isLoading ? 'Yükleniyor...' : supplierCount}
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Sistemde kayıtlı aktif iş ortakları (Tedarikçi)</span>
          </div>
        </div>

        {/* Kart 4 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Aktif Satış Oranı</p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {isLoading ? 'Yükleniyor...' : `%${summary?.activeSalesRate || 0}`}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Satışa açık, aktif durumdaki stoklar</span>
          </div>
        </div>
      </div>

      {/* 3. İKİLİ PANELLER (Hızlı Tablolar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sol Panel: Kritik Stoklar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-96 overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 z-10 relative">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Acil Sipariş Bekleyenler
            </h2>
            <Link href="/inventory-levels" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Envantere Git</Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex h-full items-center justify-center p-8 text-slate-400 dark:text-slate-500">Yükleniyor...</div>
            ) : criticalProducts.length === 0 ? (
              <div className="p-8 flex h-full flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <h3 className="text-slate-700 dark:text-slate-300 font-bold mb-1">Kritik Stok Bulunamadı</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">Şu an için belirlenen minimum stok seviyesinin altına düşen bir bileşen bulunmuyor.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {criticalProducts.map(p => (
                  <li key={p.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex justify-between items-center transition-colors">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{p.productName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">SKU: {p.skuCode || '-'}</p>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1 rounded-full font-bold text-sm border border-rose-100 dark:border-rose-800/50">
                      {p.stockQuantity} Adet
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sağ Panel: Son Hareketler */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-96 overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 z-10 relative">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Son Depo Operasyonları
            </h2>
            <Link href="/stock-movements" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Tümünü Gör</Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex h-full items-center justify-center p-8 text-slate-400 dark:text-slate-500">Yükleniyor...</div>
            ) : recentMovements.length === 0 ? (
              <div className="p-8 flex h-full flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-slate-700 dark:text-slate-300 font-bold mb-1">Kayıt Bekleniyor</h3>
                <p className="text-sm text-slate-500 max-w-xs">Veritabanına henüz yeni bir işlem kaydı düşmedi.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentMovements.map(m => (
                  <li key={m.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3">
                      <MovementBadge type={m.transactionType || m.type} />
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{m.productName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{new Date(m.createdAt || m.date).toLocaleString('tr-TR')}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                      {(m.transactionType || m.type) === 'IN' ? '+' : '-'}{m.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}