export default function SuppliersPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tedarikçiler</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4">Firma Adı</th>
                            <th className="p-4">Yetkili</th>
                            <th className="p-4">Telefon</th>
                            <th className="p-4">E-posta</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-800">Özkan Kırtasiye</td>
                            <td className="p-4 text-gray-600">Ahmet Özkan</td>
                            <td className="p-4 text-gray-600">0555 123 45 67</td>
                            <td className="p-4 text-blue-600">ahmet@ozkan.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}