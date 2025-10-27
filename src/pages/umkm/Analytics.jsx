// src/pages/umkm/Analytics.jsx
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Eye,
  Download
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

export default function UMKMAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [isLoading, setIsLoading] = useState(true);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #1: STATE UNTUK DATA ANALYTICS
  // ========================================
  const [stats, setStats] = useState([]);
  const [monthlyPerformance, setMonthlyPerformance] = useState([]);
  const [roiComparison, setRoiComparison] = useState([]);
  const [businessMetrics, setBusinessMetrics] = useState([]);
  const [investmentDistribution, setInvestmentDistribution] = useState([]);
  const [topInvestors, setTopInvestors] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [keyInsights, setKeyInsights] = useState({});

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #2: FETCH DATA ANALYTICS
  // ========================================
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);

        // TODO: Replace dengan API call ke backend
        // Endpoint: GET /api/umkm/analytics?period={selectedPeriod}
        // Headers: Authorization: Bearer {token}
        // Response format:
        // {
        //   stats: {
        //     averageRoi: { value: number, change: number, isPositive: boolean },
        //     totalInvestors: { value: number, change: number, isPositive: boolean },
        //     investmentRaised: { value: number, change: number, isPositive: boolean },
        //     businessGrowth: { value: number, change: number, isPositive: boolean }
        //   },
        //   monthlyPerformance: [
        //     { month: string, revenue: number, growth: number, roi: number, investors: number }
        //   ],
        //   roiComparison: [
        //     { period: string, target: number, actual: number }
        //   ],
        //   businessMetrics: [
        //     { metric: string, value: number, fullMark: 100 }
        //   ],
        //   investmentDistribution: [
        //     { range: string, count: number, percentage: number }
        //   ],
        //   topInvestors: [
        //     { 
        //       rank: number,
        //       name: string,
        //       investment: number,
        //       roi: number,
        //       duration: string,
        //       returns: number
        //     }
        //   ],
        //   milestones: [
        //     {
        //       date: string,
        //       title: string,
        //       description: string,
        //       icon: string,
        //       status: 'completed' | 'upcoming'
        //     }
        //   ],
        //   keyInsights: {
        //     bestPerformance: { period: string, description: string },
        //     topInvestor: { name: string, description: string },
        //     nextTarget: { target: string, description: string }
        //   }
        // }

        // const response = await fetch(`/api/umkm/analytics?period=${selectedPeriod}`, {
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
            averageRoi: { value: 18.5, change: 3.2, isPositive: true },
            totalInvestors: { value: 24, change: 4, isPositive: true },
            investmentRaised: { value: 450000000, change: 15, isPositive: true },
            businessGrowth: { value: 24.8, change: 5.1, isPositive: true }
          },
          monthlyPerformance: [
            { month: 'Jan', revenue: 85, growth: 12, roi: 15, investors: 18 },
            { month: 'Feb', revenue: 92, growth: 14, roi: 16, investors: 19 },
            { month: 'Mar', revenue: 88, growth: 11, roi: 15.5, investors: 20 },
            { month: 'Apr', revenue: 98, growth: 16, roi: 17, investors: 21 },
            { month: 'May', revenue: 105, growth: 18, roi: 17.5, investors: 22 },
            { month: 'Jun', revenue: 112, growth: 20, roi: 18, investors: 24 }
          ],
          roiComparison: [
            { period: 'Q1 2024', target: 15, actual: 16.2 },
            { period: 'Q2 2024', target: 16, actual: 17.8 },
            { period: 'Q3 2024', target: 17, actual: 18.5 },
            { period: 'Q4 2024 (Proj)', target: 18, actual: 19.2 }
          ],
          businessMetrics: [
            { metric: 'Revenue', value: 85, fullMark: 100 },
            { metric: 'Profit Margin', value: 72, fullMark: 100 },
            { metric: 'Customer Growth', value: 78, fullMark: 100 },
            { metric: 'Product Quality', value: 92, fullMark: 100 },
            { metric: 'Market Share', value: 65, fullMark: 100 },
            { metric: 'Brand Value', value: 80, fullMark: 100 }
          ],
          investmentDistribution: [
            { range: '< 10M', count: 8, percentage: 33 },
            { range: '10M - 25M', count: 10, percentage: 42 },
            { range: '25M - 50M', count: 4, percentage: 17 },
            { range: '> 50M', count: 2, percentage: 8 }
          ],
          topInvestors: [
            {
              rank: 1,
              name: 'John Doe',
              investment: 50000000,
              roi: 22.5,
              duration: '12 bulan',
              returns: 11250000
            },
            {
              rank: 2,
              name: 'Jane Smith',
              investment: 35000000,
              roi: 20.8,
              duration: '10 bulan',
              returns: 7280000
            },
            {
              rank: 3,
              name: 'Robert Wilson',
              investment: 45000000,
              roi: 19.5,
              duration: '11 bulan',
              returns: 8775000
            },
            {
              rank: 4,
              name: 'Sarah Johnson',
              investment: 28000000,
              roi: 18.2,
              duration: '8 bulan',
              returns: 5096000
            },
            {
              rank: 5,
              name: 'Michael Brown',
              investment: 40000000,
              roi: 17.8,
              duration: '9 bulan',
              returns: 7120000
            }
          ],
          milestones: [
            {
              date: 'Jan 2024',
              title: 'Mencapai 10 Investor',
              description: 'Total investasi Rp 200M',
              icon: '🎯',
              status: 'completed'
            },
            {
              date: 'Mar 2024',
              title: 'Revenue Rp 100M/bulan',
              description: 'Pertumbuhan 50% dari bulan sebelumnya',
              icon: '📈',
              status: 'completed'
            },
            {
              date: 'Jun 2024',
              title: 'Ekspansi ke 3 Kota',
              description: 'Jakarta, Bandung, Surabaya',
              icon: '🏙',
              status: 'completed'
            },
            {
              date: 'Sep 2024',
              title: 'Target 50 Investor',
              description: 'Total investasi target Rp 1B',
              icon: '🎊',
              status: 'upcoming'
            }
          ],
          keyInsights: {
            bestPerformance: {
              period: 'Juni 2024',
              description: 'Revenue tertinggi dengan ROI 18% dan pertumbuhan 20%'
            },
            topInvestor: {
              name: 'John Doe',
              description: 'Investasi Rp 50M dengan ROI 22.5% dalam 12 bulan'
            },
            nextTarget: {
              target: '50 Investors',
              description: 'Target September 2024 dengan total investasi Rp 1B'
            }
          }
        };

        // Set state dari response
        const statsArray = [
          {
            title: 'Average ROI',
            value: `${result.stats.averageRoi.value}%`,
            change: `+${result.stats.averageRoi.change}%`,
            isPositive: result.stats.averageRoi.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'blue',
            description: 'Return on Investment rata-rata'
          },
          {
            title: 'Total Investors',
            value: result.stats.totalInvestors.value.toString(),
            change: `+${result.stats.totalInvestors.change}`,
            isPositive: result.stats.totalInvestors.isPositive,
            icon: <Users size={24} />,
            color: 'green',
            description: 'Jumlah investor aktif'
          },
          {
            title: 'Investment Raised',
            value: formatCurrency(result.stats.investmentRaised.value),
            change: `+${result.stats.investmentRaised.change}%`,
            isPositive: result.stats.investmentRaised.isPositive,
            icon: <DollarSign size={24} />,
            color: 'purple',
            description: 'Total dana terkumpul'
          },
          {
            title: 'Business Growth',
            value: `${result.stats.businessGrowth.value}%`,
            change: `+${result.stats.businessGrowth.change}%`,
            isPositive: result.stats.businessGrowth.isPositive,
            icon: <Target size={24} />,
            color: 'orange',
            description: 'Pertumbuhan bisnis YoY'
          }
        ];

        setStats(statsArray);
        setMonthlyPerformance(result.monthlyPerformance);
        setRoiComparison(result.roiComparison);
        setBusinessMetrics(result.businessMetrics);
        setInvestmentDistribution(result.investmentDistribution);
        setTopInvestors(result.topInvestors);
        setMilestones(result.milestones);
        setKeyInsights(result.keyInsights);

      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [selectedPeriod]); // Re-fetch saat period berubah

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('ROI') || entry.name.includes('Growth')
                ? `${entry.value}%`
                : entry.name.includes('Revenue')
                ? `${entry.value}M`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #3: EXPORT REPORT
  // ========================================
  const handleExportReport = async () => {
    try {
      // TODO: Replace dengan API call
      // Endpoint: GET /api/umkm/analytics/export?period={selectedPeriod}&format=pdf
      // Headers: Authorization: Bearer {token}
      // Response: File download (PDF/Excel)
      
      // const response = await fetch(`/api/umkm/analytics/export?period=${selectedPeriod}&format=pdf`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `analytics-report-${selectedPeriod}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      
      alert('Export report feature - integrate with backend');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  // Calculate overall health score
  const overallHealthScore = businessMetrics.length > 0
    ? (businessMetrics.reduce((sum, metric) => sum + metric.value, 0) / businessMetrics.length).toFixed(1)
    : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & ROI</h1>
          <p className="text-gray-600 mt-1">Monitor performa bisnis dan return investment secara detail</p>
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
            <span>Export Report</span>
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
            <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Performance - Composed Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Monthly Performance</h2>
              <p className="text-sm text-gray-600 mt-1">Revenue, Growth, dan ROI bulanan</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue (M)" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} name="ROI (%)" dot={{ fill: '#10B981', r: 5 }} />
              <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#F59E0B" strokeWidth={3} name="Growth (%)" dot={{ fill: '#F59E0B', r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Business Metrics Radar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Business Health Score</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={businessMetrics}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#6B7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
              <Radar name="Score" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{overallHealthScore}</div>
            <p className="text-sm text-gray-600 mt-1">Overall Health Score</p>
          </div>
        </div>
      </div>

      {/* ROI Target vs Actual */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">ROI Target vs Actual</h2>
            <p className="text-sm text-gray-600 mt-1">Perbandingan target dan pencapaian ROI per kuartal</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={roiComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="target" fill="#9CA3AF" name="Target ROI (%)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="actual" fill="#10B981" name="Actual ROI (%)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Investment Distribution & Top Investors */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Investment Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Investment Distribution</h2>
          <div className="space-y-4">
            {investmentDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.range}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.count} investor</span>
                    <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Investors</span>
              <span className="text-2xl font-bold text-blue-600">
                {investmentDistribution.reduce((sum, item) => sum + item.count, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Top Investors Leaderboard */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Top Investors by ROI</h2>
              <p className="text-sm text-gray-600 mt-1">5 investor dengan return tertinggi</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
              <Eye size={16} />
              <span>Lihat Semua</span>
            </button>
          </div>
          <div className="space-y-3">
            {topInvestors.map((investor) => (
              <div key={investor.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                    investor.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                    investor.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                    investor.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    'bg-gray-200'
                  } text-white`}>
                    {investor.rank === 1 ? '🥇' : investor.rank === 2 ? '🥈' : investor.rank === 3 ? '🥉' : investor.rank}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{investor.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>Investasi: {formatCurrency(investor.investment)}</span>
                      <span>• {investor.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{investor.roi}%</div>
                  <div className="text-xs text-gray-600 mt-1">
                    +{formatCurrency(investor.returns)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Milestones */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Growth Milestones</h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-gray-300"></div>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start space-x-4 pl-14">
                {/* Dot */}
                <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  milestone.status === 'completed'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg'
                    : 'bg-gray-200 border-4 border-white shadow-md'
                }`}>
                  {milestone.icon}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{milestone.date}</span>
                    </div>
                    {milestone.status === 'completed' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Completed
                      </span>
                    )}
                    {milestone.status === 'upcoming' && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900">Best Performance</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-2">{keyInsights.bestPerformance?.period || '-'}</p>
          <p className="text-sm text-gray-700">{keyInsights.bestPerformance?.description || '-'}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <Award className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900">Top Investor</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2">{keyInsights.topInvestor?.name || '-'}</p>
          <p className="text-sm text-gray-700">{keyInsights.topInvestor?.description || '-'}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900">Next Target</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 mb-2">{keyInsights.nextTarget?.target || '-'}</p>
          <p className="text-sm text-gray-700">{keyInsights.nextTarget?.description || '-'}</p>
        </div>
      </div>
    </div>
  );
}