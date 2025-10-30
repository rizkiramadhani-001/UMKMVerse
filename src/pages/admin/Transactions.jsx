// ============================================================================
// src/pages/admin/Transactions.jsx
// ============================================================================
import { useState, useEffect } from 'react';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  X
} from 'lucide-react';

export function AdminTransactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/admin/transactions', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setTransactions(data.transactions);

        // Dummy data
        setTimeout(() => {
          setTransactions([
            {
              id: 'TRX-001',
              type: 'investment',
              from: 'John Doe (Investor)',
              to: 'Warung Kopi Nusantara (UMKM)',
              amount: 50000000,
              status: 'completed',
              date: '2024-10-28T10:30:00',
              description: 'Investasi modal usaha'
            },
            {
              id: 'TRX-002',
              type: 'profit-sharing',
              from: 'Warung Kopi Nusantara (UMKM)',
              to: 'John Doe (Investor)',
              amount: 5000000,
              status: 'completed',
              date: '2024-10-27T14:20:00',
              description: 'Bagi hasil bulan Oktober'
            },
            {
              id: 'TRX-003',
              type: 'order',
              from: 'Bakery Roti Hangat (UMKM)',
              to: 'CV Supplier (Supplier)',
              amount: 3500000,
              status: 'pending',
              date: '2024-10-27T09:15:00',
              description: 'Pembelian tepung terigu 100kg'
            },
            {
              id: 'TRX-004',
              type: 'delivery',
              from: 'Tani Organik (UMKM)',
              to: 'PT Distribusi (Distributor)',
              amount: 250000,
              status: 'completed',
              date: '2024-10-26T11:45:00',
              description: 'Biaya pengiriman sayuran organik'
            },
            {
              id: 'TRX-005',
              type: 'withdrawal',
              from: 'Jane Smith (Investor)',
              to: 'Bank Account',
              amount: 25000000,
              status: 'completed',
              date: '2024-10-25T16:20:00',
              description: 'Penarikan profit'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // TODO: Integrate dengan backend - Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/admin/transactions/stats', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setStats(data);

        setStats({
          totalTransactions: 8934,
          totalVolume: 2500000000,
          pendingTransactions: 45,
          volumeGrowth: 28.5
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // TODO: Integrate dengan backend - Export Transactions
  const handleExport = async () => {
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch('/api/admin/transactions/export', {
      //   method: 'GET',
      //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      alert('📊 Export transactions dimulai...');
    } catch (error) {
      console.error('Error exporting transactions:', error);
    }
  };
  // ============================================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} />, label: 'Completed' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} />, label: 'Pending' },
      failed: { color: 'bg-red-100 text-red-700', icon: <XCircle size={14} />, label: 'Failed' }
    };
    return badges[status] || badges.pending;
  };

  const getTypeBadge = (type) => {
    const badges = {
      investment: { color: 'bg-blue-100 text-blue-700', label: 'Investment' },
      'profit-sharing': { color: 'bg-green-100 text-green-700', label: 'Profit Sharing' },
      order: { color: 'bg-purple-100 text-purple-700', label: 'Order' },
      delivery: { color: 'bg-orange-100 text-orange-700', label: 'Delivery' },
      withdrawal: { color: 'bg-gray-100 text-gray-700', label: 'Withdrawal' }
    };
    return badges[type] || badges.order;
  };

  const filteredTransactions = transactions.filter(trx => {
    const matchesSearch = trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trx.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || trx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || trx.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Monitor all platform transactions</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="text-blue-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Transactions</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm border-2 border-blue-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h3 className="text-sm font-medium text-gray-700">Total Volume</h3>
              </div>
              <span className="text-xs font-semibold text-green-600">+{stats.volumeGrowth}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalVolume)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingTransactions}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">98.5%</p>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, from, or to..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="investment">Investment</option>
            <option value="profit-sharing">Profit Sharing</option>
            <option value="order">Order</option>
            <option value="delivery">Delivery</option>
            <option value="withdrawal">Withdrawal</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredTransactions.length}</span> results
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Transaction ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">From</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">To</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700 text-sm">Amount</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((trx) => {
                  const statusBadge = getStatusBadge(trx.status);
                  const typeBadge = getTypeBadge(trx.type);

                  return (
                    <tr key={trx.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm font-semibold text-gray-900">{trx.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-gray-900">{trx.from}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-gray-900">{trx.to}</p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="font-bold text-lg text-gray-900">{formatCurrency(trx.amount)}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                          {statusBadge.icon}
                          <span>{statusBadge.label}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>{formatDate(trx.date)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => {
                            setSelectedTransaction(trx);
                            setShowDetailModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Transaction Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono font-bold text-gray-900">{selectedTransaction.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(selectedTransaction.type).color}`}>
                    {getTypeBadge(selectedTransaction.type).label}
                  </span>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedTransaction.status).color}`}>
                    {getStatusBadge(selectedTransaction.status).icon}
                    <span>{getStatusBadge(selectedTransaction.status).label}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">From</p>
                <p className="font-semibold text-gray-900">{selectedTransaction.from}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">To</p>
                <p className="font-semibold text-gray-900">{selectedTransaction.to}</p>
              </div>

              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(selectedTransaction.amount)}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-900">{selectedTransaction.description}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="font-semibold text-gray-900">{formatDate(selectedTransaction.date)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}