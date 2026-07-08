export default function DashboardSayfasi() {
  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Stok Yönetim Paneli</h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <h2 className="text-gray-500 text-sm font-semibold tracking-wider">Toplam Ürün Çeşidi</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">124</p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <h2 className="text-gray-500 text-sm font-semibold tracking-wider">Toplam Depo Stoğu</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">3,450</p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
          <h2 className="text-gray-500 text-sm font-semibold tracking-wider">Kritik Stok Uyarıları</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">5</p>
        </div>

      </div>
    </div>
  );
}