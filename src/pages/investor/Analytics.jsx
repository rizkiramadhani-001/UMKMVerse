// src/pages/investor/Analytics.jsx
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

export default function InvestorAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [isLoading, setIsLoading] = useState(true);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #1: STATE UNTUK ANALYTICS DATA
  // ========================================
  const [stats, setStats] = useState([]);
  const [portfolioPerformance, setPortfolioPerformance] = useState([]);
  const [roiByCategory, setRoiByCategory] = useState([]);
  const [investmentVsReturns, setInvestmentVsReturns] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [bestPerformers, setBestPerformers] = useState([]);
  const [worstPerformers, setWorstPerformers] = useState([]);
  const [portfolioAllocation, setPortfolioAllocation] = useState([]);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #2: FETCH ANALYTICS DATA
  // ========================================
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);

        // TODO: Replace dengan API call ke backend
        // Endpoint: GET /api/investor/analytics?period={selectedPeriod}
        // Headers: Authorization: Bearer {token}
        // Response format:
        // {
        //   stats: {
        //     portfolioValue: { value: number, change: number, isPositive: boolean },
        //     totalReturns: { value: number, change: number, isPositive: boolean },
        //     averageROI: { value: number, change: number, isPositive: boolean },
        //     bestROI: { value: number, umkmName: string, isPositive: boolean }
        //   },
        //   portfolioPerformance: [
        //     { month: string, value: number, investment: number, returns: number }
        //   ],
        //   roiByCategory: [
        //     { category: string, roi: number, investment: number }
        //   ],
        //   investmentVsReturns: [
        //     { period: string, investment: number, returns: number }
        //   ],
        //   performanceMetrics: [
        //     { metric: string, value: number, fullMark: 100 }
        //   ],
        //   bestPerformers: [
        //     {
        //       name: string,
        //       roi: number,
        //       investment: number,
        //       returns: number,
        //       image: string
        //     }
        //   ],
        //   worstPerformers: [
        //     {
        //       name: string,
        //       roi: number,
        //       investment: number,
        //       returns: number,
        //       image: string
        //     }
        //   ],
        //   portfolioAllocation: [
        //     { category: string, value: number, percentage: number }
        //   ]
        // }

        // const response = await fetch(`/api/investor/analytics?period=${selectedPeriod}`, {
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
            portfolioValue: { value: 533250000, change: 18.5, isPositive: true },
            totalReturns: { value: 83250000, change: 22.3, isPositive: true },
            averageROI: { value: 18.5, change: 3.2, isPositive: true },
            bestROI: { value: 22.5, umkmName: 'Warung Kopi Nusantara', isPositive: true }
          },
          portfolioPerformance: [
            { month: 'Jan', value: 450, investment: 450, returns: 0 },
            { month: 'Feb', value: 458, investment: 450, returns: 8 },
            { month: 'Mar', value: 465, investment: 450, returns: 15 },
            { month: 'Apr', value: 472, investment: 450, returns: 22 },
            { month: 'May', value: 485, investment: 450, returns: 35 },
            { month: 'Jun', value: 498, investment: 450, returns: 48 },
            { month: 'Jul', value: 515, investment: 450, returns: 65 },
            { month: 'Aug', value: 533, investment: 450, returns: 83 }
          ],
          roiByCategory: [
            { category: 'Food & Beverage', roi: 19.5, investment: 180 },
            { category: 'Agrikultur', roi: 20.8, investment: 135 },
            { category: 'Service', roi: 14.2, investment: 90 },
            { category: 'Lainnya', roi: 12.5, investment: 45 }
          ],
          investmentVsReturns: [
            { period: 'Q1 2024', investment: 450, returns: 15 },
            { period: 'Q2 2024', investment: 450, returns: 35 },
            { period: 'Q3 2024', investment: 450, returns: 65 },
            { period: 'Q4 2024 (Proj)', investment: 450, returns: 95 }
          ],
          performanceMetrics: [
            { metric: 'ROI Performance', value: 85, fullMark: 100 },
            { metric: 'Risk Management', value: 78, fullMark: 100 },
            { metric: 'Portfolio Diversification', value: 72, fullMark: 100 },
            { metric: 'Cash Flow', value: 88, fullMark: 100 },
            { metric: 'Growth Rate', value: 80, fullMark: 100 },
            { metric: 'Liquidity', value: 75, fullMark: 100 }
          ],
          bestPerformers: [
            {
              name: 'Warung Kopi Nusantara',
              roi: 22.5,
              investment: 50000000,
              returns: 11250000,
              image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200'
            },
            {
              name: 'Tani Organik Sejahtera',
              roi: 20.8,
              investment: 100000000,
              returns: 20800000,
              image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200'
            },
            {
              name: 'Hidroponik Modern Farm',
              roi: 19.5,
              investment: 45000000,
              returns: 8775000,
              image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=200'
            }
          ],
          worstPerformers: [
            {
              name: 'Service AC Pro',
              roi: 12.5,
              investment: 30000000,
              returns: 3750000,
              image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200'
            },
            {
              name: 'Laundry Express 24/7',
              roi: 14.2,
              investment: 80000000,
              returns: 11360000,
              image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200'
            }
          ],
          portfolioAllocation: [
            { category: 'Food & Beverage', value: 180000000, percentage: 40 },
            { category: 'Agrikultur', value: 135000000, percentage: 30 },
            { category: 'Service', value: 90000000, percentage: 20 },
            { category: 'Lainnya', value: 45000000, percentage: 10 }
          ]
        };

        // Set state dari response
        const statsArray = [
          {
            title: 'Portfolio Value',
            value: formatCurrency(result.stats.portfolioValue.value),
            change: `+${result.stats.portfolioValue.change}%`,
            isPositive: result.stats.portfolioValue.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'blue'
          },
          {
            title: 'Total Returns',
            value: formatCurrency(result.stats.totalReturns.value),
            change: `+${result.stats.totalReturns.change}%`,
            isPositive: result.stats.totalReturns.isPositive,
            icon: <Award size={24} />,
            color: 'green'
          },
          {
            title: 'Average ROI',
            value: `${result.stats.averageROI.value}%`,
            change: `+${result.stats.averageROI.change}%`,
            isPositive: result.stats.averageROI.isPositive,
            icon: <Target size={24} />,
            color: 'purple'
          },
          {
            title: 'Best ROI',
            value: `${result.stats.bestROI.value}%`,
            subtitle: result.stats.bestROI.umkmName,
            isPositive: result.stats.bestROI.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'orange'
          }
        ];

        setStats(statsArray);
        setPortfolioPerformance(result.portfolioPerformance);
        setRoiByCategory(result.roiByCategory);
        setInvestmentVsReturns(result.investmentVsReturns);
        setPerformanceMetrics(result.performanceMetrics);
        setBestPerformers(result.bestPerformers);
        setWorstPerformers(result.worstPerformers);
        setPortfolioAllocation(result.portfolioAllocation);

      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [selectedPeriod]);

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(0)}M`;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('ROI') 
                ? `${entry.value}%` 
                : `${entry.value}M`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #3: EXPORT REPORT
  // ========================================
  const handleExportReport = async () => {
    try {
      // TODO: Replace dengan API call
      // Endpoint: GET /api/investor/analytics/export?period={selectedPeriod}&format=pdf
      // Headers: Authorization: Bearer {token}
      // Response: File download (PDF)
      
      alert('Export analytics report - integrate with backend');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  // Calculate overall performance score
  const overallScore = performanceMetrics.length > 0
    ? (performanceMetrics.reduce((sum, metric) => sum + metric.value, 0) / performanceMetrics.length).toFixed(1)
    : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics ROI</h1>
          <p className="text-gray-600 mt-1">Analisis performa portfolio investasi Anda</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-2 bg-white rounded-xl border-2 border-gray-200 p-1">
            {[
              { id: '3months', label: '3 Bulan' },
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
              {stat.change && (
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Portfolio Performance</h2>
              <p className="text-sm text-gray-600 mt-1">Nilai portfolio, investasi, dan returns</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={portfolioPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                fill="#3B82F6"
                fillOpacity={0.2}
                stroke="#3B82F6"
                strokeWidth={3}
                name="Portfolio Value (M)"
              />
              <Line
                type="monotone"
                dataKey="investment"
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Investment (M)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="returns"
                stroke="#10B981"
                strokeWidth={3}
                name="Returns (M)"
                dot={{ fill: '#10B981', r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics Radar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Score</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={performanceMetrics}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#6B7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
              <Radar name="Score" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{overallScore}</div>
            <p className="text-sm text-gray-600 mt-1">Overall Performance Score</p>
          </div>
        </div>
      </div>

      {/* ROI by Category */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">ROI by Category</h2>
            <p className="text-sm text-gray-600 mt-1">Perbandingan ROI per kategori investasi</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roiByCategory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="investment" fill="#3B82F6" name="Investment (M)" radius={[8, 8, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} name="ROI (%)" dot={{ fill: '#10B981', r: 5 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Investment vs Returns Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Investment vs Returns</h2>
            <p className="text-sm text-gray-600 mt-1">Perbandingan investasi dan returns per quarter</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={investmentVsReturns}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="investment" fill="#9CA3AF" name="Investment (M)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="returns" fill="#10B981" name="Returns (M)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best & Worst Performers */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Best Performers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Best Performers</h2>
              <p className="text-sm text-gray-600 mt-1">Top 3 UMKM dengan ROI tertinggi</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <div className="space-y-4">
            {bestPerformers.map((umkm, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={umkm.image}
                      alt={umkm.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{umkm.name}</h3>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Investment</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(umkm.investment)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Returns</p>
                      <p className="font-semibold text-green-600">{formatCurrency(umkm.returns)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ROI</p>
                      <p className="font-bold text-green-600 text-lg">{umkm.roi}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst Performers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Need Attention</h2>
              <p className="text-sm text-gray-600 mt-1">UMKM dengan ROI di bawah rata-rata</p>
            </div>
            <TrendingDown className="text-orange-600" size={24} />
          </div>
          <div className="space-y-4">
            {worstPerformers.map((umkm, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                <div className="flex-shrink-0">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{umkm.name}</h3>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Investment</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(umkm.investment)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Returns</p>
                      <p className="font-semibold text-orange-600">{formatCurrency(umkm.returns)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ROI</p>
                      <p className="font-bold text-orange-600 text-lg">{umkm.roi}%</p>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-semibold">
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <p className="font-semibold mb-1">💡 Tips:</p>
            <p className="text-xs">Monitor performa UMKM ini secara berkala dan pertimbangkan untuk diversifikasi portfolio Anda.</p>
          </div>
        </div>
      </div>

      {/* Portfolio Allocation */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio Allocation</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={portfolioAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {portfolioAllocation.map((item, index) => (
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

        {/* Summary Insights */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Investment Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-2">Best Category</p>
              <p className="text-2xl font-bold">Agrikultur</p>
              <p className="text-blue-200 text-sm mt-1">20.8% ROI</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-2">Growth Rate</p>
              <p className="text-2xl font-bold">+18.5%</p>
              <p className="text-blue-200 text-sm mt-1">Year to Date</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-2">Recommendation</p>
              <p className="text-xl font-bold">Diversify</p>
              <p className="text-blue-200 text-sm mt-1">Add more Service sector</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
