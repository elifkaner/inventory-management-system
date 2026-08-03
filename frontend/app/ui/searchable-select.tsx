'use client';
import { useState, useRef, useEffect } from 'react';
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
}

export default function SearchableSelect({
    label, name, options, register, setValue, watch, error,
    errorMessage = "Bu alan zorunludur.", placeholder = "Seçiniz...", direction = 'down', hideSearch = false
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedValue = watch(name);

    const selectedOption = options.find(opt => String(opt.value) === String(selectedValue));
    const selectedLabel = selectedOption ? selectedOption.label : placeholder;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Performans iyileştirmesi: DOM'a aynı anda en fazla 100 öğe basıyoruz.
    // Kullanıcı zaten geri kalanını arama çubuğu ile bulacaktır.
    const visibleOptions = filteredOptions.slice(0, 100);

    return (
        <div ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input type="hidden" {...register(name, { required: true })} />

            <div className="relative">
                <div
                    className={`w-full p-2.5 border rounded-lg bg-white cursor-pointer flex justify-between items-center ${error ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={selectedValue ? 'text-slate-900 text-sm' : 'text-slate-500 text-sm'}>
                        {selectedLabel}
                    </span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isOpen && (
                    <div className={`absolute z-[60] w-full bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto flex flex-col ${direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'}`}>
                        {!hideSearch && (
                            <div className="p-2 sticky top-0 bg-white border-b border-slate-100 z-10">
                                <div className="relative">
                                    <input
                                        type="text" placeholder="Ara..."
                                        className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        )}
                        <ul className="py-1">
                            <li className="px-3 py-2 hover:bg-emerald-50 cursor-pointer text-sm text-slate-500 italic"
                                onClick={() => { setValue(name, "", { shouldValidate: true }); setIsOpen(false); setSearchTerm(""); }}>
                                Seçimi Temizle
                            </li>

                            {visibleOptions.map((opt) => (
                                <li key={opt.value} className={`px-3 py-2 hover:bg-emerald-50 cursor-pointer text-sm ${String(selectedValue) === String(opt.value) ? 'bg-emerald-100 text-emerald-700 font-semibold' : 'text-slate-700'}`}
                                    onClick={() => { setValue(name, String(opt.value), { shouldValidate: true }); setIsOpen(false); setSearchTerm(""); }}>
                                    {opt.label}
                                </li>
                            ))}
                            {visibleOptions.length === 0 && (
                                <li className="px-3 py-2 text-sm text-slate-500 text-center">Sonuç bulunamadı.</li>
                            )}
                            {filteredOptions.length > 100 && (
                                <li className="px-3 py-2 text-xs text-slate-400 text-center italic border-t border-slate-100">
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