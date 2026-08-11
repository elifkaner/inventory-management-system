'use client';
import { useState, useEffect, useCallback } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';
import ErrorMessage from '@/app/ui/error-message';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    BarChart, Bar,
    AreaChart, Area
} from 'recharts';

const groupData = (data: any[], nameKey: string, valueKey: string, maxItems = 4) => {
    if (!data || data.length <= maxItems) return data;
    const sorted = [...data].sort((a, b) => b[valueKey] - a[valueKey]);
    const top = sorted.slice(0, maxItems);
    const others = sorted.slice(maxItems);
    if (others.length > 0) {
        const othersValue = others.reduce((sum, item) => sum + item[valueKey], 0);
        top.push({
            [nameKey]: 'Diğer',
            [valueKey]: othersValue
        });
    }
    return top;
};

const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '20px' }}>
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 600, fontSize: '13px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: entry.color }}></span>
            {entry.value && entry.value.length > 28 ? entry.value.substring(0, 28) + "..." : entry.value}
          </li>
        ))}
      </ul>
    );
};

const renderPieLabel = ({ name, percent }: any) => {
    if (percent < 0.03) return null;
    return `${name} (${(percent * 100).toFixed(0)}%)`;
};

const renderPieLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '10px' }}>
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 500, fontSize: '11px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: entry.color }}></span>
            {entry.value && entry.value.length > 28 ? entry.value.substring(0, 28) + "..." : entry.value}
          </li>
        ))}
      </ul>
    );
};

