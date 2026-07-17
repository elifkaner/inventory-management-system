'use client';
import { useState, useEffect } from 'react';

export default function KategorilerSayfasi() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '' });

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/Category');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Kategoriler yüklenemedi", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return alert("Kategori adı boş olamaz!");

        try {
            const url = formData.id ? `/api/Category/${formData.id}` : '/api/Category';
            const method = formData.id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name })
            });

            if (!res.ok) throw new Error("İşlem başarısız");

            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            alert("Sunucuyla iletişim kurulamadı.");
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) return;

        try {
            const res = await fetch(`/api/Category/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setCategories(prev => prev.filter(c => c.id !== id));
            } else {
                alert("Silme işlemi başarısız oldu.");
            }
        } catch (error) {
            alert("Sunucuyla iletişim kurulamadı.");
        }
    };

    const openModal = (category: any = { id: null, name: '' }) => {
        setFormData(category);
        setIsModalOpen(true);
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Envanter Grupları</h1>
                    <p className="text-slate-500 mt-1 text-sm">Ürün kategorilerinizi yönetin ve düzenleyin.</p>
                </div>
                <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Kategori Ekle
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                            <th className="p-4 pl-6">Kategori Adı</th>
                            <th className="p-4 pr-6 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {isLoading ? (
                            <tr><td colSpan={2} className="p-8 text-center text-slate-500 animate-pulse">Yükleniyor...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={2} className="p-8 text-center text-slate-500">Henüz kategori bulunmuyor.</td></tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6 text-slate-900 font-bold">{cat.name}</td>
                                    <td className="p-4 pr-6 text-right">
                                        <button onClick={() => openModal(cat)} className="text-blue-600 hover:text-blue-800 font-semibold mr-4">Düzenle</button>
                                        <button onClick={() => handleDelete(cat.id, cat.name)} className="text-rose-500 hover:text-rose-700 font-semibold">Sil</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-lg font-bold text-slate-800">{formData.id ? 'Kategori Düzenle' : 'Yeni Kategori'}</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori Adı *</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="Örn: Elektronik" autoFocus />
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-sm">İptal</button>
                            <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 shadow-md rounded-xl font-medium text-sm">Kaydet</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}