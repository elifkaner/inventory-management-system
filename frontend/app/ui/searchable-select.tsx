'use client';
import { useState, useRef, useEffect } from 'react';

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
}

export default function SearchableSelect({
    label,
    name,
    options,
    register,
    setValue,
    watch,
    error,
    errorMessage = "Bu alan zorunludur.",
    placeholder = "Seçiniz..."
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Formdan seçili değeri izle
    const selectedValue = watch(name);
    // Seçili değerin metin karşılığını bul (Ekranda göstermek için)
    const selectedLabel = options.find(opt => String(opt.value) === String(selectedValue))?.label || placeholder;

    // Menü açıkken dışarı tıklanırsa menüyü kapat
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

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            {/* React Hook Form'un veriyi takip etmesi için gizli input */}
            <input type="hidden" {...register(name, { required: true })} />

            {/* Dropdown Tetikleyici (Tıklanan Kutu) */}
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

            {/* Açılır Menü ve Arama Kutusu */}
            {isOpen && (
                <div className="absolute z-[60] w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {/* ARAMA KUTUSU */}
                    <div className="p-2 sticky top-0 bg-white border-b border-slate-100 z-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Tıklayınca menünün kapanmasını engeller
                            />
                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* FİLTRELENMİŞ LİSTE */}
                    <ul className="py-1">
                        <li
                            className="px-3 py-2 hover:bg-emerald-50 cursor-pointer text-sm text-slate-500 italic"
                            onClick={() => {
                                setValue(name, "", { shouldValidate: true });
                                setIsOpen(false);
                                setSearchTerm("");
                            }}
                        >
                            Seçimi Temizle
                        </li>
                        {filteredOptions.map((opt) => (
                            <li
                                key={opt.value}
                                className={`px-3 py-2 hover:bg-emerald-50 cursor-pointer text-sm ${String(selectedValue) === String(opt.value) ? 'bg-emerald-100 text-emerald-700 font-semibold' : 'text-slate-700'}`}
                                onClick={() => {
                                    setValue(name, String(opt.value), { shouldValidate: true });
                                    setIsOpen(false);
                                    setSearchTerm("");
                                }}
                            >
                                {opt.label}
                            </li>
                        ))}
                        {filteredOptions.length === 0 && (
                            <li className="px-3 py-2 text-sm text-slate-500 text-center">Sonuç bulunamadı.</li>
                        )}
                    </ul>
                </div>
            )}

            {/* Hata Mesajı */}
            {error && (
                <div className="flex items-center gap-1.5 mt-1.5 text-rose-500 text-xs font-semibold animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}