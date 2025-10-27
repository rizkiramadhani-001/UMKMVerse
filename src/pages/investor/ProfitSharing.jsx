// src/pages/investor/ProfitSharing.jsx
import { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function InvestorProfitSharing() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #1: STATE UNTUK PROFIT SHARING DATA
  // ========================================
  const [stats, setStats] = useState([]);
  const [profitHistory, setProfitHistory] = useState([]);
  const [monthlyProfitData, setMonthlyProfitData] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [pendingProfit, setPendingProfit] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #2: FETCH PROFIT SHARING DATA
  // ========================================
  useEffect(() => {
    const fetchProfitSharingData = async () => {
      try {
        setIsLoading(true);

        // TODO: Replace dengan API call ke backend
        // Endpoint: GET /api/investor/profit-sharing?period={selectedPeriod}
        // Headers: Authorization: Bearer {token}
        // Response format:
        // {
        //   stats: {
        //     totalProfit: { value: number, change: number, isPositive: boolean },
        //     availableBalance: { value: number, change: number, isPositive: boolean },
        //     pendingProfit: { value: number, change: number, isPositive: boolean },
        //     totalWithdrawn: { value: number, change: number, isPositive: boolean }
        //   },
        //   profitHistory: [
        //     {
        //       id: number,
        //       umkmName: string,
        //       umkmImage: string,
        //       amount: number,
        //       date: string,
        //       status: 'completed' | 'pending' | 'processing',
        //       transactionId: string,
        //       smartContractHash: string
        //     }
        //   ],
        //   monthlyProfitData: [
        //     { month: string, profit: number, withdrawn: number }
        //   ],
        //   upcomingPayments: [
        //     {
        //       umkmName: string,
        //       estimatedAmount: number,
        //       paymentDate: string,
        //       status: 'scheduled'
        //     }
        //   ]
        // }

        // const response = await fetch(`/api/investor/profit-sharing?period=${selectedPeriod}`, {
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
            totalProfit: { value: 83250000, change: 22.3, isPositive: true },
            availableBalance: { value: 35500000, change: 15.8, isPositive: true },
            pendingProfit: { value: 12300000, change: 8.5, isPositive: true },
            totalWithdrawn: { value: 35450000, change: 18.2, isPositive: true }
          },
          profitHistory: [
            {
              id: 1,
              umkmName: 'Warung Kopi Nusantara',
              umkmImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200',
              amount: 2500000,
              date: '2024-10-01',
              status: 'completed',
              transactionId: 'TRX-2024-001',
              smartContractHash: '0x7d8f3e2a9c1b4f6e8d2a3c5b7f1e4d6a9c2b5e8f'
            },
            {
              id: 2,
              umkmName: 'Tani Organik Sejahtera',
              umkmImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200',
              amount: 5200000,
              date: '2024-09-25',
              status: 'completed',
              transactionId: 'TRX-2024-002',
              smartContractHash: '0x3a1c7f9e4d2b8c6a1f5e3d7b9c2a4f8e1d3c6b5a'
            },
            {
              id: 3,
              umkmName: 'Bakery Roti Hangat',
              umkmImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
              amount: 1800000,
              date: '2024-09-20',
              status: 'completed',
              transactionId: 'TRX-2024-003',
              smartContractHash: '0x9b5e2f8a3c1d7e4f6a2c8b5d1e9f3a7c4b6e8d2a'
            },
            {
              id: 4,
              umkmName: 'Laundry Express 24/7',
              umkmImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200',
              amount: 3200000,
              date: '2024-09-15',
              status: 'processing',
              transactionId: 'TRX-2024-004',
              smartContractHash: '0x6d4a8f2e1c9b7e5a3d1f4c8b6e2a9d7f3c5b1e8a'
            },
            {
              id: 5,
              umkmName: 'Warung Kopi Nusantara',
              umkmImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200',
              amount: 2300000,
              date: '2024-09-01',
              status: 'completed',
              transactionId: 'TRX-2024-005',
              smartContractHash: '0x2e7c5a9f3d1b8e4c6a2f7d5b9e1c4a8f3d6b2e7c'
            }
          ],
          monthlyProfitData: [
            { month: 'May', profit: 8.5, withdrawn: 5.0 },
            { month: 'Jun', profit: 11.2, withdrawn: 8.0 },
            { month: 'Jul', profit: 13.8, withdrawn: 10.5 },
            { month: 'Aug', profit: 16.5, withdrawn: 12.0 },
            { month: 'Sep', profit: 18.2, withdrawn: 15.5 },
            { month: 'Oct', profit: 15.0, withdrawn: 10.0 }
          ],
          upcomingPayments: [
            {
              umkmName: 'Warung Kopi Nusantara',
              estimatedAmount: 2600000,
              paymentDate: '2024-11-01',
              status: 'scheduled'
            },
            {
              umkmName: 'Tani Organik Sejahtera',
              estimatedAmount: 5500000,
              paymentDate: '2024-11-05',
              status: 'scheduled'
            },
            {
              umkmName: 'Laundry Express 24/7',
              estimatedAmount: 3400000,
              paymentDate: '2024-11-05',
              status: 'scheduled'
            },
            {
              umkmName: 'Bakery Roti Hangat',
              estimatedAmount: 1900000,
              paymentDate: '2024-11-20',
              status: 'scheduled'
            }
          ]
        };

        // Set state dari response
        const statsArray = [
          {
            title: 'Total Profit',
            value: formatCurrency(result.stats.totalProfit.value),
            change: `+${result.stats.totalProfit.change}%`,
            isPositive: result.stats.totalProfit.isPositive,
            icon: <TrendingUp size={24} />,
            color: 'green'
          },
          {
            title: 'Available Balance',
            value: formatCurrency(result.stats.availableBalance.value),
            change: `+${result.stats.availableBalance.change}%`,
            isPositive: result.stats.availableBalance.isPositive,
            icon: <DollarSign size={24} />,
            color: 'blue'
          },
          {
            title: 'Pending Profit',
            value: formatCurrency(result.stats.pendingProfit.value),
            change: `+${result.stats.pendingProfit.change}%`,
            isPositive: result.stats.pendingProfit.isPositive,
            icon: <Clock size={24} />,
            color: 'orange'
          },
          {
            title: 'Total Withdrawn',
            value: formatCurrency(result.stats.totalWithdrawn.value),
            change: `+${result.stats.totalWithdrawn.change}%`,
            isPositive: result.stats.totalWithdrawn.isPositive,
            icon: <ArrowDownRight size={24} />,
            color: 'purple'
          }
        ];

        setStats(statsArray);
        setProfitHistory(result.profitHistory);
        setMonthlyProfitData(result.monthlyProfitData);
        setUpcomingPayments(result.upcomingPayments);
        setAvailableBalance(result.stats.availableBalance.value);
        setPendingProfit(result.stats.pendingProfit.value);
        setTotalProfit(result.stats.totalProfit.value);

      } catch (error) {
        console.error('Error fetching profit sharing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfitSharingData();
  }, [selectedPeriod]);

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #3: WITHDRAW PROFIT
  // ========================================
  const handleWithdraw = async () => {
    try {
      // Validation
      const amount = parseFloat(withdrawAmount);
      if (!amount || amount <= 0) {
        setWithdrawError('Masukkan jumlah yang valid');
        return;
      }
      if (amount > availableBalance) {
        setWithdrawError('Saldo tidak mencukupi');
        return;
      }
      if (amount < 100000) {
        setWithdrawError('Minimum penarikan Rp 100.000');
        return;
      }

      setIsWithdrawing(true);
      setWithdrawError('');

      // TODO: Replace dengan API call
      // Endpoint: POST /api/investor/profit-sharing/withdraw
      // Headers: Authorization: Bearer {token}
      // Request body:
      // {
      //   amount: number,
      //   bankAccount: string (optional, jika ada multiple accounts)
      // }
      // Response:
      // {
      //   success: boolean,
      //   message: string,
      //   transactionId: string,
      //   estimatedArrival: string (date)
      // }

      // const response = await fetch('/api/investor/profit-sharing/withdraw', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ amount })
      // });
      // const result = await response.json();

      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert(`✅ Penarikan berhasil!\n\nJumlah: ${formatCurrency(amount)}\nEstimasi sampai: 1-2 hari kerja`);
      
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      
      // Refresh data after withdrawal
      // Re-fetch profit sharing data here

    } catch (error) {
      console.error('Error withdrawing profit:', error);
      setWithdrawError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsWithdrawing(false);
    }
  };

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
      completed: { color: 'bg-green-100 text-green-700', label: 'Completed', icon: <CheckCircle size={14} /> },
      processing: { color: 'bg-blue-100 text-blue-700', label: 'Processing', icon: <Clock size={14} /> },
      pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pending', icon: <Clock size={14} /> },
      scheduled: { color: 'bg-purple-100 text-purple-700', label: 'Scheduled', icon: <Calendar size={14} /> }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${badge.color}`}>
        {badge.icon}
        <span>{badge.label}</span>
      </span>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value * 1000000)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data profit sharing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profit Sharing</h1>
          <p className="text-gray-600 mt-1">Kelola bagi hasil investasi Anda dengan smart contract</p>
        </div>
        <div className="flex items-center space-x-3">
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

      {/* Withdraw Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-2">Available Balance</p>
            <p className="text-4xl font-bold mb-4">{formatCurrency(availableBalance)}</p>
            <div className="flex items-center space-x-2 text-green-100 text-sm">
              <Info size={16} />
              <span>Minimum penarikan: Rp 100.000</span>
            </div>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={availableBalance < 100000}
            className={`px-8 py-4 bg-white text-green-600 rounded-xl text-lg font-bold hover:shadow-xl transition flex items-center space-x-2 ${
              availableBalance < 100000 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transform'
            }`}
          >
            <CreditCard size={24} />
            <span>Tarik Saldo</span>
          </button>
        </div>
      </div>

      {/* Monthly Profit Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Monthly Profit & Withdrawal</h2>
            <p className="text-sm text-gray-600 mt-1">Perbandingan profit yang diterima dan ditarik</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyProfitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="profit" fill="#10B981" name="Profit Received (M)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="withdrawn" fill="#3B82F6" name="Withdrawn (M)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profit History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profit History</h2>
              <p className="text-sm text-gray-600 mt-1">{profitHistory.length} transaksi</p>
            </div>
            <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-semibold">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {profitHistory.map((item) => (
              <div key={item.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 transition">
                <div className="flex items-start space-x-3">
                  <img
                    src={item.umkmImage}
                    alt={item.umkmName}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{item.umkmName}</h3>
                        <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(item.amount)}</p>
                      </div>
                      <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600">
                        <FileText size={14} />
                        <span>Smart Contract</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upcoming Payments</h2>
              <p className="text-sm text-gray-600 mt-1">{upcomingPayments.length} jadwal pembayaran</p>
            </div>
          </div>

          <div className="space-y-3">
            {upcomingPayments.map((payment, index) => (
              <div key={index} className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{payment.umkmName}</h3>
                  {getStatusBadge(payment.status)}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Estimated Amount</p>
                    <p className="text-lg font-bold text-purple-600">{formatCurrency(payment.estimatedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Payment Date</p>
                    <div className="flex items-center space-x-1 text-sm font-semibold text-gray-900">
                      <Calendar size={14} />
                      <span>{formatDate(payment.paymentDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <Info className="text-blue-600 mt-0.5" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Total Pending Profit</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(pendingProfit)}</p>
                <p className="text-xs text-blue-700">Profit akan otomatis masuk sesuai jadwal smart contract</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tarik Saldo</h3>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Saldo Tersedia</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(availableBalance)}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Penarikan
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                  setWithdrawError('');
                }}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  withdrawError ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Masukkan jumlah"
              />
              {withdrawError && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  <span>{withdrawError}</span>
                </div>
              )}
            </div>

            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
              <p className="font-semibold mb-1">⚠️ Informasi Penting:</p>
              <ul className="space-y-1 text-xs">
                <li>• Minimum penarikan: Rp 100.000</li>
                <li>• Estimasi waktu: 1-2 hari kerja</li>
                <li>• Tidak ada biaya admin</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setWithdrawAmount('');
                  setWithdrawError('');
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleWithdraw}
                disabled={isWithdrawing}
                className={`flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition ${
                  isWithdrawing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isWithdrawing ? 'Memproses...' : 'Tarik Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}