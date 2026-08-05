const fs = require('fs');
const path = 'frontend/app/(dashboard)/products/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add statusFilter state
content = content.replace(
    'const [searchTerm, setSearchTerm] = useState("");',
    'const [searchTerm, setSearchTerm] = useState("");\n    const [statusFilter, setStatusFilter] = useState<string>("all");'
);

// 2. Update fetchProducts URL
content = content.replace(
    'const res = await authFetch(`${API_BASE_URL}/api/Product?search=${debouncedSearchTerm}&page=${currentPage}&pageSize=${pageSize}`);',
    'const statusQuery = statusFilter === "active" ? "&isActive=true" : statusFilter === "passive" ? "&isActive=false" : "";\n            const res = await authFetch(`${API_BASE_URL}/api/Product?search=${debouncedSearchTerm}${statusQuery}&page=${currentPage}&pageSize=${pageSize}`);'
);

// 3. Update dependencies
content = content.replace(
    '}, [debouncedSearchTerm, currentPage, pageSize]);',
    '}, [debouncedSearchTerm, currentPage, pageSize, statusFilter]);'
);

// 4. Update Header Buttons
content = content.replace(
    'rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2',
    'rounded-full font-semibold shadow-md shadow-slate-200/50 transition-all flex items-center gap-2'
);
content = content.replace(
    'rounded-xl font-semibold shadow-lg shadow-brand-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2',
    'rounded-full font-semibold shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2'
);

// 5. Update Search Bar Area (Add dropdown, rounded-full, soft shadow)
content = content.replace(
    '<div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">\n                <div className="relative w-full md:w-96">\n                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>\n                    <input type="text" placeholder="Ürün adı, SKU veya Barkod ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-brand-surface dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm dark:text-slate-200" />\n                </div>\n            </div>',
    `<div className="bg-transparent mb-8 flex flex-col md:flex-row gap-4 justify-start items-center">
                <div className="relative w-full md:w-[400px]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-brand-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" placeholder="Ürün, kategori, marka veya kod ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-0 rounded-full shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400" />
                </div>
                <div className="relative w-full md:w-48">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-0 rounded-full shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 text-sm text-slate-700 dark:text-slate-200 transition-all appearance-none cursor-pointer">
                        <option value="all">Tüm Durumlar</option>
                        <option value="active">Sadece Aktifler</option>
                        <option value="passive">Sadece Pasifler</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>`
);

// 6. Update Table Container (Soft Minimalist)
content = content.replace(
    '<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">',
    '<div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden">'
);

// 7. Update Modal borders and radii
content = content.replace(
    'className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl relative transition-colors"',
    'className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-4xl relative transition-colors"'
);
content = content.replace(
    'rounded-t-2xl',
    'rounded-t-3xl border-0'
);
content = content.replace(
    'rounded-b-2xl',
    'rounded-b-3xl border-0'
);

// 8. Update inner modal buttons to rounded-full
content = content.replace(
    'className="px-5 py-2.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-brand-surfaceDark dark:hover:bg-slate-600 rounded-xl font-medium text-sm transition-colors"',
    'className="px-6 py-2.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-brand-surfaceDark dark:hover:bg-slate-600 rounded-full font-bold text-sm transition-colors shadow-sm"'
);
content = content.replace(
    'rounded-xl font-medium text-sm disabled:opacity-70 flex items-center gap-2 transition-colors"',
    'rounded-full font-bold text-sm disabled:opacity-70 flex items-center gap-2 transition-colors"'
);

fs.writeFileSync(path, content, 'utf8');
