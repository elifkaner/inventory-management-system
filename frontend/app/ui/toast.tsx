import React, { useEffect } from 'react';

interface ToastProps {
    isOpen: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

export default function Toast({ isOpen, message, type, onClose }: ToastProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isSuccess = type === 'success';

    return (
        <div className="fixed top-4 right-4 z-[70] flex items-center p-4 text-sm rounded-lg shadow-lg bg-white border-l-4 transition-all animate-in slide-in-from-top-2" style={{ borderLeftColor: isSuccess ? '#10b981' : '#f43f5e' }}>
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${isSuccess ? 'text-emerald-500 bg-emerald-100' : 'text-rose-500 bg-rose-100'}`}>
                {isSuccess ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
            </div>
            <div className="ms-3 font-medium text-slate-700 mr-4">{message}</div>
            <button onClick={onClose} className="ms-auto -mx-1.5 -my-1.5 bg-white text-slate-400 hover:text-slate-900 rounded-lg focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex items-center justify-center h-8 w-8">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    );
}