export default function AnalizVeRaporlamaSayfasi() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [categoryData, setCategoryData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [supplierData, setSupplierData] = useState([]);

    // Dinamik Ayarlar
    const [monthsBack, setMonthsBack] = useState<number>(6);
    const [topN, setTopN] = useState<number>(5);

    // Premium Renk Paletleri
    const COLORS = ['#5C6BC0', '#F57C00', '#B39DDB', '#10B981', '#F43F5E', '#3B82F6', '#8B5CF6', '#14B8A6'];

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const [catRes, trendRes, prodRes, supRes] = await Promise.all([
                authFetch(`${API_BASE_URL}/api/Reports/category-distribution`),
                authFetch(`${API_BASE_URL}/api/Reports/monthly-movement-trend?monthsBack=${monthsBack}`),
                authFetch(`${API_BASE_URL}/api/Reports/top-moved-products?topN=${topN}`),
                authFetch(`${API_BASE_URL}/api/Reports/supplier-distribution`)
            ]);

            if (catRes.ok) setCategoryData(await catRes.json());
            if (trendRes.ok) setTrendData(await trendRes.json());
            if (prodRes.ok) setTopProducts(await prodRes.json());
            if (supRes.ok) setSupplierData(await supRes.json());

        } catch (err) {
            console.error("Raporlar yüklenemedi", err);
            setError("Rapor verileri sunucudan çekilemedi.");
        } finally {
            setIsLoading(false);
        }
    }, [monthsBack, topN]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleExport = async (endpoint: string, filename: string) => {
        try {
            const res = await authFetch(`${API_BASE_URL}${endpoint}`);
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                alert("Dışa aktarma başarısız oldu.");
            }
        } catch (error) {
            console.error("Export error", error);
            alert("Dışa aktarma sırasında hata oluştu.");
        }
    };

    if (error) {
        return (
            <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen">
                <div className="bg-white/80 backdrop-blur-xl dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-brand-primary/10 flex flex-col items-center">
                    <ErrorMessage message={error} />
                    <button onClick={fetchReports} className="mt-4 text-brand-primary font-bold">Tekrar Dene</button>
                </div>
            </div>
        );
    }

    const groupedCategoryData = groupData(categoryData, 'categoryName', 'totalProduct', 4);
    const groupedSupplierData = groupData(supplierData, 'supplierName', 'totalProduct', 4);

    const formattedTrendData = trendData.map((t: any) => ({
        name: `${t.month}/${t.year}`,
        gelen: t.totalIn,
        giden: t.totalOut
    }));

    return (
        <div className="p-4 md:p-8 bg-brand-surface dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
            
            {/* Üst Kısım: Başlık ve Export Center */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary tracking-tight">Analiz ve Raporlama</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-2xl">Envanter performansınızı gelişmiş, dinamik grafiklerle izleyin ve raporları dilediğiniz formda dışa aktarın.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button onClick={() => handleExport('/api/Product/export', 'urun-envanteri.csv')} className="bg-white/80 backdrop-blur-md hover:bg-brand-primary hover:text-white dark:bg-slate-800 dark:hover:bg-brand-primary text-brand-primary px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/10 border border-brand-primary/20 transition-all flex items-center gap-2 group">
                        <svg className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Ürün Listesi
                    </button>
                    <button onClick={() => handleExport('/api/StockMovement/export', 'stok-hareketleri.csv')} className="bg-white/80 backdrop-blur-md hover:bg-brand-accent hover:text-white dark:bg-slate-800 dark:hover:bg-brand-accent text-brand-accent px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-accent/10 border border-brand-accent/20 transition-all flex items-center gap-2 group">
                        <svg className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Stok Hareketleri
                    </button>
                    <button onClick={() => handleExport('/api/AuditLog/export', 'sistem-loglari.csv')} className="bg-white/80 backdrop-blur-md hover:bg-slate-700 hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-slate-200 dark:shadow-slate-900 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 group">
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Sistem Logları
                    </button>
                </div>
            </div>

            {/* Dinamik Ayar (Filtre) Barı */}
            <div className="bg-white/90 backdrop-blur-xl dark:bg-slate-800 p-5 rounded-2xl shadow-xl shadow-brand-primary/5 border border-brand-primary/10 dark:border-slate-700 mb-8 flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Trend Aralığı:</label>
                    <select 
                        value={monthsBack} 
                        onChange={(e) => setMonthsBack(Number(e.target.value))}
                        className="bg-brand-surface/50 dark:bg-slate-900 border border-brand-primary/20 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-semibold text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all cursor-pointer"
                    >
                        <option value={3}>Son 3 Ay</option>
                        <option value={6}>Son 6 Ay</option>
                        <option value={12}>Son 1 Yıl</option>
                    </select>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Sıralama (Top N):</label>
                    <select 
                        value={topN} 
                        onChange={(e) => setTopN(Number(e.target.value))}
                        className="bg-brand-surface/50 dark:bg-slate-900 border border-brand-primary/20 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-semibold text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all cursor-pointer"
                    >
                        <option value={3}>Top 3</option>
                        <option value={5}>Top 5</option>
                        <option value={10}>Top 10</option>
                    </select>
                </div>
                
                {isLoading && (
                    <div className="ml-auto flex items-center gap-2 text-sm font-bold text-brand-primary animate-pulse">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Veriler Güncelleniyor...
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Kategorilere Göre Dağılım (Pie Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border-0">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                        Kategori Dağılımı
                    </h2>
                    <div className="h-[340px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={groupedCategoryData}
                                    dataKey="totalProduct"
                                    nameKey="categoryName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={85}
                                    innerRadius={50}
                                    paddingAngle={5}
                                    label={renderPieLabel}
                                    labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                                >
                                    {groupedCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="bottom" content={renderPieLegend} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Tedarikçi Dağılımı (Pie Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border-0">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
                        Tedarikçi Dağılımı
                    </h2>
                    <div className="h-[340px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={groupedSupplierData}
                                    dataKey="totalProduct"
                                    nameKey="supplierName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={85}
                                    label={renderPieLabel}
                                    labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                                >
                                    {groupedSupplierData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" content={renderPieLegend} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Aylık Hareket Trendi (Area Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border-0 lg:col-span-2">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                        Aylık Stok Hareket Trendi
                    </h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={formattedTrendData} margin={{ top: 10, right: 30, left: 15, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} width={40} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Legend content={renderCustomLegend} />
                                <Bar dataKey="gelen" name="Stok Girişi" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="giden" name="Stok Çıkışı" fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. En Çok Hareket Gören Ürünler (Bar Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border-0 lg:col-span-2">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        En Çok Hareket Gören Ürünler (Top {topN})
                    </h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                                <YAxis dataKey="productName" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={150} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="totalMovementCount" name="Hareket Sayısı" fill="#B695C8" radius={[0, 10, 10, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}