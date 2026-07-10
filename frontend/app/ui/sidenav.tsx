import Link from 'next/link';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white border-r border-gray-200 shadow-sm">
            <div className="mb-6 flex h-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 md:h-32 shadow-lg shadow-blue-600/30 relative overflow-hidden group">

                {/* Arka plan ışıltı deseni */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>

                <div className="flex items-center gap-3 relative z-10 w-full md:justify-center px-2">
                    {/* Logo İkonu (3D Hissiyatlı Küp) */}
                    <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner flex-shrink-0">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>

                    {/* Metin / Marka Kısmı */}
                    <div className="flex flex-col items-start md:items-center xl:items-start text-left">
                        <span className="text-white font-extrabold text-2xl tracking-tight leading-none flex items-center">
                            Stok<span className="text-blue-200 font-medium">Pro</span>
                            <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        </span>
                        <span className="text-blue-100/70 text-[9px] font-bold tracking-widest uppercase mt-1 hidden xl:block">
                            Envanter Yönetimi
                        </span>
                    </div>
                </div>

            </div>

            <div className="flex flex-row space-x-2 md:flex-col md:gap-3 py-1 md:space-x-0 flex-grow">

                <Link
                    href="/"
                    className="group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="hidden md:block">Genel Bakış</span>
                </Link>

                <Link
                    href="/products"
                    className="group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="hidden md:block">Ürün Envanteri</span>
                </Link>

                {/* YENİ EKLENEN 4 MODÜL */}
                <Link
                    href="/categories"
                    className="group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="hidden md:block">Envanter Grupları</span>
                </Link>

                <Link
                    href="/stock-movements"
                    className="group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span className="hidden md:block">Depo Operasyonları</span>
                </Link>

                <Link
                    href="/suppliers"
                    className="group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="hidden md:block">İş Ortakları</span>
                </Link>

                <Link
                    href="/reports"
                    className="group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden md:block">Analiz ve Raporlama</span>
                </Link>
            </div>
        </div>
    );
}