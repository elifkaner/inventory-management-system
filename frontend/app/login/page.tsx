'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../lib/api';

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginSayfasi() {
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Şifre göster/gizle durumu
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setLoginError(null);

            const response = await fetch(API_BASE_URL + '/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('E-posta veya şifre hatalı.');
            }

            const result = await response.json();

            if (result.accessToken) {
                localStorage.setItem('stokpro_token', result.accessToken);
                localStorage.setItem('stokpro_refresh_token', result.refreshToken);
            }

            router.push('/products');
        } catch (error: any) {
            setLoginError(error.message || "Sunucuya bağlanılamadı.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    StokPro'ya Giriş Yap
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Envanter yönetim paneline erişmek için bilgilerinizi girin.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* E-POSTA İNPUTU */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                E-posta Adresi
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "E-posta alanı zorunludur." })}
                                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 text-sm transition-all ${errors.email ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-blue-500/20'}`}
                                placeholder="ornek@sirket.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* ŞİFRE İNPUTU VE GÖSTER/GİZLE İKONU */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-slate-700">
                                    Şifre
                                </label>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); alert("Şifre sıfırlama linki e-posta adresinize gönderilecektir. (Yakında aktif edilecek)"); }}
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Şifremi Unuttum
                                </a>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Şifre alanı zorunludur." })}
                                    className={`w-full p-3 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 text-sm transition-all ${errors.password ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-blue-500/20'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* HATA MESAJI */}
                        {loginError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-600 text-sm font-semibold">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {loginError}
                            </div>
                        )}

                        {/* GİRİŞ BUTONU */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Giriş Yapılıyor...
                                    </span>
                                ) : (
                                    "Sisteme Giriş Yap"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}