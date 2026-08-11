'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Option {
    value: string | number;
    label: string;
}

interface SearchableSelectProps {
    label: string;
    name: string;
    options: Option[];
    register: any;
    setValue: any;
    watch: any;
    error?: boolean;
    errorMessage?: string;
    placeholder?: string;
    direction?: 'up' | 'down';
    hideSearch?: boolean;
    allowCustom?: boolean;
    disabled?: boolean;
}

export default function SearchableSelect({
    label, name, options, register, setValue, watch, error,
    errorMessage = "Bu alan zorunludur.", placeholder = "Seçiniz...", direction = 'down', hideSearch = false, allowCustom = false, disabled = false
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedValue = watch(name);

    // Performans İyileştirmesi 1: options dizisinden seçili olanı bulurken useMemo kullanıyoruz
    const selectedOption = useMemo(() => {
        return options.find(opt => String(opt.value) === String(selectedValue));
    }, [options, selectedValue]);

    const selectedLabel = selectedOption ? selectedOption.label : (selectedValue || placeholder);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Performans İyileştirmesi 2: Arama (filtreleme) işlemini useMemo ile önbelleğe alıyoruz.
    const visibleOptions = useMemo(() => {
        if (!searchTerm) {
            return options.slice(0, 100);
        }
        
        const searchLower = searchTerm.toLowerCase();
        const filtered = options.filter(opt =>
            opt.label.toLowerCase().includes(searchLower)
        );
        
        return filtered.slice(0, 100);
    }, [options, searchTerm]);

    return (
        <div ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
            <input type="hidden" {...register(name, { required: true })} />

            <div className={`relative ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <div
                    className={`w-full p-2.5 border rounded-lg ${disabled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-white dark:bg-slate-900 cursor-pointer'} flex justify-between items-center ${error ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-600'}`}
                    onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
                >
                    <span className={selectedValue ? 'text-slate-900 dark:text-slate-100 text-sm font-medium' : 'text-slate-500 dark:text-slate-400 text-sm'}>
                        {selectedLabel}
                    </span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isOpen && (
                    <div className={`absolute z-[100] w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'}`}>
                        {!hideSearch && (
                            <div className="p-2 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                                <div className="relative">
                                    <input
                                        type="text" placeholder="Ara veya yeni yaz..."
                                        className="w-full pl-3 pr-9 py-2 border border-slate-200 dark:border-slate-600 rounded-md text-sm bg-brand-surface dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        )}
                        <ul className="py-1 max-h-64 overflow-y-auto">
                            <li className="px-3 py-2 hover:bg-brand-surface dark:hover:bg-slate-700 cursor-pointer text-sm text-slate-500 dark:text-slate-400 italic"
                                onClick={() => { setValue(name, "", { shouldValidate: true }); setIsOpen(false); setSearchTerm(""); }}>
                                Seçimi Temizle
                            </li>

                            {visibleOptions.map((opt) => (
                                <li key={opt.value} className={`px-3 py-2 hover:bg-brand-surface dark:hover:bg-slate-700 cursor-pointer text-sm ${String(selectedValue) === String(opt.value) ? 'bg-brand-surfaceDark dark:bg-slate-700 text-brand-primary dark:text-brand-primary font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
                                    onClick={() => { setValue(name, String(opt.value), { shouldValidate: true }); setIsOpen(false); setSearchTerm(""); }}>
                                    {opt.label}
                                </li>
                            ))}

                            {allowCustom && searchTerm.trim() !== "" && !options.some(o => o.label.toLowerCase() === searchTerm.trim().toLowerCase()) && (
                                <li className="px-3 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 cursor-pointer text-sm text-emerald-600 dark:text-emerald-400 font-semibold border-t border-slate-100 dark:border-slate-700 flex items-center gap-1.5"
                                    onClick={() => { setValue(name, searchTerm.trim(), { shouldValidate: true }); setIsOpen(false); setSearchTerm(""); }}>
                                    <span>+</span>
                                    <span>&quot;{searchTerm.trim()}&quot; Yeni Personel Olarak Ekle</span>
                                </li>
                            )}

                            {visibleOptions.length === 0 && !allowCustom && (
                                <li className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 text-center">Sonuç bulunamadı.</li>
                            )}
                            {options.length > 100 && visibleOptions.length === 100 && (
                                <li className="px-3 py-2 text-xs text-slate-400 dark:text-slate-500 text-center italic border-t border-slate-100 dark:border-slate-700">
                                    Daha fazla sonuç var, lütfen arama yapın...
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center gap-1.5 mt-1.5 text-rose-500 text-xs font-semibold animate-pulse">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}