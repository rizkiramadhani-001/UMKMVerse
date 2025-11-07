// src/pages/umkm/Orders.jsx
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  DollarSign,
  Calendar,
  User,
  Eye,
  Download,
  MapPin,
  Phone,
  CreditCard
} from 'lucide-react';

export default function UMKMOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all'); // all, pending, processing, shipped, delivered, cancelled
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0
  });

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH ORDERS
  // ========================================
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch('/api/umkm/orders', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // EXPECTED RESPONSE FORMAT dari backend:
      // {
      //   success: true,
      //   data: {
      //     orders: [
      //       {
      //         id: "ORD-001",
      //         orderNumber: "ORD/2024/001",
      //         customerName: "PT Retail Maju",
      //         customerPhone: "08123456789",
      //         customerAddress: "Jl. Sudirman No. 123, Jakarta",
      //         products: [
      //           { name: "Kopi Arabica 1kg", quantity: 50, price: 150000 },
      //           { name: "Kopi Robusta 1kg", quantity: 30, price: 120000 }
      //         ],
      //         totalAmount: 11100000,
      //         paymentStatus: "paid", // pending, paid, failed
      //         paymentMethod: "transfer", // transfer, cash, credit_card
      //         orderStatus: "shipped", // pending, processing, shipped, delivered, cancelled
      //         createdAt: "2024-07-25T10:30:00Z",
      //         paidAt: "2024-07-25T14:00:00Z",
      //         shippedAt: "2024-07-26T09:00:00Z",
      //         deliveredAt: null,
      //         trackingNumber: "JNE123456789",
      //         courierName: "JNE",
      //         estimatedDelivery: "2024-07-28T00:00:00Z",
      //         notes: "Kirim pagi hari"
      //       }
      //     ],
      //     stats: {
      //       total: 156,
      //       pending: 12,
      //       processing: 25,
      //       shipped: 48,
      //       delivered: 65,
      //       cancelled: 6,
      //       totalRevenue: 125000000
      //     }
      //   }
      // }

      // DUMMY DATA - Hapus setelah integrasi backend
      setTimeout(() => {
        const dummyOrders = [
          {
            id: 'ORD-001',
            orderNumber: 'ORD/2024/001',
            customerName: 'PT Retail Maju',
            customerPhone: '08123456789',
            customerAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
            products: [
              { name: 'Kopi Arabica Premium 1kg', quantity: 50, price: 150000 },
              { name: 'Kopi Robusta 1kg', quantity: 30, price: 120000 }
            ],
            totalAmount: 11100000,
            paymentStatus: 'paid',
            paymentMethod: 'transfer',
            orderStatus: 'shipped',
            createdAt: '2024-07-25T10:30:00Z',
            paidAt: '2024-07-25T14:00:00Z',
            shippedAt: '2024-07-26T09:00:00Z',
            deliveredAt: null,
            trackingNumber: 'JNE123456789',
            courierName: 'JNE',
            estimatedDelivery: '2024-07-28T00:00:00Z',
            notes: 'Kirim pagi hari sebelum jam 10'
          },
          {
            id: 'ORD-002',
            orderNumber: 'ORD/2024/002',
            customerName: 'Toko Kopi Sejahtera',
            customerPhone: '08198765432',
            customerAddress: 'Jl. Gatot Subroto No. 45, Bandung',
            products: [
              { name: 'Kopi Arabica Premium 1kg', quantity: 100, price: 150000 }
            ],
            totalAmount: 15000000,
            paymentStatus: 'pending',
            paymentMethod: 'transfer',
            orderStatus: 'pending',
            createdAt: '2024-07-28T15:20:00Z',
            paidAt: null,
            shippedAt: null,
            deliveredAt: null,
            trackingNumber: null,
            courierName: null,
            estimatedDelivery: '2024-08-02T00:00:00Z',
            notes: ''
          },
          {
            id: 'ORD-003',
            orderNumber: 'ORD/2024/003',
            customerName: 'CV Distributor Nusantara',
            customerPhone: '08223334444',
            customerAddress: 'Jl. Ahmad Yani No. 67, Surabaya',
            products: [
              { name: 'Kopi Arabica Premium 1kg', quantity: 75, price: 150000 },
              { name: 'Kopi Robusta 1kg', quantity: 75, price: 120000 },
              { name: 'Kemasan Premium', quantity: 150, price: 5000 }
            ],
            totalAmount: 21000000,
            paymentStatus: 'paid',
            paymentMethod: 'credit_card',
            orderStatus: 'processing',
            createdAt: '2024-07-27T11:00:00Z',
            paidAt: '2024-07-27T11:15:00Z',
            shippedAt: null,
            deliveredAt: null,
            trackingNumber: null,
            courierName: 'SiCepat',
            estimatedDelivery: '2024-07-31T00:00:00Z',
            notes: 'Pastikan kemasan rapi'
          },
          {
            id: 'ORD-004',
            orderNumber: 'ORD/2024/004',
            customerName: 'Cafe Kopi Kenangan',
            customerPhone: '08155556666',
            customerAddress: 'Jl. Merdeka No. 89, Yogyakarta',
            products: [
              { name: 'Kopi Arabica Premium 1kg', quantity: 25, price: 150000 }
            ],
            totalAmount: 3750000,
            paymentStatus: 'paid',
            paymentMethod: 'cash',
            orderStatus: 'delivered',
            createdAt: '2024-07-20T08:30:00Z',
            paidAt: '2024-07-20T08:30:00Z',
            shippedAt: '2024-07-21T10:00:00Z',
            deliveredAt: '2024-07-23T14:30:00Z',
            trackingNumber: 'TIKI987654321',
            courierName: 'TIKI',
            estimatedDelivery: '2024-07-23T00:00:00Z',
            notes: 'COD - sudah diterima dengan baik'
          },
          {
            id: 'ORD-005',
            orderNumber: 'ORD/2024/005',
            customerName: 'Warung Kopi Bahagia',
            customerPhone: '08177778888',
            customerAddress: 'Jl. Diponegoro No. 12, Semarang',
            products: [
              { name: 'Kopi Robusta 1kg', quantity: 40, price: 120000 }
            ],
            totalAmount: 4800000,
            paymentStatus: 'failed',
            paymentMethod: 'transfer',
            orderStatus: 'cancelled',
            createdAt: '2024-07-26T16:45:00Z',
            paidAt: null,
            shippedAt: null,
            deliveredAt: null,
            trackingNumber: null,
            courierName: null,
            estimatedDelivery: null,
            notes: 'Pembayaran gagal - dibatalkan customer'
          }
        ];

        const dummyStats = {
          total: dummyOrders.length,
          pending: dummyOrders.filter(o => o.orderStatus === 'pending').length,
          processing: dummyOrders.filter(o => o.orderStatus === 'processing').length,
          shipped: dummyOrders.filter(o => o.orderStatus === 'shipped').length,
          delivered: dummyOrders.filter(o => o.orderStatus === 'delivered').length,
          cancelled: dummyOrders.filter(o => o.orderStatus === 'cancelled').length,
          totalRevenue: dummyOrders
            .filter(o => o.paymentStatus === 'paid')
            .reduce((sum, o) => sum + o.totalAmount, 0)
        };

        setOrders(dummyOrders);
        setStats(dummyStats);
        setIsLoading(false);
      }, 1000);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setOrders(data.data.orders);
      //   setStats(data.data.stats);
      // }
      // setIsLoading(false);

    } catch (error) {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
      alert('Gagal memuat data pesanan');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #3: UPDATE ORDER STATUS
  // ========================================
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (!confirm(`Ubah status pesanan menjadi "${newStatus}"?`)) return;

    try {
      // TODO: BACKEND - API untuk update order status
      // const response = await fetch(`/api/umkm/orders/${orderId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     status: newStatus,
      //     updatedAt: new Date().toISOString()
      //   })
      // });
      // const data = await response.json();

      // EXPECTED REQUEST BODY:
      // {
      //   status: "processing", // pending, processing, shipped, delivered, cancelled
      //   updatedAt: "2024-07-30T10:00:00Z",
      //   trackingNumber: "JNE123456789", // optional, required jika status = shipped
      //   courierName: "JNE" // optional, required jika status = shipped
      // }

      // EXPECTED RESPONSE:
      // {
      //   success: true,
      //   message: "Status pesanan berhasil diupdate",
      //   data: { ... updated order ... }
      // }

      // DUMMY - Hapus setelah integrasi
      alert(`✅ Status pesanan berhasil diubah menjadi "${newStatus}"!`);
      fetchOrders();

      // ACTUAL IMPLEMENTATION
      // if (data.success) {
      //   alert('✅ Status pesanan berhasil diupdate!');
      //   fetchOrders();
      // }

    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Gagal update status pesanan');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #4: GENERATE INVOICE
  // ========================================
  const handleGenerateInvoice = async (orderId) => {
    try {
      // TODO: BACKEND - API untuk generate dan download invoice PDF
      // const response = await fetch(`/api/umkm/orders/${orderId}/invoice`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `invoice_${orderId}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);

      // DUMMY - Hapus setelah integrasi
      alert('📄 Download Invoice (dummy - belum terintegrasi backend)');

    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Gagal generate invoice');
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (selectedTab !== 'all' && order.orderStatus !== selectedTab) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.trackingNumber?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Helper functions
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Pending',
        icon: <Clock size={16} />,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        nextAction: 'Proses Pesanan'
      },
      processing: {
        label: 'Diproses',
        icon: <Package size={16} />,
        className: 'bg-blue-100 text-blue-700 border-blue-200',
        nextAction: 'Kirim Pesanan'
      },
      shipped: {
        label: 'Dikirim',
        icon: <Truck size={16} />,
        className: 'bg-purple-100 text-purple-700 border-purple-200',
        nextAction: 'Tandai Selesai'
      },
      delivered: {
        label: 'Selesai',
        icon: <CheckCircle size={16} />,
        className: 'bg-green-100 text-green-700 border-green-200',
        nextAction: null
      },
      cancelled: {
        label: 'Dibatalkan',
        icon: <XCircle size={16} />,
        className: 'bg-red-100 text-red-700 border-red-200',
        nextAction: null
      }
    };
    return configs[status] || configs.pending;
  };

  const getPaymentStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Belum Bayar', className: 'bg-yellow-100 text-yellow-700' },
      paid: { label: 'Lunas', className: 'bg-green-100 text-green-700' },
      failed: { label: 'Gagal', className: 'bg-red-100 text-red-700' }
    };
    return configs[status] || configs.pending;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Pesanan</h1>
        <p className="text-gray-600 mt-1">Tracking pesanan dan pembayaran real-time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <ShoppingCart className="text-gray-600 mb-2" size={20} />
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-600">Total</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <Clock className="text-yellow-600 mb-2" size={20} />
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          <p className="text-xs text-gray-600">Pending</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <Package className="text-blue-600 mb-2" size={20} />
          <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
          <p className="text-xs text-gray-600">Diproses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <Truck className="text-purple-600 mb-2" size={20} />
          <p className="text-2xl font-bold text-gray-900">{stats.shipped}</p>
          <p className="text-xs text-gray-600">Dikirim</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <CheckCircle className="text-green-600 mb-2" size={20} />
          <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
          <p className="text-xs text-gray-600">Selesai</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <XCircle className="text-red-600 mb-2" size={20} />
          <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
          <p className="text-xs text-gray-600">Batal</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-4 text-white">
          <DollarSign className="mb-2" size={20} />
          <p className="text-lg font-bold">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-xs opacity-90">Revenue</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor order, customer, atau tracking..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1 overflow-x-auto">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'pending', label: 'Pending' },
              { id: 'processing', label: 'Diproses' },
              { id: 'shipped', label: 'Dikirim' },
              { id: 'delivered', label: 'Selesai' },
              { id: 'cancelled', label: 'Batal' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                  selectedTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-20">
            <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada pesanan</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Tidak ditemukan hasil pencarian' : 'Belum ada pesanan masuk'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.orderStatus);
            const paymentConfig = getPaymentStatusConfig(order.paymentStatus);

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.className}`}>
                        {statusConfig.icon}
                        <span>{statusConfig.label}</span>
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentConfig.className}`}>
                        {paymentConfig.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      {order.trackingNumber && (
                        <div className="flex items-center space-x-1">
                          <Truck size={14} />
                          <span>{order.courierName}: {order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Customer</label>
                    <div className="flex items-center space-x-2">
                      <User className="text-gray-400" size={16} />
                      <div>
                        <p className="font-semibold text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Alamat Pengiriman</label>
                    <div className="flex items-start space-x-2">
                      <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={16} />
                      <p className="text-sm text-gray-700">{order.customerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-4">
                  <label className="text-xs text-gray-600 mb-2 block">Produk</label>
                  <div className="space-y-2">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">Qty: {product.quantity} × {formatCurrency(product.price)}</p>
                          </div>
                        </div>
                        <p className="font-bold text-gray-900">{formatCurrency(product.quantity * product.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Catatan:</span> {order.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailModal(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition"
                  >
                    <Eye size={18} />
                    <span>Detail</span>
                  </button>

                  <button
                    onClick={() => handleGenerateInvoice(order.id)}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-green-300 hover:text-green-600 transition"
                  >
                    <Download size={18} />
                    <span>Invoice</span>
                  </button>

                  {statusConfig.nextAction && order.paymentStatus === 'paid' && (
                    <button
                      onClick={() => {
                        const statusMap = {
                          'Proses Pesanan': 'processing',
                          'Kirim Pesanan': 'shipped',
                          'Tandai Selesai': 'delivered'
                        };
                        handleUpdateOrderStatus(order.id, statusMap[statusConfig.nextAction]);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition ml-auto"
                    >
                      <Package size={18} />
                      <span>{statusConfig.nextAction}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Detail Pesanan</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-center text-gray-600 py-8">
                📦 Detail lengkap pesanan akan ditampilkan di sini
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}