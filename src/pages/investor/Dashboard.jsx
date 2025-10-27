import { TrendingUp, Briefcase, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function InvestorDashboard() {
  const stats = [
    {
      title: 'Total Portfolio',
      value: 'Rp 500.000.000',
      change: '+15.3%',
      isPositive: true,
      icon: <Briefcase size={24} />
    },
    {
      title: 'Total Investment',
      value: 'Rp 450.000.000',
      change: '+8',
      isPositive: true,
      icon: <DollarSign size={24} />
    },
    {
      title: 'Active UMKM',
      value: '12',
      change: '+2',
      isPositive: true,
      icon: <PieChart size={24} />
    },
    {
      title: 'Average ROI',
      value: '18.5%',
      change: '+3.2%',
      isPositive: true,
      icon: <TrendingUp size={24} />
    }
  ];

  const portfolioUMKM = [
    { name: 'Warung Kopi Nusantara', invested: 'Rp 50.000.000', roi: '22%', status: 'Profitable' },
    { name: 'Tani Organik Sejahtera', invested: 'Rp 100.000.000', roi: '18%', status: 'Profitable' },
    { name: 'Bakery Roti Hangat', invested: 'Rp 30.000.000', roi: '15%', status: 'Profitable' },
    { name: 'Laundry Express 24/7', invested: 'Rp 80.000.000', roi: '12%', status: 'Growing' }
  ];

  const recentActivities = [
    { type: 'investment', text: 'Investasi baru: Warung Kopi Nusantara - Rp 50.000.000', time: '2 jam lalu' },
    { type: 'profit', text: 'Bagi hasil diterima: Rp 5.000.000 dari 3 UMKM', time: '1 hari lalu' },
    { type: 'contract', text: 'Kontrak investasi dengan Bakery Roti Hangat ditandatangani', time: '2 hari lalu' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Investor</h1>
        <p className="text-gray-600 mt-1">Kelola portfolio investasi UMKM Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <div className="text-green-600">{stat.icon}</div>
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
        {/* Portfolio UMKM */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio UMKM</h2>
          <div className="space-y-3">
            {portfolioUMKM.map((umkm, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{umkm.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Investasi: {umkm.invested}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{umkm.roi}</div>
                    <span className="text-xs text-gray-500">{umkm.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Lihat Semua Portfolio →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
              Browse UMKM
            </button>
            <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-green-300 hover:text-green-600 transition">
              Lihat Portfolio
            </button>
            <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-green-300 hover:text-green-600 transition">
              Tarik Profit
            </button>
            <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-green-300 hover:text-green-600 transition">
              Laporan ROI
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'investment' ? 'bg-blue-500' :
                activity.type === 'profit' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}