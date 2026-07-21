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

// 1. TOKEN'I VE NGROK HEADER'INI OTOMATİK EKLEYEN YARDIMCI FONKSİYON
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('stokpro_token');

    const headers = {
        ...options.headers,
        'ngrok-skip-browser-warning': 'true', // Ngrok engelini aşan satır
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return fetch(url, { ...options, headers });
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