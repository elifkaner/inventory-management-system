import React from 'react';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    targetName: string;
    isSubmitting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmDeleteModal({ isOpen, targetName, isSubmitting, onClose, onConfirm }: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[70] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 text-center">
                <p className="text-sm text-slate-600 mb-6 pt-2">
                    <span className="font-bold text-slate-900">{targetName}</span> kaydını silmek istediğinize emin misiniz?
                </p>
                <div className="flex justify-center gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors">Vazgeç</button>
                    <button onClick={onConfirm} disabled={isSubmitting} className="px-5 py-2.5 text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 rounded-xl font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]">
                        {isSubmitting ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : "Sil"}
                    </button>
                </div>
            </div>
        </div>
    );
}