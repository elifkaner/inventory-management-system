'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Menü yapımızı güncelliyoruz: Alt menüsü olanlar için "subLinks" dizisi ekledik.
const menuItems = [
    {
        name: 'Genel Bakış',
        href: '/',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )
    },
    {
        name: 'Ürün Envanteri',
        href: '/products',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        )
    },
    // YENİ EKLENEN DROPDOWN MENÜ: Envanter İşlemleri
    {
        name: 'Envanter İşlemleri',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        ),
        subLinks: [
            { name: 'Depo Hareketleri', href: '/stock-movements' },
            { name: 'Envanter Miktarı', href: '/inventory-levels' } // Yeni sayfamız için link
        ]
    },
    {
        name: 'Envanter Grupları',
        href: '/categories',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
        )
    },
    {
        name: 'İş Ortakları',
        href: '/suppliers',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    },
    {
        name: 'Analiz ve Raporlama',
        href: '/reports',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    }
];

export default function SideNav() {
    const pathname = usePathname();
    // Dropdown menünün açık/kapalı durumunu tutacak state (Varsayılan olarak kapalı)
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white border-r border-gray-200 shadow-sm">
            <div className="mb-6 flex h-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 md:h-32 shadow-lg shadow-blue-600/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="flex items-center gap-3 relative z-10 w-full md:justify-center px-2">
                    <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner flex-shrink-0">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
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

            <div className="flex flex-row space-x-2 md:flex-col md:gap-2 py-1 md:space-x-0 flex-grow overflow-y-auto">
                {menuItems.map((item) => {
                    // Eğer menünün alt linkleri varsa (Dropdown ise)
                    if (item.subLinks) {
                        const isChildActive = item.subLinks.some(sub => pathname === sub.href);
                        return (
                            <div key={item.name} className="flex flex-col gap-1">
                                <button
                                    onClick={() => setIsInventoryOpen(!isInventoryOpen)}
                                    className={`group flex w-full items-center justify-between rounded-xl p-3 text-sm font-medium transition-all border ${isChildActive || isInventoryOpen
                                        ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                                        : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`${isChildActive || isInventoryOpen ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                            {item.icon}
                                        </div>
                                        <span className="hidden md:block">{item.name}</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 hidden md:block transition-transform duration-200 ${isInventoryOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {/* Alt Menü Öğeleri */}
                                {isInventoryOpen && (
                                    <div className="hidden md:flex flex-col gap-1 mt-1 animate-in slide-in-from-top-2 fade-in duration-200">
                                        {item.subLinks.map((sub) => {
                                            const isActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className={`flex items-center justify-start gap-3 w-full rounded-xl py-2 px-3 text-[13px] font-medium transition-colors ${isActive
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                                        }`}
                                                >
                                                    <div className="w-5 flex justify-center items-center flex-shrink-0">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-400'}`}></div>
                                                    </div>
                                                    <span className="truncate">{sub.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // Eğer standart bir menü elemanıysa
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href!}
                            className={`group flex h-[48px] grow items-center justify-center gap-3 rounded-xl p-3 text-sm font-medium transition-all md:flex-none md:justify-start md:px-4 border ${isActive
                                ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                                : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <div className={`${isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                {item.icon}
                            </div>
                            <span className="hidden md:block">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}