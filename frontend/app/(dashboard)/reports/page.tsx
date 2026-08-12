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
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '4rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '24px' }}>
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontWeight: 700, fontSize: '14px' }}>
            <span style={{ width: 11, height: 11, borderRadius: '4px', backgroundColor: entry.color, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
            {entry.value && entry.value.length > 28 ? entry.value.substring(0, 28) + "..." : entry.value}
          </li>
        ))}
      </ul>
    );
};

const renderPieLabel = (props: any) => {
    const { x, y, cx, name, value, percent, fill } = props;
    if (!value || percent < 0.02) return null;

    // Etiketleri görsel olarak daha iyi hizalamak için ufak bir kaydırma (yukarı ve sağa/sola)
    const isRight = x > cx;
    let nudgeX = isRight ? 12 : -12;
    let nudgeY = -8; // Daha da yukarı

    // Kullanıcının özel isteği: Giyim yazısı özellikle sağa ve YUKARI kaysın
    if (name === 'Giyim') {
        nudgeX = 35; // Giyim'i zorla sağa it
        nudgeY = -15; // 25'ten 15'e çektik, 10 birim aşağı kaydı
    } else if (name === 'Ofis Malzemeleri') {
        nudgeX += 10; // 5'ti, 5 daha eklendi = 10 birim sağa
    } else if (name === 'Gıda ve İçecek') {
        nudgeX -= 10; // 10 birim sola kaydır
    }

    return (
        <text x={x + nudgeX} y={y + nudgeY} fill={fill} textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize={13} fontWeight={700}>
            {name} ({value})
        </text>
    );
};

const renderSupplierPieLegend = (props: any) => {
    const { payload } = props;
    const total = payload.reduce((sum: number, entry: any) => sum + (entry.payload?.totalProduct || 0), 0);

    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '2.5rem', rowGap: '0.75rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '0px' }}>
        {payload.map((entry: any, index: number) => {
            const val = entry.payload?.totalProduct || 0;
            const percent = total > 0 ? ((val / total) * 100).toFixed(1) : "0.0";
            
            let shortName = entry.value || "";
            const words = shortName.split(' ');
            if (words.length > 2) {
                shortName = words.slice(0, 2).join(' ') + '...';
            }

            return (
              <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 600, fontSize: '11px' }}>
                <span style={{ width: 14, height: 14, borderRadius: '4px', backgroundColor: entry.color, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                {shortName}
                <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 700 }}>%${percent}</span>
              </li>
            );
        })}
      </ul>
    );
};

const renderPieLegend = (props: any) => {
    const { payload } = props;
    
    // Toplam değeri hesaplayarak yüzdeleri gerçek dinamik verilere göre buluyoruz
    const total = payload.reduce((sum: number, entry: any) => sum + (entry.payload?.totalProduct || 0), 0);

    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '3rem', rowGap: '1rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '20px' }}>
        {payload.map((entry: any, index: number) => {
            const val = entry.payload?.totalProduct || 0;
            const percent = total > 0 ? ((val / total) * 100).toFixed(1) : "0.0";
            
            return (
              <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 700, fontSize: '13px' }}>
                <span style={{ width: 12, height: 12, borderRadius: '4px', backgroundColor: entry.color, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></span>
                {entry.value && entry.value.length > 28 ? entry.value.substring(0, 28) + "..." : entry.value}
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 800 }}>%{percent}</span>
              </li>
            );
        })}
      </ul>
    );
};




const renderSupplierPieLabel = (props: any) => {
    const { x, y, cx, cy, name, value, percent, fill } = props;
    if (!value || percent < 0.01) return null;

    const isRight = x > cx;
    let nudgeX = isRight ? 10 : -10;
    let nudgeY = 0;

    // Uzun isimleri sadece 2 kelimeyle sınırla
    let shortName = name || "";
    const words = shortName.split(' ');
    if (words.length > 2) {
        shortName = words.slice(0, 2).join(' ') + '...';
    }

    // Renge göre temel ittirmeler
    if (fill === '#10B981') {
        nudgeY = -20;
        nudgeX += 10;
    } else if (fill === '#B39DDB') {
        nudgeY = 15;
        nudgeX += 5;
    } else if (fill === '#3B82F6') {
        nudgeY = 25;
        nudgeX -= 5;
    } else if (fill === '#F43F5E') {
        nudgeY = -25;
        nudgeX -= 15;
    } else {
        nudgeY = y > cy ? 15 : -15;
    }

    // KULLANICININ ÖZEL İSTEĞİ: Sadece yazıların konumlarını (koordinatlarını) kaydır!
    const lowerName = name?.toLowerCase() || "";
    if (lowerName.includes('karadeniz gıda')) {
        nudgeY += 8; // 5px daha aşağı
    }
    if (lowerName.includes('marmara ofis')) {
        nudgeY -= 40; // 10px daha yukarı
        nudgeX += 10; // 10px sağa
    }
    if (lowerName.includes('akdeniz temizlik')) {
        nudgeY += 15; // 5px yukarı (eskiden +20'ydi)
    }
    if (lowerName.includes('anadolu elektronik')) {
        nudgeY -= 50; // 10px daha yukarı (eskiden -40'tı)
        nudgeX -= 5;  // 5px daha sola (eskiden 0'dı)
    }
    if (lowerName === 'diğer' || lowerName.includes('diğer')) {
        nudgeX += 100; // 10px daha sola (eskiden +110'du)
        nudgeY -= 70;  // 20px daha yukarı (eskiden -50'ydi)
    }

    return (
        <text x={x + nudgeX} y={y + nudgeY} fill={fill} textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize={13} fontWeight={700}>
            {shortName} ({value})
        </text>
    );
};

