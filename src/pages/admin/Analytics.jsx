// ============================================================================
// src/pages/admin/Analytics.jsx
// ============================================================================
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch Analytics Data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch(`/api/admin/analytics?period=${selectedPeriod}`, {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setAnalyticsData(data);

        // Dummy data - hapus setelah integrate
        setTimeout(() => {
          setAnalyticsData({
            summary: {
              totalUsers: 1247,
              userGrowth: 23.5,
              totalUMKM: 456,
              umkmGrowth: 18.2,
              totalTransactions: 8934,
              transactionGrowth: 32.1,
              totalRevenue: 2500000000,
              revenueGrowth: 28.5
            },
            usersByRole: [
              { name: 'UMKM', value: 456, color: '#3B82F6' },
              { name: 'Investor', value: 312, color: '#10B981' },
              { name: 'Supplier', value: 289, color: '#F59E0B' },
              { name: 'Distributor', value: 190, color: '#8B5CF6' }
            ],
            monthlyGrowth: [
              { month: 'Mei', users: 950, umkm: 380, revenue: 1800000000 },
              { month: 'Jun', users: 1020, umkm: 402, revenue: 1950000000 },
              { month: 'Jul', users: 1100, umkm: 425, revenue: 2100000000 },
              { month: 'Agt', users: 1165, umkm: 438, revenue: 2250000000 },
              { month: 'Sep', users: 1210, umkm: 448, revenue: 2400000000 },
              { month: 'Okt', users: 1247, umkm: 456, revenue: 2500000000 }
            ],
            transactionTrend: [
              { month: 'Mei', count: 6200, amount: 1800000000 },
              { month: 'Jun', count: 6850, amount: 1950000000 },
              { month: 'Jul', count: 7420, amount: 2100000000 },
              { month: 'Agt', count: 8100, amount: 2250000000 },
              { month: 'Sep', count: 8520, amount: 2400000000 },
              { month: 'Okt', count: 8934, amount: 2500000000 }
            ],
            topUMKM: [
              { name: 'Warung Kopi Nusantara', revenue: 125000000, growth: 22 },
              { name: 'Tani Organik', revenue: 98000000, growth: 18 },
              { name: 'Bakery Roti Hangat', revenue: 85000000, growth: 15 },
              { name: 'Laundry Express', revenue: 72000000, growth: 12 },
              { name: 'Fashion Store', revenue: 65000000, growth: 10 }
            ]
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  // TODO: Integrate dengan backend - Export Analytics Report
  const handleExportReport = async () => {
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/admin/analytics/export?period=${selectedPeriod}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // 
      // if (response.ok) {
      //   const blob = await response.blob();
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = `analytics-report-${selectedPeriod}-${Date.now()}.pdf`;
      //   document.body.appendChild(a);
      //   a.click();
      //   a.remove();
      // }

      alert('📊 Export report dimulai...');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };
  // ============================================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value > 1000000 ? formatCurrency(entry.value) : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive platform insights and metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white rounded-xl border-2 border-gray-200 p-1">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period === 'week' ? 'Week' : period === 'month' ? 'Month' : period === 'quarter' ? 'Quarter' : 'Year'}
              </button>
            ))}
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold ${
              analyticsData.summary.userGrowth > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.summary.userGrowth > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span>{Math.abs(analyticsData.summary.userGrowth)}%</span>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalUsers.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <Building2 className="text-green-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold text-green-600`}>
              <ArrowUpRight size={16} />
              <span>{analyticsData.summary.umkmGrowth}%</span>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total UMKM</h3>
          <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalUMKM}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <ShoppingCart className="text-purple-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold text-green-600`}>
              <ArrowUpRight size={16} />
              <span>{analyticsData.summary.transactionGrowth}%</span>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Transactions</h3>
          <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalTransactions.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm border-2 border-blue-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <DollarSign className="text-white" size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold text-green-600`}>
              <ArrowUpRight size={16} />
              <span>{analyticsData.summary.revenueGrowth}%</span>
            </div>
          </div>
          <h3 className="text-gray-700 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.summary.totalRevenue)}</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Growth */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.monthlyGrowth}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUMKM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" name="Users" />
              <Area type="monotone" dataKey="umkm" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorUMKM)" name="UMKM" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Role */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Users by Role</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analyticsData.usersByRole}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {analyticsData.usersByRole.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {analyticsData.usersByRole.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction & Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.transactionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#8B5CF6" name="Transactions" radius={[8, 8, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#F59E0B" strokeWidth={3} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top UMKM */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing UMKM</h2>
        <div className="space-y-4">
          {analyticsData.topUMKM.map((umkm, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-500' :
                  'bg-gray-300'
                }`}>
                  #{index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{umkm.name}</p>
                  <p className="text-sm text-gray-600">Revenue: {formatCurrency(umkm.revenue)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center space-x-1 text-sm font-semibold text-green-600">
                  <TrendingUp size={16} />
                  <span>+{umkm.growth}%</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}