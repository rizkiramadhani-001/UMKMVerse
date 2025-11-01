import { Package, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function SupplierDashboard() {
  const stats = [
    {
      title: 'Total Pesanan',
      value: '245',
      change: '+18.2%',
      isPositive: true,
      icon: <ShoppingCart size={24} />
    },
    {
      title: 'Total Revenue',
      value: 'Rp 85.000.000',
      change: '+12%',
      isPositive: true,
      icon: <DollarSign size={24} />
    },
    {
      title: 'Produk Aktif',
      value: '48',
      change: '+5',
      isPositive: true,
      icon: <Package size={24} />
    },
    {
      title: 'UMKM Partner',
      value: '32',
      change: '+8',
      isPositive: true,
      icon: <TrendingUp size={24} />
    }
  ];

  const recentOrders = [
    { umkm: 'Warung Kopi Nusantara', product: 'Biji Kopi Arabica 50kg', amount: 'Rp 5.000.000', status: 'Pending' },
    { umkm: 'Bakery Roti Hangat', product: 'Tepung Terigu 100kg', amount: 'Rp 3.500.000', status: 'Processing' },
    { umkm: 'Tani Organik', product: 'Pupuk Organik 200kg', amount: 'Rp 4.000.000', status: 'Delivered' }
  ];

  const topProducts = [
    { name: 'Biji Kopi Arabica', sold: '450 kg', revenue: 'Rp 45.000.000' },
    { name: 'Tepung Terigu', sold: '1200 kg', revenue: 'Rp 24.000.000' },
    { name: 'Kemasan Plastik', sold: '5000 pcs', revenue: 'Rp 10.000.000' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Supplier</h1>
        <p className="text-gray-600 mt-1">Kelola produk dan pesanan supply untuk UMKM</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <div className="text-orange-600">{stat.icon}</div>
              </div>
              <div className="flex items-center space-x-1 text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pesanan Terbaru</h2>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{order.umkm}</h3>
                    <p className="text-sm text-gray-600 mt-1">{order.product}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{order.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Lihat Semua Pesanan →
          </button>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Produk Terlaris</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Terjual: {product.sold}</p>
                <p className="text-sm font-semibold text-green-600 mt-1">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="py-3 px-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition">
            Tambah Produk
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-orange-300 hover:text-orange-600 transition">
            Kelola Stok
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-orange-300 hover:text-orange-600 transition">
            Lihat Pesanan
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-orange-300 hover:text-orange-600 transition">
            Laporan Penjualan
          </button>
        </div>
      </div>
    </div>
  );
}