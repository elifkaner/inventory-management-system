import StockMovementsClient from './stock-movements-client';

export const metadata = {
    title: 'Depo Hareketleri | StokPro',
};

export default function Page() {
    return (
        <div className="p-6 h-full max-w-7xl mx-auto">
            <StockMovementsClient />
        </div>
    );
}