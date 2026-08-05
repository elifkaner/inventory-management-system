import React from 'react';

type MovementType = 'IN' | 'OUT' | 'WASTE';

export default function MovementBadge({ type }: { type: MovementType }) {
    switch (type) {
        case 'IN':
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="text-sm font-extrabold mr-1 leading-none">+</span>
                    Giriş
                </span>
            );
        case 'OUT':
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <span className="text-sm font-extrabold mr-1 leading-none">-</span>
                    Çıkış
                </span>
            );
        case 'WASTE':
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-surfaceDark text-slate-700 border border-slate-200">
                    <span className="text-sm font-extrabold mr-1 leading-none">-</span>
                    Fire
                </span>
            );
        default:
            return null;
    }
}
