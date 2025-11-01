// src/pages/investor/Portfolio.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Plus,
  AlertCircle,
  Calendar,
  Target
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function InvestorPortfolio() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('all'); // all, 6months, year

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #1: STATE UNTUK PORTFOLIO DATA
  // ========================================
  const [stats, setStats] = useState([]);
  const [portfolioUMKM, setPortfolioUMKM] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [investmentDistribution, setInvestmentDistribution] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #2: FETCH PORTFOLIO DATA
  // ========================================
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);

        // TODO: Replace dengan API call ke backend
        // Endpoint: GET /api/investor/portfolio?period={selectedPeriod}
        // Headers: Authorization: Bearer {token}
        // Response format:
        // {
        //   stats: {
        //     totalInvestment: { value: number, change: number, isPositive: boolean },
        //     totalReturns: { value: number, change: number, isPositive: boolean },
        //     activeInvestments: { value: number, change: number, isPositive: boolean },
        //     averageROI: { value: number, change: number, isPositive: boolean }
        //   },
        //   portfolioUMKM: [
        //     {
        //       id: number,
        //       name: string,
        //       image: string,
        //       category: string,
        //       investmentAmount: number,
        //       investmentDate: string,
        //       currentValue: number,
        //       roi: number,
        //       status: 'active' | 'completed' | 'pending',
        //       profitReceived: number,
        //       nextProfitDate: string
        //     }
        //   ],
        //   performanceData: [
        //     { month: string, value: number, profit: number }
        //   ],
        //   investmentDistribution: [
        //     { category: string, value: number, percentage: number }
        //   ],
        //   recentActivities: [
        //     { 
        //       id: number,
        //       type: 'investment' | 'profit' | 'withdrawal',
        //       description: string,
        //       amount: number,
        //       date: string
        //     }
        //   ]
        // }

        // const response = await fetch(`/api/investor/portfolio?period=${selectedPeriod}`, {
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
            totalInvestment: { value: 450000000, change: 15.5, isPositive: true },
            totalReturns: { value: 83250000, change: 22.3, isPositive: true },
            activeInvestments: { value: 12, change: 2, isPositive: true },
            averageROI: { value: 18.5, change: 3.2, isPositive: true }
          },
          portfolioUMKM: [
            {
              id: 1,
              name: 'Warung Kopi Nusantara',
              image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200',
              category: 'Food & Beverage',
              investmentAmount: 50000000,
              investmentDate: '2024-01-15',
              currentValue: 61250000,
              roi: 22.5,
              status: 'active',
              profitReceived: 11250000,
              nextProfitDate: '2024-11-01'
            },
            {
              id: 2,
              name: 'Tani Organik Sejahtera',
              image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200',
              category: 'Agrikultur',
              investmentAmount: 100000000,
              investmentDate: '2024-02-10',
              currentValue: 120800000,
              roi: 20.8,
              status: 'active',
              profitReceived: 20800000,
              nextProfitDate: '2024-11-05'
            },
            {
              id: 3,
              name: 'Bakery Roti Hangat',
              image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
              category: 'Food & Beverage',
              investmentAmount: 30000000,
              investmentDate: '2024-03-20',
              currentValue: 34560000,
              roi: 15.2,
              status: 'active',
              profitReceived: 4560000,
              nextProfitDate: '2024-10-20'
            },
            {
              id: 4,
              name: 'Laundry Express 24/7',
              image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200',
              category: 'Service',
              investmentAmount: 80000000,
              investmentDate: '2024-04-05',
              currentValue: 90240000,
              roi: 12.8,
              status: 'active',
              profitReceived: 10240000,
              nextProfitDate: '2024-11-05'
            }
          ],
          performanceData: [
            { month: 'Jan', value: 450, profit: 5.2 },
            { month: 'Feb', value: 458, profit: 6.8 },
            { month: 'Mar', value: 465, profit: 8.1 },
            { month: 'Apr', value: 472, profit: 9.5 },
            { month: 'May', value: 485, profit: 11.2 },
            { month: 'Jun', value: 498, profit: 13.8 },
            { month: 'Jul', value: 515, profit: 16.5 }
          ],
          investmentDistribution: [
            { category: 'Food & Beverage', value: 180000000, percentage: 40 },
            { category: 'Agrikultur', value: 135000000, percentage: 30 },
            { category: 'Service', value: 90000000, percentage: 20 },
            { category: 'Lainnya', value: 45000000, percentage: 10 }
          ],
          recentActivities: [
            {
              id: 1,
              type: 'profit',
              description: 'Bagi hasil dari Warung Kopi Nusantara',
              amount: 2500000,
              date: '2024-10-01'
            },
            {
              id: 2,
              type: 'investment',
              description: 'Investasi baru: Laundry Express 24/7',
              amount: 80000000,
              date: '2024-09-28'
            },
            {
              id: 3,
              type: 'profit',
              description: 'Bagi hasil dari Tani Organik Sejahtera',
              amount: 5200000,
              date: '2024-09-25'
            },
            {
              id: 4,
              type: 'withdrawal',
              description: 'Penarikan profit ke rekening',
              amount: 10000000,
              date: '2024-09-20'
            }
          ]
        };

        // Set state dari response
        const statsArray = [
          {
            title: 'Total Investment',
            value: formatCurrency(result.stats.totalInvestment.value),
            change: `+${result.stats.totalInvestment.change}%`,
            isPositive: result.stats.totalInvestment.isPositive,
            icon: <Briefcase size={24} />,
            color: 'blue'
          },
          {
            title: 'Total Returns',
            value: formatCurrency(result.stats.totalReturns.value),
            change: `+${result.stats.totalReturns.change}%`,
            isPositive: result.stats.totalReturns.isPositive,
            icon: <DollarSign size={24} />,
            color: 'green'
          },
          {
            title: 'Active Investments',
            value: result.stats.activeInvestments.value.toString(),
            change: `+${result.stats.activeInvestments.change}`,
            isPositive: result.stats.activeInvestments.isPositive,
            icon: <PieChartIcon size={24} />,
            color: 'purple'
          },
          {
            title: 'Average ROI',
            value: `${result.stats.averageROI.value}%`,
            change: `+${result.stats.averageROI.change}%`,
            isPositive: result.stats.averageROI.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'orange'
          }
        ];

        setStats(statsArray);
        setPortfolioUMKM(result.portfolioUMKM);
        setPerformanceData(result.performanceData);
        setInvestmentDistribution(result.investmentDistribution);
        setRecentActivities(result.recentActivities);
        
        // Calculate total portfolio value
        const totalValue = result.portfolioUMKM.reduce((sum, umkm) => sum + umkm.currentValue, 0);
        setTotalPortfolioValue(totalValue);

      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [selectedPeriod]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      active: 'Active',
      completed: 'Completed',
      pending: 'Pending'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getActivityIcon = (type) => {
    const icons = {
      investment: { icon: <Plus size={16} />, color: 'bg-blue-500' },
      profit: { icon: <TrendingUp size={16} />, color: 'bg-green-500' },
      withdrawal: { icon: <ArrowDownRight size={16} />, color: 'bg-orange-500' }
    };
    return icons[type] || icons.investment;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Value') 
                ? `${entry.value}M` 
                : `${entry.value}M`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #3: EXPORT PORTFOLIO REPORT
  // ========================================
  const handleExportReport = async () => {
    try {
      // TODO: Replace dengan API call
      // Endpoint: GET /api/investor/portfolio/export?period={selectedPeriod}&format=pdf
      // Headers: Authorization: Bearer {token}
      // Response: File download (PDF)
      
      alert('Export portfolio report - integrate with backend');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const handleViewUMKM = (umkmId) => {
    navigate(`/investor-dashboard/umkm/${umkmId}`);
  };

  // Colors for pie chart
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Investment</h1>
          <p className="text-gray-600 mt-1">Monitor dan kelola investasi UMKM Anda</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-2 bg-white rounded-xl border-2 border-gray-200 p-1">
            {[
              { id: 'all', label: 'Semua' },
              { id: '6months', label: '6 Bulan' },
              { id: 'year', label: '1 Tahun' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  selectedPeriod === period.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period.label}
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
        {/* Portfolio Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Portfolio Performance</h2>
              <p className="text-sm text-gray-600 mt-1">Nilai portfolio dan profit bulanan</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                name="Portfolio Value"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={investmentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {investmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {investmentDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-700">{item.category}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio UMKM List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Portfolio UMKM</h2>
            <p className="text-sm text-gray-600 mt-1">{portfolioUMKM.length} investasi aktif</p>
          </div>
          <button 
            onClick={() => navigate('/investor-dashboard/browse')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span>Investasi Baru</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {portfolioUMKM.map((umkm) => (
            <div key={umkm.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition">
              <div className="flex items-start space-x-4">
                <img
                  src={umkm.image}
                  alt={umkm.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{umkm.name}</h3>
                      <p className="text-xs text-gray-500">{umkm.category}</p>
                    </div>
                    {getStatusBadge(umkm.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Investment</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(umkm.investmentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Value</p>
                      <p className="text-sm font-bold text-green-600">{formatCurrency(umkm.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className="text-sm font-bold text-blue-600">{umkm.roi}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Profit Received</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(umkm.profitReceived)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar size={14} />
                      <span>Next: {formatDate(umkm.nextProfitDate)}</span>
                    </div>
                    <button
                      onClick={() => handleViewUMKM(umkm.id)}
                      className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      <Eye size={16} />
                      <span>Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const activityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-10 h-10 ${activityIcon.color} rounded-full flex items-center justify-center text-white`}>
                  {activityIcon.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    activity.type === 'withdrawal' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {activity.type === 'withdrawal' ? '-' : '+'}{formatCurrency(activity.amount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-2">Total Portfolio Value</p>
            <p className="text-3xl font-bold">{formatCurrency(totalPortfolioValue)}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-2">Total Profit Received</p>
            <p className="text-3xl font-bold">
              {formatCurrency(portfolioUMKM.reduce((sum, umkm) => sum + umkm.profitReceived, 0))}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-2">Next Profit Payout</p>
            <div className="flex items-center space-x-2">
              <Calendar size={20} />
              <p className="text-xl font-bold">
                {portfolioUMKM.length > 0 ? formatDate(portfolioUMKM[0].nextProfitDate) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}