import React from 'react';

export default function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
            {isActive ? 'Aktif' : 'Pasif'}
        </span>
    );
}