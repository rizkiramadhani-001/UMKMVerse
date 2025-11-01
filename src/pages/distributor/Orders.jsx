// src/pages/distributor/Orders.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Calendar,
  DollarSign,
  Eye,
  Download,
  MessageSquare,
  Phone,
  User,
  AlertCircle,
  ChevronRight,
  Navigation,
  X
} from 'lucide-react';

export default function DistributorOrders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk data dari backend
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/distributor/orders', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setOrders(data.orders);

        // Dummy data - hapus setelah integrate
        setTimeout(() => {
          setOrders([
            {
              id: 'DIS-001',
              orderNumber: 'DIST-2024-001',
              umkmName: 'Warung Kopi Nusantara',
              umkmLogo: '☕',
              umkmContact: {
                phone: '+62 812-3456-7890',
                name: 'Budi Santoso'
              },
              pickupAddress: 'Jl. Mampang Raya No. 123, Jakarta Selatan',
              deliveryAddress: 'Jl. Sudirman No. 45, Jakarta Pusat',
              distance: '8.5 km',
              items: [
                { name: 'Kopi Premium 100 Pack', weight: 15, unit: 'kg' },
                { name: 'Kemasan Branded', weight: 5, unit: 'kg' }
              ],
              totalWeight: 20,
              deliveryFee: 150000,
              status: 'pending',
              orderDate: '2024-10-28T10:30:00',
              requestedDeliveryDate: '2024-10-30',
              priority: 'normal',
              notes: 'Handle with care, produk premium'
            },
            {
              id: 'DIS-002',
              orderNumber: 'DIST-2024-002',
              umkmName: 'Bakery Roti Hangat',
              umkmLogo: '🍞',
              umkmContact: {
                phone: '+62 813-9876-5432',
                name: 'Siti Nurhaliza'
              },
              pickupAddress: 'Jl. Ahmad Yani No. 45, Surabaya',
              deliveryAddress: 'Jl. Pahlawan No. 99, Surabaya',
              distance: '12 km',
              items: [
                { name: 'Roti Tawar 50 Loaf', weight: 25, unit: 'kg' },
                { name: 'Pastry Assorted', weight: 10, unit: 'kg' }
              ],
              totalWeight: 35,
              deliveryFee: 200000,
              status: 'picked-up',
              orderDate: '2024-10-27T14:20:00',
              requestedDeliveryDate: '2024-10-29',
              pickedUpDate: '2024-10-28T08:00:00',
              priority: 'urgent',
              notes: 'Produk mudah rusak, harus cepat',
              estimatedArrival: '2024-10-29T10:00:00'
            },
            {
              id: 'DIS-003',
              orderNumber: 'DIST-2024-003',
              umkmName: 'Tani Organik Sejahtera',
              umkmLogo: '🌾',
              umkmContact: {
                phone: '+62 815-1234-5678',
                name: 'Ahmad Hidayat'
              },
              pickupAddress: 'Jl. Raya Bandung No. 88, Bandung',
              deliveryAddress: 'Jl. Cihampelas No. 123, Bandung',
              distance: '15 km',
              items: [
                { name: 'Sayuran Organik Fresh', weight: 50, unit: 'kg' }
              ],
              totalWeight: 50,
              deliveryFee: 250000,
              status: 'in-transit',
              orderDate: '2024-10-26T09:15:00',
              requestedDeliveryDate: '2024-10-28',
              pickedUpDate: '2024-10-27T07:00:00',
              priority: 'urgent',
              notes: 'Jaga suhu dingin',
              estimatedArrival: '2024-10-28T14:00:00',
              currentLocation: 'Pasteur, Bandung',
              progress: 65
            },
            {
              id: 'DIS-004',
              orderNumber: 'DIST-2024-004',
              umkmName: 'Laundry Express 24/7',
              umkmLogo: '🧺',
              umkmContact: {
                phone: '+62 817-5555-4444',
                name: 'Rina Wijaya'
              },
              pickupAddress: 'Jl. Gatot Subroto No. 11, Jakarta',
              deliveryAddress: 'Jl. HR Rasuna Said No. 77, Jakarta',
              distance: '6 km',
              items: [
                { name: 'Paket Laundry Premium', weight: 30, unit: 'kg' }
              ],
              totalWeight: 30,
              deliveryFee: 120000,
              status: 'delivered',
              orderDate: '2024-10-25T11:45:00',
              requestedDeliveryDate: '2024-10-27',
              pickedUpDate: '2024-10-26T08:00:00',
              deliveredDate: '2024-10-27T10:30:00',
              priority: 'normal',
              notes: null,
              rating: 5,
              review: 'Pengiriman tepat waktu, driver ramah!'
            },
            {
              id: 'DIS-005',
              orderNumber: 'DIST-2024-005',
              umkmName: 'Fashion Store Trendy',
              umkmLogo: '👔',
              umkmContact: {
                phone: '+62 819-8888-9999',
                name: 'Dedi Kurniawan'
              },
              pickupAddress: 'Jl. Malioboro No. 55, Yogyakarta',
              deliveryAddress: 'Jl. Solo No. 123, Yogyakarta',
              distance: '18 km',
              items: [
                { name: 'Pakaian Fashion 100 pcs', weight: 40, unit: 'kg' }
              ],
              totalWeight: 40,
              deliveryFee: 220000,
              status: 'cancelled',
              orderDate: '2024-10-24T16:20:00',
              requestedDeliveryDate: '2024-10-26',
              cancelledDate: '2024-10-25T09:00:00',
              cancelReason: 'Alamat pengiriman tidak ditemukan',
              priority: 'normal'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // TODO: Integrate dengan backend - Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/distributor/orders/stats', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setStats(data);

        // Dummy data
        setStats({
          totalOrders: 342,
          pendingOrders: 12,
          inTransitOrders: 28,
          totalRevenue: 95000000,
          revenueGrowth: 18
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // TODO: Integrate dengan backend - Update Order Status
  const handleUpdateStatus = async (orderId, newStatus) => {
    setIsLoading(true);
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/distributor/orders/${orderId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     status: newStatus,
      //     timestamp: new Date().toISOString()
      //   })
      // });

      setTimeout(() => {
        setOrders(orders.map(order => 
          order.id === orderId ? { 
            ...order, 
            status: newStatus,
            ...(newStatus === 'picked-up' && { pickedUpDate: new Date().toISOString() }),
            ...(newStatus === 'delivered' && { deliveredDate: new Date().toISOString() })
          } : order
        ));
        alert('✅ Status pesanan berhasil diupdate!');
        setIsLoading(false);
        setShowDetailModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error updating order status:', error);
      setIsLoading(false);
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
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} />, label: 'Pending' },
      'picked-up': { color: 'bg-blue-100 text-blue-700', icon: <Package size={14} />, label: 'Picked Up' },
      'in-transit': { color: 'bg-purple-100 text-purple-700', icon: <Truck size={14} />, label: 'In Transit' },
      delivered: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} />, label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: <XCircle size={14} />, label: 'Cancelled' }
    };
    return badges[status] || badges.pending;
  };

  const getPriorityBadge = (priority) => {
    return priority === 'urgent' 
      ? 'bg-red-100 text-red-700' 
      : 'bg-gray-100 text-gray-700';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.umkmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Pesanan</h1>
          <p className="text-gray-600 mt-1">Manage pengiriman dan distribusi</p>
        </div>
        <button
          onClick={() => navigate('/distributor-dashboard/tracking')}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition transform"
        >
          <Navigation size={20} />
          <span>Real-time Tracking</span>
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Truck className="text-blue-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Pesanan</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Navigation className="text-purple-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">In Transit</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.inTransitOrders}</p>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm border-2 border-purple-200 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="text-white" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Total Revenue</h3>
            </div>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              <span className="text-sm font-semibold text-green-600">+{stats.revenueGrowth}%</span>
            </div>
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
              placeholder="Cari nomor pesanan atau nama UMKM..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="picked-up">Picked Up</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredOrders.length}</span> pesanan
          </div>
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Truck className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada pesanan</h3>
          <p className="text-gray-600">Tidak ada pesanan yang sesuai dengan filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusBadge = getStatusBadge(order.status);

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-3xl">
                      {order.umkmLogo}
                    </div>

                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                          {statusBadge.icon}
                          <span>{statusBadge.label}</span>
                        </span>
                        {order.priority === 'urgent' && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(order.priority)}`}>
                            🔥 Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                        <User size={16} />
                        <span className="font-medium">{order.umkmName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        <span>{formatDate(order.orderDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Delivery Fee</p>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(order.deliveryFee)}</p>
                  </div>
                </div>

                {/* Route Info */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-start space-x-2 mb-2">
                        <MapPin className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Pickup</p>
                          <p className="text-sm font-medium text-gray-900">{order.pickupAddress}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Delivery</p>
                          <p className="text-sm font-medium text-gray-900">{order.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Distance: <span className="font-semibold text-gray-900">{order.distance}</span></span>
                    <span className="text-sm text-gray-600">Weight: <span className="font-semibold text-gray-900">{order.totalWeight} kg</span></span>
                  </div>
                </div>

                {/* Progress (for in-transit) */}
                {order.status === 'in-transit' && order.progress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-purple-600">{order.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                    {order.currentLocation && (
                      <p className="text-xs text-gray-500 mt-2">Current: {order.currentLocation}</p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailModal(true);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    <Eye size={18} />
                    <span>Detail</span>
                  </button>

                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'picked-up')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                      Pickup</button>
                  )}

                  {order.status === 'picked-up' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'in-transit')}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      Start Delivery
                    </button>
                  )}

                  {order.status === 'in-transit' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {(order.status === 'in-transit' || order.status === 'picked-up') && (
                    <button
                      onClick={() => navigate(`/distributor-dashboard/tracking?order=${order.id}`)}
                      className="px-4 py-2 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition"
                    >
                      <Navigation size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Detail Pesanan</h3>
                <p className="text-gray-600 mt-1">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold ${getStatusBadge(selectedOrder.status).color}`}>
                  {getStatusBadge(selectedOrder.status).icon}
                  <span>{getStatusBadge(selectedOrder.status).label}</span>
                </span>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Delivery Fee</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(selectedOrder.deliveryFee)}</p>
                </div>
              </div>

              {/* UMKM Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Customer Info</h4>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                      {selectedOrder.umkmLogo}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedOrder.umkmName}</p>
                      <p className="text-sm text-gray-600">{selectedOrder.umkmContact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 pt-2 border-t border-blue-100">
                    <Phone size={14} />
                    <span>{selectedOrder.umkmContact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Route Details */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Route Details</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-xs text-green-700 font-semibold mb-1">PICKUP LOCATION</p>
                        <p className="text-sm text-gray-900">{selectedOrder.pickupAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-red-400"></div>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-xs text-red-700 font-semibold mb-1">DELIVERY LOCATION</p>
                        <p className="text-sm text-gray-900">{selectedOrder.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Distance</p>
                      <p className="text-lg font-bold text-gray-900">{selectedOrder.distance}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Total Weight</p>
                      <p className="text-lg font-bold text-gray-900">{selectedOrder.totalWeight} kg</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Items to Deliver</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Package className="text-gray-400" size={20} />
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.weight} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-white" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Order Created</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedOrder.orderDate)}</p>
                    </div>
                  </div>

                  {selectedOrder.pickedUpDate && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Picked Up</p>
                        <p className="text-sm text-gray-600">{formatDate(selectedOrder.pickedUpDate)}</p>
                      </div>
                    </div>
                  )}

                  {selectedOrder.deliveredDate && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Delivered</p>
                        <p className="text-sm text-gray-600">{formatDate(selectedOrder.deliveredDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">📝 Notes:</p>
                  <p className="text-sm text-gray-700">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Review */}
              {selectedOrder.review && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-yellow-500">
                      {'⭐'.repeat(selectedOrder.rating)}
                    </div>
                    <span className="font-semibold text-gray-900">{selectedOrder.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-700">{selectedOrder.review}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'picked-up')}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    {isLoading ? 'Processing...' : 'Confirm Pickup'}
                  </button>
                )}

                {selectedOrder.status === 'picked-up' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'in-transit')}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                  >
                    Start Delivery
                  </button>
                )}

                {selectedOrder.status === 'in-transit' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}