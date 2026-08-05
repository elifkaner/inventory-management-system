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

export default function AnalizVeRaporlamaSayfasi() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [categoryData, setCategoryData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [supplierData, setSupplierData] = useState([]);

    // Renk paletimiz (Logodaki ve benzer tonlar)
    const COLORS = ['#5B67A8', '#F28C28', '#B695C8', '#4A548A', '#E07B1E', '#9D7FB0', '#A5B4FC', '#FDBA74'];

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const [catRes, trendRes, prodRes, supRes] = await Promise.all([
                authFetch(`${API_BASE_URL}/api/Reports/category-distribution`),
                authFetch(`${API_BASE_URL}/api/Reports/monthly-movement-trend?monthsBack=6`),
                authFetch(`${API_BASE_URL}/api/Reports/top-moved-products?topN=5`),
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
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    if (isLoading) {
        return (
            <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl flex flex-col items-center">
                    <ErrorMessage message={error} />
                    <button onClick={fetchReports} className="mt-4 text-brand-primary font-bold">Tekrar Dene</button>
                </div>
            </div>
        );
    }

    // Harita: trendData => month name
    const formattedTrendData = trendData.map((t: any) => ({
        name: `${t.month}/${t.year}`,
        gelen: t.totalIn,
        giden: t.totalOut
    }));

    return (
        <div className="p-8 bg-brand-surface dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Analiz ve Raporlama</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Sistemdeki stok hareketlerini ve envanter dağılımını görselleştirilmiş grafiklerle inceleyin.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Kategorilere Göre Dağılım (Pie Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border-0">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                        Kategori Dağılımı
                    </h2>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    dataKey="totalStock"
                                    nameKey="categoryName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={60}
                                    paddingAngle={5}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="bottom" height={36}/>
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
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={supplierData}
                                    dataKey="totalProducts"
                                    nameKey="supplierName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                >
                                    {supplierData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36}/>
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
                            <AreaChart data={formattedTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGelen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5B67A8" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#5B67A8" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorGiden" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F28C28" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#F28C28" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dx={-10} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" />
                                <Area type="monotone" dataKey="gelen" name="Stok Girişi" stroke="#5B67A8" strokeWidth={3} fillOpacity={1} fill="url(#colorGelen)" />
                                <Area type="monotone" dataKey="giden" name="Stok Çıkışı" stroke="#F28C28" strokeWidth={3} fillOpacity={1} fill="url(#colorGiden)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. En Çok Hareket Gören Ürünler (Bar Chart) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border-0 lg:col-span-2">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        En Çok Hareket Gören Ürünler (Top 5)
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
                                <Bar dataKey="movementCount" name="Hareket Sayısı" fill="#B695C8" radius={[0, 10, 10, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}