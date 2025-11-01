import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function UMKMDashboard() {
  // Dummy data - nanti diganti dengan data dari API
  const stats = [
    {
      title: 'Total Revenue',
      value: 'Rp 125.000.000',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign size={24} />
    },
    {
      title: 'Total Investor',
      value: '24',
      change: '+3',
      isPositive: true,
      icon: <Users size={24} />
    },
    {
      title: 'Pesanan Bulan Ini',
      value: '156',
      change: '+8.2%',
      isPositive: true,
      icon: <ShoppingCart size={24} />
    },
    {
      title: 'Profit Margin',
      value: '24.8%',
      change: '-2.1%',
      isPositive: false,
      icon: <TrendingUp size={24} />
    }
  ];

  const recentActivities = [
    { type: 'investment', text: 'Investor baru: John Doe - Rp 10.000.000', time: '5 menit lalu' },
    { type: 'order', text: 'Pesanan #1234 telah dikonfirmasi', time: '1 jam lalu' },
    { type: 'contract', text: 'Kontrak dengan PT ABC telah ditandatangani', time: '2 jam lalu' },
    { type: 'payment', text: 'Pembayaran Rp 5.000.000 berhasil diterima', time: '3 jam lalu' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard UMKM</h1>
        <p className="text-gray-600 mt-1">Selamat datang kembali! Berikut ringkasan bisnis Anda.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <div className="text-blue-600">{stat.icon}</div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'investment' ? 'bg-green-500' :
                  activity.type === 'order' ? 'bg-blue-500' :
                  activity.type === 'contract' ? 'bg-purple-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Lihat Semua Aktivitas →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              Upload Video Pitch
            </button>
            <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
              Update Profil
            </button>
            <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
              Lihat Investor
            </button>
            <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
              Laporan Keuangan
            </button>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Chart</h2>
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
          Chart akan ditambahkan di sini (pakai Recharts)
        </div>
      </div>
    </div>
  );
}