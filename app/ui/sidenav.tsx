import Link from 'next/link';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white border-r border-gray-200 shadow-sm">


            <div className="mb-2 flex h-20 items-center justify-center rounded-xl bg-blue-600 p-4 md:h-32">
                <div className="w-full text-center   text-white font-bold text-xl tracking-wide">
                    STOK PANELİ
                </div>
            </div>

            <div className="flex flex-row space-x-2 md:flex-col md:gap-3 py-1 md:space-x-0  flex-grow">

                <Link
                    href="/"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <span className="hidden md:block">Dashboard</span>
                </Link>


                <Link
                    href="/products"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <span className="hidden md:block">Ürün Listesi</span>
                </Link>

                {/* YENİ EKLENEN 4 MODÜL */}
                <Link
                    href="/categories"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <span className="hidden md:block">Kategoriler</span>
                </Link>

                <Link
                    href="/stock-movements"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <span className="hidden md:block">Stok Hareketleri</span>
                </Link>

                <Link
                    href="/suppliers"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <span className="hidden md:block">Tedarikçiler</span>
                </Link>

                <Link
                    href="/reports"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-gray-50 p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors text-gray-700"
                >
                    <span className="hidden md:block">Raporlar</span>
                </Link>
            </div>
        </div>
    );
}