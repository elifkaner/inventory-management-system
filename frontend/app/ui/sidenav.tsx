'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/app/lib/api';
import ThemeToggle from '@/app/ui/theme-toggle';

// Menü yapısını güncelliyoruz: Alt menüsü olanlar için "subLinks" dizisi ekledik.
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
    {
        name: 'Envanter İşlemleri',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        ),
        subLinks: [
            { name: 'Depo Hareketleri', href: '/stock-movements' },
            { name: 'Envanter Miktarı', href: '/inventory-levels' }
        ]
    },
    {
        name: 'Katalog Yönetimi',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        subLinks: [
            { name: 'Kategori Grupları', href: '/categories' },
            { name: 'Markalar', href: '/brands' },
            { name: 'Modeller', href: '/models' }
        ]
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
    },
    {
        name: 'Sistem Günlükleri',
        href: '/audit-logs',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    }
];

export default function SideNav() {
    const pathname = usePathname();
    const router = useRouter();

    // Dropdown menü açık/kapalı durumunu tutacak state
    const [openMenuName, setOpenMenuName] = useState<string | null>(null);

    // Sayfa değiştiğinde açık olan menüyü kapat (Eğer alt sayfasındaysa isChildActive sayesinde otomatik açık kalır)
    useEffect(() => {
        setOpenMenuName(null);
    }, [pathname]);

    // Çıkış Yapma Fonksiyonu
    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('stokpro_refresh_token');
            if (refreshToken) {
                await fetch(`${API_BASE_URL}/api/Auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify({ refreshToken })
                });
            }
        } catch (error) {
            console.error("Logout sırasında sunucu hatası:", error);
        } finally {
            // Frontend tarafında her halükarda tokenları temizleyip yönlendiriyoruz
            localStorage.removeItem('stokpro_token');
            localStorage.removeItem('stokpro_refresh_token');
            router.push('/login');
        }
    };

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
            {/* Logo Alanı */}
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

            {/* Menü Linkleri */}
            <div className="flex flex-row space-x-2 md:flex-col md:gap-2 py-1 md:space-x-0 flex-grow overflow-y-auto">
                {menuItems.map((item) => {
                    // Eğer menünün alt linkleri varsa (Dropdown ise)
                    if (item.subLinks) {
                        const isChildActive = item.subLinks.some(sub => pathname === sub.href);
                        // Alt sayfa aktifse veya menü ismine tıklanarak açılmışsa
                        const isOpen = openMenuName === item.name || (openMenuName === null && isChildActive);

                        return (
                            <div key={item.name} className="flex flex-col gap-1">
                                <button
                                    onClick={() => setOpenMenuName(isOpen ? 'closed' : item.name)}
                                    className={`group flex w-full items-center justify-between rounded-xl p-3 text-sm font-medium transition-all border ${isChildActive
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-sm'
                                        : (isOpen ? 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-transparent' : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200')
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`${isChildActive ? 'text-blue-700' : (isOpen ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600')}`}>
                                            {item.icon}
                                        </div>
                                        <span className="hidden md:block">{item.name}</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 hidden md:block transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isChildActive ? 'text-blue-700' : (isOpen ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600')}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {/* Alt Menü Öğeleri */}
                                {isOpen && (
                                    <div className="hidden md:flex flex-col gap-1 mt-1 animate-in slide-in-from-top-2 fade-in duration-200">
                                        {item.subLinks.map((sub) => {
                                            const isActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className={`flex items-center justify-start gap-3 w-full rounded-xl py-2 px-3 text-[13px] font-medium transition-colors ${isActive
                                                        ? 'bg-blue-600 text-white shadow-md'
                                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
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
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-sm'
                                : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
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

            {/* Tema Değiştir & Çıkış Yap */}
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <ThemeToggle />
                <button
                    onClick={handleLogout}
                    className="group flex h-[48px] w-full items-center justify-center gap-3 rounded-xl p-3 text-sm font-medium text-rose-600 transition-all md:justify-start md:px-4 hover:bg-rose-50 border border-transparent hover:border-rose-100"
                >
                    <svg className="w-5 h-5 text-rose-500 group-hover:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden md:block">Çıkış Yap</span>
                </button>
            </div>
        </div>
    );
}