'use client';
import { useState } from 'react';

// Detaylı MVP tasarımı için sahte veriler
const MOCK_SUPPLIERS = [
    { id: 1, companyName: 'Global Kahve Çekirdekleri A.Ş.', contactName: 'Ahmet Yılmaz', phone: '+90 555 123 4567', email: 'ahmet@globalkahve.com', taxOffice: 'Marmara Kurumlar', taxNumber: '1234567890', isActive: true },
    { id: 2, companyName: 'Eko Ambalaj ve Paketleme Ltd. Şti.', contactName: 'Ayşe Demir', phone: '+90 532 987 6543', email: 'satis@ekoambalaj.com', taxOffice: 'Beşiktaş', taxNumber: '9876543210', isActive: true },
    { id: 3, companyName: 'Premium Espresso Makineleri', contactName: 'Can İtalyano', phone: '+90 212 555 8899', email: 'info@premium-espresso.net', taxOffice: 'Şişli', taxNumber: '4561237890', isActive: false }
];

export default function TedarikcilerSayfasi() {
    const [suppliers, setSuppliers] = useState(MOCK_SUPPLIERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Çok detaylı tedarikçi formu
    const [formData, setFormData] = useState({
        companyName: '', contactName: '', phone: '', email: '',
        taxOffice: '', taxNumber: '', address: '', isActive: true
    });

    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const filteredSuppliers = suppliers.filter(sup =>
        sup.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handleSave = () => {
        const newErrors: Record<string, boolean> = {};
        let hasError = false;

        const fieldsToValidate = ['companyName', 'contactName', 'phone', 'taxNumber'];

        fieldsToValidate.forEach(field => {
            if (!formData[field as keyof typeof formData] || String(formData[field as keyof typeof formData]).trim() === '') {
                newErrors[field] = true;
                hasError = true;
            }
        });

        setErrors(newErrors);

        if (hasError) return;

        alert("Tedarikçi başarıyla kaydedildi! (Backend bağlantısı bekleniyor)");
        setIsModalOpen(false);
    };

    const handleEditClick = (supplier: any) => {
        setFormData({ ...supplier, address: supplier.address || '' });
        setErrors({});
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        setFormData({ companyName: '', contactName: '', phone: '', email: '', taxOffice: '', taxNumber: '', address: '', isActive: true });
        setErrors({});
        setIsModalOpen(true);
    };

    const ErrorMessage = () => (
        <div className="flex items-center gap-1.5 mt-1.5 text-rose-500 text-xs font-semibold animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Zorunlu alan
        </div>
    );

    return (
        <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">

            {/* ÜST BAŞLIK - Mavi Temalı */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tedarikçi Yönetimi</h1>
                    <p className="text-slate-500 mt-1 text-sm">Satın alma yaptığınız firmaların iletişim ve ticari bilgilerini yönetin.</p>
                </div>
                <button onClick={handleAddNewClick} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    Yeni Tedarikçi Ekle
                </button>
            </div>

            {/* ARAMA VE FİLTRELEME */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-[28rem]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" placeholder="Firma adı veya yetkili ismine göre ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                </div>
            </div>

            {/* DETAYLI VERİ TABLOSU */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider uppercase">
                            <th className="p-4 pl-6">Durum</th>
                            <th className="p-4">Firma Ünvanı</th>
                            <th className="p-4">Yetkili Kişi</th>
                            <th className="p-4">İletişim Bilgileri</th>
                            <th className="p-4">Vergi No</th>
                            <th className="p-4 pr-6 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {filteredSuppliers.map((sup) => (
                            <tr key={sup.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 pl-6">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${sup.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                                        {sup.isActive ? 'Aktif' : 'Pasif'}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-900 font-bold">{sup.companyName}</td>
                                <td className="p-4 text-slate-600 flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{sup.contactName.charAt(0)}</div>
                                    {sup.contactName}
                                </td>
                                <td className="p-4 text-slate-500">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> {sup.phone}</span>
                                        <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> {sup.email}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-xs text-slate-500 bg-slate-50 rounded px-2 py-1 inline-block mt-2">{sup.taxNumber}</td>
                                <td className="p-4 pr-6 text-right">
                                    <button onClick={() => handleEditClick(sup)} className="text-blue-600 hover:text-blue-800 transition-colors font-semibold">İncele / Düzenle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* DETAYLI TEDARİKÇİ MODALI */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

                        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">Tedarikçi Firma Kartı</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>

                        <div className="p-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* SOL SÜTUN - Kurumsal Bilgiler */}
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-blue-100 pb-2">Kurumsal Bilgiler</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Firma / Şirket Ünvanı *</label>
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm ${errors.companyName ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'}`} placeholder="Örn: X Bilişim San. Tic. A.Ş." />
                                        {errors.companyName && <ErrorMessage />}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Vergi Dairesi</label>
                                            <input type="text" name="taxOffice" value={formData.taxOffice} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="İlçe / Daire" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Vergi No / TCKN *</label>
                                            <input type="number" name="taxNumber" value={formData.taxNumber} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm font-mono ${errors.taxNumber ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'}`} placeholder="10 Haneli VN" />
                                            {errors.taxNumber && <ErrorMessage />}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium resize-none text-slate-700 mb-1">Tam Adres</label>
                                        <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="Fatura adresi..."></textarea>
                                    </div>
                                </div>

                                {/* SAĞ SÜTUN - İletişim Bilgileri */}
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-blue-100 pb-2">İrtibat Bilgileri</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Yetkili Kişi Ad/Soyad *</label>
                                        <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm ${errors.contactName ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'}`} placeholder="Örn: Ayşe Demir" />
                                        {errors.contactName && <ErrorMessage />}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">İrtibat Telefonu *</label>
                                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm ${errors.phone ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'}`} placeholder="+90 5XX..." />
                                            {errors.phone && <ErrorMessage />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta Adresi</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="satis@firma.com" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-900">Çalışma Durumu</label>
                                            <p className="text-xs text-slate-500">Pasife alınan tedarikçilerden sipariş açılamaz.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-sm">İptal Et</button>
                            <button onClick={handleSave} className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 rounded-xl font-medium text-sm">Firma Kaydını Tamamla</button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}