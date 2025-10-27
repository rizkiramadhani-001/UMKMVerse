// src/pages/umkm/Finance.jsx
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart as PieChartIcon,
  Download,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function UMKMFinance() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #1: STATE UNTUK DATA KEUANGAN
  // ========================================
  // Data ini akan di-fetch dari backend
  const [stats, setStats] = useState([]);
  const [revenueExpensesData, setRevenueExpensesData] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [cashFlowData, setCashFlowData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #2: FETCH DATA KEUANGAN
  // ========================================
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setIsLoading(true);

        // TODO: Replace dengan API call ke backend
        // Endpoint: GET /api/umkm/finance?period={selectedPeriod}
        // Headers: Authorization: Bearer {token}
        // Response format:
        // {
        //   stats: {
        //     totalRevenue: { value: number, change: number, isPositive: boolean },
        //     totalExpenses: { value: number, change: number, isPositive: boolean },
        //     netProfit: { value: number, change: number, isPositive: boolean },
        //     profitMargin: { value: number, change: number, isPositive: boolean }
        //   },
        //   revenueExpenses: [
        //     { month: string, revenue: number, expenses: number }
        //   ],
        //   expenseBreakdown: [
        //     { name: string, value: number }
        //   ],
        //   cashFlow: [
        //     { date: string, amount: number }
        //   ],
        //   transactions: [
        //     { 
        //       id: string, 
        //       type: 'income' | 'expense',
        //       description: string,
        //       amount: number,
        //       date: string,
        //       category: string
        //     }
        //   ]
        // }

        // const response = await fetch(`/api/umkm/finance?period=${selectedPeriod}`, {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const result = await response.json();

        // Simulasi response dari backend
        const result = {
          stats: {
            totalRevenue: { value: 125000000, change: 12.5, isPositive: true },
            totalExpenses: { value: 78500000, change: 8.2, isPositive: false },
            netProfit: { value: 46500000, change: 18.7, isPositive: true },
            profitMargin: { value: 37.2, change: 2.1, isPositive: true }
          },
          revenueExpenses: [
            { month: 'Jan', revenue: 85000000, expenses: 65000000 },
            { month: 'Feb', revenue: 92000000, expenses: 68000000 },
            { month: 'Mar', revenue: 88000000, expenses: 70000000 },
            { month: 'Apr', revenue: 98000000, expenses: 72000000 },
            { month: 'May', revenue: 105000000, expenses: 75000000 },
            { month: 'Jun', revenue: 112000000, expenses: 78000000 },
            { month: 'Jul', revenue: 125000000, expenses: 78500000 }
          ],
          expenseBreakdown: [
            { name: 'Bahan Baku', value: 35000000 },
            { name: 'Gaji Karyawan', value: 25000000 },
            { name: 'Operasional', value: 12000000 },
            { name: 'Marketing', value: 4500000 },
            { name: 'Lainnya', value: 2000000 }
          ],
          cashFlow: [
            { date: '1 Jul', amount: 15000000 },
            { date: '5 Jul', amount: 22000000 },
            { date: '10 Jul', amount: 18000000 },
            { date: '15 Jul', amount: 28000000 },
            { date: '20 Jul', amount: 32000000 },
            { date: '25 Jul', amount: 38000000 },
            { date: '30 Jul', amount: 46500000 }
          ],
          transactions: [
            {
              id: 'TRX-001',
              type: 'income',
              description: 'Penjualan Produk - Batch #45',
              amount: 5500000,
              date: '30 Jul 2024',
              category: 'Revenue'
            },
            {
              id: 'TRX-002',
              type: 'expense',
              description: 'Pembelian Bahan Baku',
              amount: 3200000,
              date: '29 Jul 2024',
              category: 'Bahan Baku'
            },
            {
              id: 'TRX-003',
              type: 'income',
              description: 'Investasi dari John Doe',
              amount: 10000000,
              date: '28 Jul 2024',
              category: 'Investment'
            },
            {
              id: 'TRX-004',
              type: 'expense',
              description: 'Gaji Karyawan Bulan Juli',
              amount: 8500000,
              date: '27 Jul 2024',
              category: 'Gaji'
            },
            {
              id: 'TRX-005',
              type: 'income',
              description: 'Penjualan Produk - Batch #44',
              amount: 4800000,
              date: '26 Jul 2024',
              category: 'Revenue'
            }
          ]
        };

        // Set state dari response
        const statsArray = [
          {
            title: 'Total Revenue',
            value: formatCurrency(result.stats.totalRevenue.value),
            change: `+${result.stats.totalRevenue.change}%`,
            isPositive: result.stats.totalRevenue.isPositive,
            icon: <DollarSign size={24} />,
            color: 'green'
          },
          {
            title: 'Total Expenses',
            value: formatCurrency(result.stats.totalExpenses.value),
            change: `+${result.stats.totalExpenses.change}%`,
            isPositive: result.stats.totalExpenses.isPositive,
            icon: <TrendingDown size={24} />,
            color: 'red'
          },
          {
            title: 'Net Profit',
            value: formatCurrency(result.stats.netProfit.value),
            change: `+${result.stats.netProfit.change}%`,
            isPositive: result.stats.netProfit.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'blue'
          },
          {
            title: 'Profit Margin',
            value: `${result.stats.profitMargin.value}%`,
            change: `+${result.stats.profitMargin.change}%`,
            isPositive: result.stats.profitMargin.isPositive,
            icon: <PieChartIcon size={24} />,
            color: 'purple'
          }
        ];

        setStats(statsArray);
        setRevenueExpensesData(result.revenueExpenses);
        
        // Add colors to expense breakdown
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'];
        const expenseWithColors = result.expenseBreakdown.map((item, index) => ({
          ...item,
          color: colors[index % colors.length]
        }));
        setExpenseBreakdown(expenseWithColors);
        
        setCashFlowData(result.cashFlow);
        setRecentTransactions(result.transactions);

      } catch (error) {
        console.error('Error fetching finance data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinanceData();
  }, [selectedPeriod]); // Re-fetch saat period berubah

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-50 text-green-600',
      red: 'bg-red-50 text-red-600',
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #3: EXPORT REPORT
  // ========================================
  const handleExportReport = async () => {
    try {
      // TODO: Replace dengan API call
      // Endpoint: GET /api/umkm/finance/export?period={selectedPeriod}&format=pdf
      // Headers: Authorization: Bearer {token}
      // Response: File download (PDF/Excel)
      
      // const response = await fetch(`/api/umkm/finance/export?period=${selectedPeriod}&format=pdf`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `finance-report-${selectedPeriod}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      
      alert('Export report feature - integrate with backend');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data keuangan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Keuangan</h1>
          <p className="text-gray-600 mt-1">Monitor kesehatan finansial bisnis Anda secara real-time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-2 bg-white rounded-xl border-2 border-gray-200 p-1">
            {['month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period === 'month' ? 'Bulan Ini' : period === 'quarter' ? 'Kuartal' : 'Tahun'}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleExportReport}
            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                {stat.icon}
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

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue vs Expenses</h2>
              <p className="text-sm text-gray-600 mt-1">Perbandingan pendapatan dan pengeluaran</p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueExpensesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Breakdown Pengeluaran</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {expenseBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cash Flow</h2>
            <p className="text-sm text-gray-600 mt-1">Aliran kas bersih periode ini</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Saldo Akhir</p>
            <p className="text-2xl font-bold text-green-600">
              {cashFlowData.length > 0 ? formatCurrency(cashFlowData[cashFlowData.length - 1].amount) : 'Rp 0'}
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${value / 1000000}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transaksi Terbaru</h2>
            <p className="text-sm text-gray-600 mt-1">{recentTransactions.length} transaksi terakhir</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            <Plus size={20} />
            <span>Tambah Transaksi</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Deskripsi</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Kategori</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Tanggal</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-semibold text-gray-900">{trx.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{trx.description}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {trx.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{trx.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-bold text-lg ${
                      trx.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trx.type === 'income' ? '+' : '-'}{formatCurrency(trx.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
          Lihat Semua Transaksi →
        </button>
      </div>
    </div>
  );
}   