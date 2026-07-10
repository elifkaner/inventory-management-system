import React from 'react';

export default function ComingSoon({ moduleName }: { moduleName: string }) {
    return (
        <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center font-sans">
            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 max-w-lg w-full text-center border border-slate-100 relative overflow-hidden">

                {/* Arka plan süslemesi */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-slate-100 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-200">
                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{moduleName}</h2>

                    {/* Rozet Kısmı */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        Geliştirme Aşamasında
                    </div>

                    {/* Açıklama Kısmı */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Bu modül henüz oluşturulmadı. Sistemin öncelikli sayfaları tamamlandıktan sonra, bu sayfa da kodlanarak kullanıma açılacaktır.
                    </p>

                    <button onClick={() => window.history.back()} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium text-sm transition-colors shadow-md">
                        Önceki Sayfaya Dön
                    </button>
                </div>
            </div>
        </div>
    );
}