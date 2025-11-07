// src/pages/umkm/Finance.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from '../../pages/umkm/TransactionForm';
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
  X,
  Edit,
  Trash2,
  Target
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
  ResponsiveContainer
} from 'recharts';

// Configure axios base URL and interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function UMKMFinance() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState(null);

  // State untuk data keuangan
  const [stats, setStats] = useState([]);
  const [revenueExpensesData, setRevenueExpensesData] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [cashFlowData, setCashFlowData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user from getMe API
  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/getMe');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  };

  // Fetch transactions from backend based on user ID
  const fetchTransactions = async (userId) => {
    try {
      const response = await api.get(`/umkm/transactions?umkm_id=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };

  // Calculate ROI (Return on Investment)
  const calculateROI = (transactions) => {
    const totalRevenue = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalInvestment = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    // ROI Formula: ((Revenue - Investment) / Investment) * 100
    if (totalInvestment === 0) return 0;
    
    const roi = ((totalRevenue - totalInvestment) / totalInvestment) * 100;
    return roi;
  };

  // Calculate statistics from transactions
  const calculateStats = (transactions) => {
    const totalRevenue = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const roi = calculateROI(transactions);

    return {
      totalRevenue: { value: totalRevenue, change: 0, isPositive: true },
      totalExpenses: { value: totalExpenses, change: 0, isPositive: false },
      netProfit: { value: netProfit, change: 0, isPositive: netProfit >= 0 },
      profitMargin: { value: profitMargin, change: 0, isPositive: profitMargin >= 0 },
      roi: { value: roi, change: 0, isPositive: roi >= 0 }
    };
  };

  // Calculate revenue and expenses by month
  const calculateRevenueExpenses = (transactions) => {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, revenue: 0, expenses: 0 };
      }
      
      if (t.type === 'income') {
        monthlyData[monthKey].revenue += parseFloat(t.amount);
      } else {
        monthlyData[monthKey].expenses += parseFloat(t.amount);
      }
    });
    
    return Object.values(monthlyData);
  };

  // Calculate expense breakdown by category
  const calculateExpenseBreakdown = (transactions) => {
    const categoryData = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const category = t.category || 'Lainnya';
        categoryData[category] = (categoryData[category] || 0) + parseFloat(t.amount);
      });
    
    return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  };

  // Calculate cash flow
  const calculateCashFlow = (transactions) => {
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    let runningBalance = 0;
    return sortedTransactions.map(t => {
      if (t.type === 'income') {
        runningBalance += parseFloat(t.amount);
      } else {
        runningBalance -= parseFloat(t.amount);
      }
      
      const date = new Date(t.date);
      return {
        date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        amount: runningBalance
      };
    });
  };

  // Fetch and process all financial data
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First, get current user
        const user = await fetchCurrentUser();
        setCurrentUser(user);

        // Then fetch transactions for this user
        const transactions = await fetchTransactions(user.id);

        // Calculate statistics
        const calculatedStats = calculateStats(transactions);
        const statsArray = [
          {
            title: 'Total Revenue',
            value: formatCurrency(calculatedStats.totalRevenue.value),
            change: `+${calculatedStats.totalRevenue.change}%`,
            isPositive: calculatedStats.totalRevenue.isPositive,
            icon: <DollarSign size={24} />,
            color: 'green'
          },
          {
            title: 'Total Expenses',
            value: formatCurrency(calculatedStats.totalExpenses.value),
            change: `+${calculatedStats.totalExpenses.change}%`,
            isPositive: calculatedStats.totalExpenses.isPositive,
            icon: <TrendingDown size={24} />,
            color: 'red'
          },
          {
            title: 'Net Profit',
            value: formatCurrency(calculatedStats.netProfit.value),
            change: `+${calculatedStats.netProfit.change}%`,
            isPositive: calculatedStats.netProfit.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'blue'
          },
          {
            title: 'ROI',
            value: `${calculatedStats.roi.value.toFixed(1)}%`,
            change: `+${calculatedStats.roi.change}%`,
            isPositive: calculatedStats.roi.isPositive,
            icon: <Target size={24} />,
            color: 'purple'
          }
        ];

        setStats(statsArray);
        setRevenueExpensesData(calculateRevenueExpenses(transactions));
        
        // Add colors to expense breakdown
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'];
        const expenseWithColors = calculateExpenseBreakdown(transactions).map((item, index) => ({
          ...item,
          color: colors[index % colors.length]
        }));
        setExpenseBreakdown(expenseWithColors);
        
        setCashFlowData(calculateCashFlow(transactions));
        
        // Get 5 most recent transactions
        const sortedTransactions = [...transactions].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        ).slice(0, 5);
        setRecentTransactions(sortedTransactions);

      } catch (error) {
        console.error('Error fetching finance data:', error);
        setError('Gagal memuat data keuangan. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinanceData();
  }, [selectedPeriod]);

  // Refresh all stats after transaction changes
  const refreshAllStats = async () => {
    // Get current user if not already loaded
    let userId = currentUser?.id;
    if (!userId) {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
      userId = user.id;
    }

    const transactions = await fetchTransactions(userId);
    
    // Recalculate stats
    const calculatedStats = calculateStats(transactions);
    const statsArray = [
      {
        title: 'Total Revenue',
        value: formatCurrency(calculatedStats.totalRevenue.value),
        change: `+${calculatedStats.totalRevenue.change}%`,
        isPositive: calculatedStats.totalRevenue.isPositive,
        icon: <DollarSign size={24} />,
        color: 'green'
      },
      {
        title: 'Total Expenses',
        value: formatCurrency(calculatedStats.totalExpenses.value),
        change: `+${calculatedStats.totalExpenses.change}%`,
        isPositive: calculatedStats.totalExpenses.isPositive,
        icon: <TrendingDown size={24} />,
        color: 'red'
      },
      {
        title: 'Net Profit',
        value: formatCurrency(calculatedStats.netProfit.value),
        change: `+${calculatedStats.netProfit.change}%`,
        isPositive: calculatedStats.netProfit.isPositive,
        icon: <TrendingUp size={24} />,
        color: 'blue'
      },
      {
        title: 'ROI',
        value: `${calculatedStats.roi.value.toFixed(1)}%`,
        change: `+${calculatedStats.roi.change}%`,
        isPositive: calculatedStats.roi.isPositive,
        icon: <Target size={24} />,
        color: 'purple'
      }
    ];
    
    setStats(statsArray);
    setRevenueExpensesData(calculateRevenueExpenses(transactions));
    
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'];
    const expenseWithColors = calculateExpenseBreakdown(transactions).map((item, index) => ({
      ...item,
      color: colors[index % colors.length]
    }));
    setExpenseBreakdown(expenseWithColors);
    setCashFlowData(calculateCashFlow(transactions));
    
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    ).slice(0, 5);
    setRecentTransactions(sortedTransactions);
  };

  // Create Transaction
  const handleCreateTransaction = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post('/umkm/transactions', formData);
      
      if (response.data) {
        await refreshAllStats();
        setShowAddModal(false);
        alert('Transaksi berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      setError(error.response?.data?.message || 'Gagal menambahkan transaksi');
      alert('Gagal menambahkan transaksi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update Transaction
  const handleUpdateTransaction = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.put(`/umkm/transactions/${selectedTransaction.trx_id || selectedTransaction.id}`, formData);
      
      if (response.data) {
        await refreshAllStats();
        setShowEditModal(false);
        setSelectedTransaction(null);
        alert('Transaksi berhasil diupdate!');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      setError(error.response?.data?.message || 'Gagal mengupdate transaksi');
      alert('Gagal mengupdate transaksi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Transaction
  const handleDeleteTransaction = async (transactionId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/umkm/transactions/${transactionId}`);
      await refreshAllStats();
      alert('Transaksi berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setError(error.response?.data?.message || 'Gagal menghapus transaksi');
      alert('Gagal menghapus transaksi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper Functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{payload[0].payload.date}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Amount:</span> {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading && recentTransactions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data keuangan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor dan kelola keuangan bisnis Anda</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="quarter">Kuartal Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                <div className={`text-${stat.color}-600`}>{stat.icon}</div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Revenue vs Expenses</h2>
            <p className="text-sm text-gray-600 mt-1">Perbandingan pendapatan dan pengeluaran</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Expenses</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueExpensesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${value / 1000000}M`} />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}
            />
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

      {/* Expense Breakdown & Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Expense Breakdown</h2>
            <p className="text-sm text-gray-600 mt-1">Distribusi pengeluaran berdasarkan kategori</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
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
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transaksi Terbaru</h2>
            <p className="text-sm text-gray-600 mt-1">{recentTransactions.length} transaksi terakhir</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
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
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx) => (
                <tr key={trx.trx_id || trx.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-semibold text-gray-900">{trx.trx_id || trx.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{trx.description}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {trx.category || 'Lainnya'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{formatDate(trx.date)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-bold text-lg ${
                      trx.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trx.type === 'income' ? '+' : '-'}{formatCurrency(trx.amount)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTransaction(trx);
                          setShowEditModal(true);
                        }}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(trx.trx_id || trx.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada transaksi. Klik "Tambah Transaksi" untuk memulai.
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between z-10">
              <h3 className="text-2xl font-bold text-gray-900">Tambah Transaksi Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <TransactionForm
              mode="create"
              onSubmit={handleCreateTransaction}
              onCancel={() => setShowAddModal(false)}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {showEditModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between z-10">
              <h3 className="text-2xl font-bold text-gray-900">Edit Transaksi</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedTransaction(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <TransactionForm
              mode="edit"
              initialData={selectedTransaction}
              onSubmit={handleUpdateTransaction}
              onCancel={() => {
                setShowEditModal(false);
                setSelectedTransaction(null);
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}