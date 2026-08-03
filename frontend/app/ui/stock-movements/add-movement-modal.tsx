'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SearchableSelect from '../searchable-select';
import { API_BASE_URL, authFetch } from '@/app/lib/api';

interface AddMovementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface MovementFormData {
    type: 'IN' | 'OUT' | 'WASTE';
    productId: string;
    quantity: number;
    description: string;
}

export default function AddMovementModal({ isOpen, onClose, onSuccess }: AddMovementModalProps) {
    const [products, setProducts] = useState<{ value: string; label: string }[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<MovementFormData>({
        defaultValues: {
            type: 'IN',
            productId: '',
            quantity: 1,
            description: ''
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setApiError(null);
            fetchProducts();
        }
    }, [isOpen]);

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const res = await authFetch(`${API_BASE_URL}/api/Product?pageSize=1000`); // Temporarily fetching all for select
            if (res.ok) {
                const data = await res.json();
                // Assuming data is an array or data.items depending on API structure
                const productList = Array.isArray(data) ? data : data.items || [];
                setProducts(productList.map((p: any) => ({
                    value: String(p.id),
                    label: p.productName || 'İsimsiz Ürün'
                })));
            }
        } catch (error) {
            console.error("Ürünler yüklenemedi", error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    if (!isOpen) return null;

    const onSubmit = async (data: MovementFormData) => {
        setIsSubmitting(true);
        setApiError(null);
        try {
            const res = await authFetch(`${API_BASE_URL}/api/StockMovement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: parseInt(data.productId),
                    transactionType: data.type,
                    quantity: data.quantity,
                    description: data.description,
                    transactionAmounth: 0 // Defaulting to 0 since it's required in DTO
                })
            });

            if (res.ok) {
                reset();
                onSuccess();
            } else {
                const errorData = await res.json().catch(() => null);
                setApiError(errorData?.message || errorData?.title || 'Bir hata oluştu. Yetersiz stok veya yanlış işlem.');
            }
        } catch (error) {
            setApiError('Sunucuya ulaşılamıyor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-800">Yeni Stok Hareketi Ekle</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    {apiError && (
                        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
                            {apiError}
                        </div>
                    )}
                    
                    <div className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">İşlem Tipi</label>
                            <select 
                                {...register('type', { required: true })}
                                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                            >
                                <option value="IN">Giriş</option>
                                <option value="OUT">Çıkış</option>
                                <option value="WASTE">Fire</option>
                            </select>
                        </div>

                        <div>
                            <SearchableSelect 
                                label={isLoadingProducts ? "Ürün Seçimi (Yükleniyor...)" : "Ürün Seçimi"}
                                name="productId"
                                options={products}
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                error={!!errors.productId}
                                errorMessage="Lütfen bir ürün seçin."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Miktar</label>
                            <input 
                                type="number" 
                                min="1"
                                step="1"
                                {...register('quantity', { 
                                    required: "Miktar zorunludur", 
                                    min: { value: 1, message: "Miktar en az 1 olmalıdır" },
                                    valueAsNumber: true 
                                })}
                                className={`w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.quantity ? 'border-rose-500 focus:ring-rose-500/20 bg-rose-50/30' : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500'}`}
                                placeholder="Örn: 10"
                                onKeyDown={(e) => {
                                    if (e.key === '.' || e.key === ',') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {errors.quantity && <span className="text-rose-500 text-xs mt-1 block">{errors.quantity.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama (Opsiyonel)</label>
                            <textarea 
                                {...register('description')}
                                rows={3}
                                className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                placeholder="İşlem ile ilgili notlar..."
                            ></textarea>
                        </div>

                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            İptal
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-70 flex items-center justify-center transition-colors"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Kaydediliyor...
                                </>
                            ) : 'Hareketi Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
