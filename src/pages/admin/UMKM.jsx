// ============================================================================
// src/pages/admin/UMKM.jsx
// ============================================================================
import { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  TrendingUp,
  Users,
  X,
  AlertCircle
} from 'lucide-react';

export function AdminUMKM() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUMKM, setSelectedUMKM] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [umkmList, setUmkmList] = useState([]);
  const [stats, setStats] = useState(null);

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch UMKM List
  useEffect(() => {
    const fetchUMKM = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/admin/umkm', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setUmkmList(data.umkm);

        // Dummy data
        setTimeout(() => {
          setUmkmList([
            {
              id: 1,
              name: 'Warung Kopi Nusantara',
              category: 'fnb',
              owner: 'Budi Santoso',
              email: 'info@warungkopi.com',
              phone: '+62 812-3456-7890',
              location: 'Jakarta Selatan',
              status: 'active',
              verified: true,
              rating: 4.8,
              investorCount: 24,
              totalInvestment: 450000000,
              revenue: 125000000,
              createdAt: '2024-01-15'
            },
            {
              id: 2,
              name: 'Tani Organik Sejahtera',
              category: 'agrikultur',
              owner: 'Siti Rahayu',
              email: 'info@taniorganik.com',
              phone: '+62 813-9876-5432',
              location: 'Bandung',
              status: 'active',
              verified: true,
              rating: 4.9,
              investorCount: 18,
              totalInvestment: 380000000,
              revenue: 98000000,
              createdAt: '2024-02-10'
            },
            {
              id: 3,
              name: 'Bakery Roti Hangat',
              category: 'fnb',
              owner: 'Ahmad Fauzi',
              email: 'order@bakeryroti.com',
              phone: '+62 815-1234-5678',
              location: 'Surabaya',
              status: 'active',
              verified: true,
              rating: 4.7,
              investorCount: 32,
              totalInvestment: 280000000,
              revenue: 85000000,
              createdAt: '2024-03-05'
            },
            {
              id: 4,
              name: 'Fashion Store Trendy',
              category: 'service',
              owner: 'Rina Wijaya',
              email: 'cs@fashionstore.com',
              phone: '+62 817-5555-4444',
              location: 'Yogyakarta',
              status: 'pending',
              verified: false,
              rating: 0,
              investorCount: 0,
              totalInvestment: 0,
              revenue: 0,
              createdAt: '2024-10-20'
            },
            {
              id: 5,
              name: 'Laundry Express Inactive',
              category: 'service',
              owner: 'Dedi Kurniawan',
              email: 'info@laundry.com',
              phone: '+62 819-8888-9999',
              location: 'Jakarta Pusat',
              status: 'suspended',
              verified: true,
              rating: 3.2,
              investorCount: 5,
              totalInvestment: 50000000,
              revenue: 15000000,
              createdAt: '2024-06-12'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching UMKM:', error);
        setIsLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  // TODO: Integrate dengan backend - Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/admin/umkm/stats', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setStats(data);

        setStats({
          totalUMKM: 456,
          activeUMKM: 420,
          pendingVerification: 24,
          suspendedUMKM: 12
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // TODO: Integrate dengan backend - Update UMKM Status
  const handleUpdateStatus = async (umkmId, newStatus) => {
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/admin/umkm/${umkmId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // });

      setUmkmList(umkmList.map(umkm => 
        umkm.id === umkmId ? { ...umkm, status: newStatus } : umkm
      ));
      alert('✅ Status UMKM berhasil diupdate!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // TODO: Integrate dengan backend - Delete UMKM
  const handleDelete = async (umkmId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus UMKM ini?')) return;

    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/admin/umkm/${umkmId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      setUmkmList(umkmList.filter(umkm => umkm.id !== umkmId));
      alert('✅ UMKM berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting UMKM:', error);
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

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} />, label: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: <AlertCircle size={14} />, label: 'Pending' },
      suspended: { color: 'bg-red-100 text-red-700', icon: <XCircle size={14} />, label: 'Suspended' }
    };
    return badges[status] || badges.pending;
  };

  const filteredUMKM = umkmList.filter(umkm => {
    const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         umkm.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || umkm.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || umkm.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage UMKM</h1>
        <p className="text-gray-600 mt-1">Monitor and manage all UMKM on platform</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="text-blue-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total UMKM</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUMKM}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Active</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeUMKM}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingVerification}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircle className="text-red-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Suspended</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.suspendedUMKM}</p>
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
              placeholder="Search UMKM or owner..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="fnb">Food & Beverage</option>
            <option value="agrikultur">Agrikultur</option>
            <option value="service">Service</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredUMKM.length}</span> results
          </div>
        </div>
      </div>

      {/* UMKM List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading UMKM...</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUMKM.map((umkm) => {
            const statusBadge = getStatusBadge(umkm.status);

            return (
              <div key={umkm.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{umkm.name}</h3>
                      {umkm.verified && (
                        <CheckCircle className="text-blue-600" size={18} />
                      )}
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                      {statusBadge.icon}
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{umkm.location}</span>
                  </div>
                  {umkm.rating > 0 && (
                    <div className="flex items-center space-x-2">
                      <Star size={16} className="text-yellow-500" fill="currentColor" />
                      <span className="text-sm font-semibold text-gray-900">{umkm.rating}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{umkm.investorCount} Investors</span>
                  </div>
                </div>

                {umkm.status === 'active' && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Investment</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(umkm.totalInvestment)}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Revenue</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(umkm.revenue)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUMKM(umkm);
                      setShowDetailModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                  >
                    View
                  </button>
                  
                  {umkm.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(umkm.id, 'active')}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                    >
                      Approve
                    </button>
                  )}

                  {umkm.status === 'active' && (
                    <button
                      onClick={() => handleUpdateStatus(umkm.id, 'suspended')}
                      className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200 transition text-sm"
                    >
                      Suspend
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(umkm.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal - implement similar to other modals */}
    </div>
  );
}

// Export all components
// export default {
//   AdminAnalytics,
//   AdminTransactions,
//   AdminUMKM
// };
              