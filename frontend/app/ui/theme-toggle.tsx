'use client';

import { useTheme } from '@/app/ui/theme-provider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-slate-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3 text-slate-700 dark:text-slate-300 transition-colors"
        >
            {theme === 'dark' ? (
                <>
                    <SunIcon className="w-6" />
                    <div className="hidden md:block">Aydınlık Mod</div>
                </>
            ) : (
                <>
                    <MoonIcon className="w-6" />
                    <div className="hidden md:block">Karanlık Mod</div>
                </>
            )}
        </button>
    );
}
