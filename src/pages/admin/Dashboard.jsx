// src/pages/admin/Dashboard.jsx
import { Users, Building2, TrendingUp, UserCheck, Activity, DollarSign, ArrowUpRight, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+23.5%',
      isPositive: true,
      icon: <Users size={24} />,
      color: 'blue'
    },
    {
      title: 'Total UMKM',
      value: '456',
      change: '+18.2%',
      isPositive: true,
      icon: <Building2 size={24} />,
      color: 'green'
    },
    {
      title: 'Total Transaksi',
      value: 'Rp 2.5M',
      change: '+32.1%',
      isPositive: true,
      icon: <DollarSign size={24} />,
      color: 'purple'
    },
    {
      title: 'Pending Verification',
      value: '24',
      change: '+5',
      isPositive: false,
      icon: <UserCheck size={24} />,
      color: 'orange'
    }
  ];

  const usersByRole = [
    { role: 'UMKM Owner', count: 456, percentage: 36.6, color: 'bg-blue-500' },
    { role: 'Investor', count: 312, percentage: 25.0, color: 'bg-green-500' },
    { role: 'Supplier', count: 289, percentage: 23.2, color: 'bg-orange-500' },
    { role: 'Distributor', count: 190, percentage: 15.2, color: 'bg-purple-500' }
  ];

  const pendingVerifications = [
    { name: 'Warung Kopi Nusantara', type: 'UMKM', submittedAt: '2 jam lalu', status: 'pending' },
    { name: 'PT Investasi Maju', type: 'Investor', submittedAt: '5 jam lalu', status: 'pending' },
    { name: 'CV Supplier Bahan Baku', type: 'Supplier', submittedAt: '1 hari lalu', status: 'pending' },
    { name: 'PT Distribusi Express', type: 'Distributor', submittedAt: '1 hari lalu', status: 'pending' }
  ];

  const recentActivities = [
    { type: 'registration', text: 'User baru terdaftar: John Doe (Investor)', time: '10 menit lalu' },
    { type: 'verification', text: 'UMKM "Bakery Roti Hangat" telah diverifikasi', time: '1 jam lalu' },
    { type: 'transaction', text: 'Transaksi investasi: Rp 50.000.000', time: '2 jam lalu' },
    { type: 'report', text: 'Laporan masalah dari user #1234', time: '3 jam lalu' }
  ];

  const platformHealth = [
    { metric: 'Uptime', value: '99.9%', status: 'excellent' },
    { metric: 'Active Sessions', value: '342', status: 'good' },
    { metric: 'Response Time', value: '125ms', status: 'excellent' },
    { metric: 'Error Rate', value: '0.02%', status: 'excellent' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview platform UMKMVerse</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-orange-600'}`}>
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
        {/* Users by Role */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Users by Role</h2>
          <div className="space-y-4">
            {usersByRole.map((user, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${user.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{user.role}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{user.count} users</span>
                    <span className="text-sm font-semibold text-gray-900">{user.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${user.color} h-2 rounded-full transition-all`} style={{ width: `${user.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">Total Registered Users</span>
              <span className="text-2xl font-bold text-blue-600">1,247</span>
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Health</h2>
          <div className="space-y-4">
            {platformHealth.map((health, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{health.metric}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{health.value}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${health.status === 'excellent' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Activity size={16} />
              <span className="font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Verifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pending Verifications</h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
              {pendingVerifications.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingVerifications.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.submittedAt}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Lihat Semua Verifikasi →
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'registration' ? 'bg-blue-500' :
                  activity.type === 'verification' ? 'bg-green-500' :
                  activity.type === 'transaction' ? 'bg-purple-500' :
                  'bg-red-500'
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
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Verifikasi UMKM
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
            Kelola Users
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
            Monitoring Transaksi
          </button>
          <button className="py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
            Platform Analytics
          </button>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-yellow-600 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">System Maintenance Scheduled</h3>
            <p className="text-sm text-gray-700">
              Platform maintenance dijadwalkan pada Minggu, 27 Oktober 2025 pukul 02:00 - 04:00 WIB. 
              Semua layanan akan tidak dapat diakses sementara.
            </p>
            <button className="mt-3 text-sm font-medium text-yellow-700 hover:text-yellow-800">
              Lihat Detail →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}