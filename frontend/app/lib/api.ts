const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://192.168.2.176:5000';

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

export async function getProductByBarcode(barcode: string): Promise<ProductResponseDto | null> {
    const res = await fetch(`${API_BASE_URL}/api/Product/barcode/${encodeURIComponent(barcode)}`);

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Ürün sorgulanırken bir hata oluştu (HTTP ${res.status}).`);
    }

    return res.json();
}
