import { Truck, Package, MapPin, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function DistributorDashboard() {
  const stats = [
    {
      title: 'Total Pengiriman',
      value: '342',
      change: '+22%',
      isPositive: true,
      icon: <Truck size={24} />
    },
    {
      title: 'Dalam Pengiriman',
      value: '48',
      change: '+12',
      isPositive: true,
      icon: <Package size={24} />
    },
    {
      title: 'Area Cakupan',
      value: '15 Kota',
      change: '+3',
      isPositive: true,
      icon: <MapPin size={24} />
    },
    {
      title: 'Revenue',
      value: 'Rp 95.000.000',
      change: '+18%',
      isPositive: true,
      icon: <TrendingUp size={24} />
    }
  ];

  const activeDeliveries = [
    { 
      order: '#DIS-1234', 
      umkm: 'Warung Kopi Nusantara', 
      destination: 'Jakarta Selatan', 
      status: 'In Transit',
      eta: '2 jam'
    },
    { 
      order: '#DIS-1235', 
      umkm: 'Bakery Roti Hangat', 
      destination: 'Bandung', 
      status: 'Pickup', 
      eta: '1 hari'
    },
    { 
      order: '#DIS-1236', 
      umkm: 'Tani Organik', 
      destination: 'Surabaya', 
      status: 'In Transit', 
      eta: '4 jam'
    }
  ];

  const recentDeliveries = [
    { order: '#DIS-1230', umkm: 'Laundry Express', delivered: '1 jam lalu', rating: 5 },
    { order: '#DIS-1229', umkm: 'Service AC Pro', delivered: '3 jam lalu', rating: 5 },
    { order: '#DIS-1228', umkm: 'Hidroponik Farm', delivered: '5 jam lalu', rating: 4 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Distributor</h1>
        <p className="text-gray-600 mt-1">Kelola pengiriman dan distribusi produk UMKM</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <div className="text-purple-600">{stat.icon}</div>
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
        {/* Active Deliveries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pengiriman Aktif</h2>
          <div className="space-y-3">
            {activeDeliveries.map((delivery, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-semibold text-gray-900">{delivery.order}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        delivery.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {delivery.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{delivery.umkm}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{delivery.destination}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">ETA: {delivery.eta}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Lihat Semua Pengiriman →
          </button>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Terkirim Hari Ini</h2>
          <div className="space-y-4">
            {recentDeliveries.map((delivery, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-sm font-semibold text-gray-900">{delivery.order}</p>
                    <p className="text-sm text-gray-600 mt-1">{delivery.umkm}</p>
                    <p className="text-xs text-gray-500 mt-1">{delivery.delivered}</p>
                  </div>
                  <div className="text-yellow-500 text-sm">
                    {'⭐'.repeat(delivery.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="py-3 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition">
            Tracking Real-time
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-purple-300 hover:text-purple-600 transition">
            Lihat Pesanan
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-purple-300 hover:text-purple-600 transition">
            Update Status
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-purple-300 hover:text-purple-600 transition">
            Laporan Pengiriman
          </button>
        </div>
      </div>
    </div>
  );
}