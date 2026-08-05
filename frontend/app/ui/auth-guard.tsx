'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Tarayıcı yüklendiği an localStorage'a bakıyoruz
        const token = localStorage.getItem('stokpro_token');

        if (!token) {
            // Token yoksa içeriği hiç göstermeden login'e yolluyoruz
            router.push('/login');
        } else {
            // Token varsa içeriğin görünmesine izin veriyoruz
            setIsChecking(false);
        }
    }, [router]);

    if (isChecking) {
        // Kontrol sürerken kullanıcıya dashboard'u göstermiyoruz, loading gösteriyoruz
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <svg className="animate-spin h-10 w-10 text-brand-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-500 font-medium tracking-wide">Oturum kontrol ediliyor...</p>
            </div>
        );
    }

    // Güvenlikten geçtiyse asıl sayfayı render et
    return <>{children}</>;
}