const renderSupplierLabelLine = (props: any) => {
    const { points, name, stroke, value, percent } = props;
    if (!value || percent < 0.01 || !points || points.length < 2) return <path d="" />;
    
    let p0 = points[0];
    let p1 = points[1];
    let p2 = points.length > 2 ? points[2] : null;

    if (name?.toLowerCase().includes('diğer')) {
        return <path d="" />; // Oku tamamen yok et
    }

    let d = `M${p0.x},${p0.y}L${p1.x},${p1.y}`;
    if (p2) {
        d += `L${p2.x},${p2.y}`;
    }

    return <path d={d} stroke={stroke || '#94a3b8'} fill="none" strokeWidth={1} />;
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
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8 w-full">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary tracking-tight">Analiz ve Raporlama</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-2xl">Envanter performansınızı gelişmiş, dinamik grafiklerle izleyin ve raporları dilediğiniz formda dışa aktarın.</p>
                </div>

                <div className="flex flex-row items-center gap-1.5 bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 shrink-0">
                    <button onClick={() => handleExport('/api/Product/export', 'urun-envanteri.csv')} className="bg-brand-primary/10 hover:bg-brand-primary hover:text-white dark:bg-brand-primary/20 text-brand-primary px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all flex flex-row items-center justify-center gap-2 group whitespace-nowrap">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Ürün Listesi
                    </button>
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <button onClick={() => handleExport('/api/StockMovement/export', 'stok-hareketleri.csv')} className="bg-brand-secondary/10 hover:bg-brand-secondary hover:text-white dark:bg-brand-secondary/20 text-brand-secondary px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all flex flex-row items-center justify-center gap-2 group whitespace-nowrap">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Stok Hareketleri
                    </button>
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <button onClick={() => handleExport('/api/AuditLog/export', 'sistem-loglari.csv')} className="bg-brand-accent/10 hover:bg-brand-accent hover:text-white dark:bg-brand-accent/20 text-brand-accent px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all flex flex-row items-center justify-center gap-2 group whitespace-nowrap">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Sistem Logları
                    </button>
                </div>
            </div>

            {/* Dinamik Ayar (Filtre) Barı */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex flex-wrap gap-5 items-center justify-between">
                <div className="flex flex-wrap items-center gap-5">
                    {/* Filter Icon */}
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Trend Aralığı:</label>
                        <div className="relative">
                            <select 
                                value={monthsBack} 
                                onChange={(e) => setMonthsBack(Number(e.target.value))}
                                className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                            >
                                <option value={3}>Son 3 Ay</option>
                                <option value={6}>Son 6 Ay</option>
                                <option value={12}>Son 1 Yıl</option>
                            </select>
                            <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                    
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Sıralama Kapsamı:</label>
                        <div className="relative">
                            <select 
                                value={topN} 
                                onChange={(e) => setTopN(Number(e.target.value))}
                                className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer"
                            >
                                <option value={3}>Top 3 Ürün</option>
                                <option value={5}>Top 5 Ürün</option>
                                <option value={10}>Top 10 Ürün</option>
                            </select>
                            <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                    
                    <button onClick={fetchReports} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 hover:border-indigo-200">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        <span className="hidden sm:block">Yenile</span>
                    </button>
                </div>
                
                {isLoading && (
                    <div className="flex items-center gap-2 text-sm font-bold text-indigo-500 animate-pulse bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Güncelleniyor...
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
                    <div className="h-[380px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={groupedCategoryData}
                                    dataKey="totalProduct"
                                    nameKey="categoryName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={105}
                                    innerRadius={65}
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
                    <div className="h-[380px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={groupedSupplierData}
                                    dataKey="totalProduct"
                                    nameKey="supplierName"
                                    cx="46%"
                                    cy="55%"
                                    outerRadius={105}
                                    startAngle={120}
                                    endAngle={-240}
                                    label={renderSupplierPieLabel}
                                    labelLine={renderSupplierLabelLine}
                                >
                                    {groupedSupplierData.map((entry, index) => {
                                        const SUPPLIER_COLORS = ['#10B981', '#B39DDB', '#3B82F6', '#F43F5E', '#F57C00', '#8B5CF6', '#14B8A6', '#5C6BC0'];
                                        return <Cell key={`cell-${index}`} fill={SUPPLIER_COLORS[index % SUPPLIER_COLORS.length]} />;
                                    })}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" content={renderSupplierPieLegend} />
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