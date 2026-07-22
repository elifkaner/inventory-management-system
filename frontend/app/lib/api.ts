export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost';

export type ProductResponseDto = {
    id: number;
    productName: string;
    purchasePrice: number;
    salePrice: number;
    barcode: string;
    stockQuantity: number;
    brandId: number;
    isActive: boolean;
    supplier: string;
    category: string;
};
// 1. TOKEN'I, NGROK HEADER'INI VE REFRESH TOKEN MANTIĞINI İÇEREN YARDIMCI FONKSİYON
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    let token = localStorage.getItem('stokpro_token');

    const getHeaders = (currentToken: string | null) => ({
        ...options.headers,
        'ngrok-skip-browser-warning': 'true', // Ngrok engelini aşan satır
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
    });

    // İlk denemeyi mevcut token ile yapıyoruz
    let response = await fetch(url, { ...options, headers: getHeaders(token) });

    // Eğer Token süresi dolmuşsa (401 dönerse) araya giriyoruz
    if (response.status === 401) {
        const refreshToken = localStorage.getItem('stokpro_refresh_token');

        if (refreshToken) {
            try {
                // Backend'den yeni token istiyoruz
                const refreshRes = await fetch(`${API_BASE_URL}/api/Auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify({ refreshToken: refreshToken })
                });

                if (refreshRes.ok) {
                    const newTokens = await refreshRes.json();

                    // Yeni gelen token'ları kaydediyoruz
                    localStorage.setItem('stokpro_token', newTokens.accessToken);
                    localStorage.setItem('stokpro_refresh_token', newTokens.refreshToken);

                    // Başarısız olan asıl isteğimizi yeni token ile tekrar ediyoruz
                    response = await fetch(url, { ...options, headers: getHeaders(newTokens.accessToken) });
                } else {
                    throw new Error("Oturum yenilenemedi");
                }
            } catch (error) {
                // Refresh işlemi başarısız olursa temizleyip login'e atıyoruz
                localStorage.removeItem('stokpro_token');
                localStorage.removeItem('stokpro_refresh_token');
                window.location.href = '/login';
            }
        } else {
            localStorage.removeItem('stokpro_token');
            window.location.href = '/login';
        }
    }

    return response;
}
// 2. BARKOD FONKSİYONU
export async function getProductByBarcode(barcode: string): Promise<ProductResponseDto | null> {
    const res = await authFetch(`${API_BASE_URL}/api/Product/barcode/${encodeURIComponent(barcode)}`);

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Ürün sorgulanırken bir hata oluştu (HTTP ${res.status}).`);
    }

    return res.json();
}