// src/pages/supplier/Orders.jsx
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  DollarSign,
  AlertCircle,
  User,
  MapPin,
  Phone,
  FileText,
  Send,
  X,
  ChevronRight
} from 'lucide-react';

export default function SupplierOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk data dari backend
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/supplier/orders', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setOrders(data.orders);

        // Dummy data - hapus setelah integrate dengan backend
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-001',
              orderNumber: 'PO-2024-001',
              umkmName: 'Warung Kopi Nusantara',
              umkmLogo: '☕',
              umkmContact: {
                phone: '+62 812-3456-7890',
                email: 'info@warungkopi.com',
                address: 'Jl. Mampang Raya No. 123, Jakarta Selatan'
              },
              items: [
                {
                  productId: 1,
                  productName: 'Biji Kopi Arabica Premium',
                  quantity: 50,
                  unit: 'kg',
                  price: 120000,
                  subtotal: 6000000
                },
                {
                  productId: 3,
                  productName: 'Kemasan Plastik Food Grade',
                  quantity: 200,
                  unit: 'pcs',
                  price: 500,
                  subtotal: 100000
                }
              ],
              totalAmount: 6100000,
              status: 'pending',
              orderDate: '2024-10-28T10:30:00',
              requestedDeliveryDate: '2024-11-05',
              notes: 'Mohon dikirim sebelum tanggal 5 November. Pastikan kualitas premium.',
              paymentStatus: 'unpaid',
              deliveryAddress: 'Jl. Mampang Raya No. 123, Jakarta Selatan 12790'
            },
            {
              id: 'ORD-002',
              orderNumber: 'PO-2024-002',
              umkmName: 'Bakery Roti Hangat',
              umkmLogo: '🍞',
              umkmContact: {
                phone: '+62 813-9876-5432',
                email: 'order@bakeryroti.com',
                address: 'Jl. Ahmad Yani No. 45, Surabaya'
              },
              items: [
                {
                  productId: 2,
                  productName: 'Tepung Terigu Protein Tinggi',
                  quantity: 100,
                  unit: 'kg',
                  price: 18000,
                  subtotal: 1800000
                }
              ],
              totalAmount: 1800000,
              status: 'processing',
              orderDate: '2024-10-27T14:20:00',
              requestedDeliveryDate: '2024-11-02',
              notes: 'Urgent order. Butuh cepat untuk produksi minggu ini.',
              paymentStatus: 'paid',
              paymentMethod: 'Transfer Bank',
              paymentDate: '2024-10-27T15:00:00',
              deliveryAddress: 'Jl. Ahmad Yani No. 45, Surabaya, Jawa Timur'
            },
            {
              id: 'ORD-003',
              orderNumber: 'PO-2024-003',
              umkmName: 'Tani Organik Sejahtera',
              umkmLogo: '🌾',
              umkmContact: {
                phone: '+62 815-1234-5678',
                email: 'supply@taniorganik.com',
                address: 'Jl. Raya Bandung No. 88, Bandung'
              },
              items: [
                {
                  productId: 4,
                  productName: 'Pupuk Organik Kompos',
                  quantity: 200,
                  unit: 'kg',
                  price: 25000,
                  subtotal: 5000000
                }
              ],
              totalAmount: 5000000,
              status: 'shipped',
              orderDate: '2024-10-25T09:15:00',
              requestedDeliveryDate: '2024-11-01',
              shippedDate: '2024-10-28T08:00:00',
              trackingNumber: 'JNE123456789',
              notes: 'Tolong dikemas dengan baik, produk organik.',
              paymentStatus: 'paid',
              paymentMethod: 'Transfer Bank',
              paymentDate: '2024-10-25T10:00:00',
              deliveryAddress: 'Jl. Raya Bandung No. 88, Bandung, Jawa Barat'
            },
            {
              id: 'ORD-004',
              orderNumber: 'PO-2024-004',
              umkmName: 'Laundry Express 24/7',
              umkmLogo: '🧺',
              umkmContact: {
                phone: '+62 817-5555-4444',
                email: 'procurement@laundryexpress.com',
                address: 'Jl. Sudirman No. 99, Jakarta Pusat'
              },
              items: [
                {
                  productId: 3,
                  productName: 'Kemasan Plastik Food Grade',
                  quantity: 500,
                  unit: 'pcs',
                  price: 500,
                  subtotal: 250000
                }
              ],
              totalAmount: 250000,
              status: 'delivered',
              orderDate: '2024-10-20T11:45:00',
              requestedDeliveryDate: '2024-10-28',
              shippedDate: '2024-10-24T08:00:00',
              deliveredDate: '2024-10-27T14:30:00',
              trackingNumber: 'TIKI987654321',
              notes: null,
              paymentStatus: 'paid',
              paymentMethod: 'Transfer Bank',
              paymentDate: '2024-10-20T12:00:00',
              deliveryAddress: 'Jl. Sudirman No. 99, Jakarta Pusat',
              rating: 5,
              review: 'Pengiriman cepat dan produk sesuai. Terima kasih!'
            },
            {
              id: 'ORD-005',
              orderNumber: 'PO-2024-005',
              umkmName: 'Warung Kopi Nusantara',
              umkmLogo: '☕',
              umkmContact: {
                phone: '+62 812-3456-7890',
                email: 'info@warungkopi.com',
                address: 'Jl. Mampang Raya No. 123, Jakarta Selatan'
              },
              items: [
                {
                  productId: 1,
                  productName: 'Biji Kopi Arabica Premium',
                  quantity: 30,
                  unit: 'kg',
                  price: 120000,
                  subtotal: 3600000
                }
              ],
              totalAmount: 3600000,
              status: 'cancelled',
              orderDate: '2024-10-22T16:20:00',
              requestedDeliveryDate: '2024-10-30',
              cancelledDate: '2024-10-23T09:00:00',
              cancelReason: 'Stok tidak tersedia untuk tanggal yang diminta',
              notes: 'Butuh kualitas terbaik untuk event khusus',
              paymentStatus: 'refunded',
              deliveryAddress: 'Jl. Mampang Raya No. 123, Jakarta Selatan 12790'
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
        // const response = await fetch('/api/supplier/orders/stats', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setStats(data);

        // Dummy data - hapus setelah integrate
        setStats({
          totalOrders: 245,
          pendingOrders: 8,
          processingOrders: 12,
          shippedOrders: 15,
          totalRevenue: 85000000,
          revenueGrowth: 12.5
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
      // const response = await fetch(`/api/supplier/orders/${orderId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     status: newStatus,
      //     ...(newStatus === 'shipped' && {
      //       trackingNumber: prompt('Masukkan nomor resi:'),
      //       shippedDate: new Date().toISOString()
      //     })
      //   })
      // });
      //
      // if (response.ok) {
      //   alert('✅ Status pesanan berhasil diupdate!');
      //   fetchOrders();
      // }

      // Simulasi - hapus setelah integrate
      let updateData = { status: newStatus };
      
      if (newStatus === 'shipped') {
        const trackingNumber = prompt('Masukkan nomor resi:');
        if (!trackingNumber) {
          setIsLoading(false);
          return;
        }
        updateData.trackingNumber = trackingNumber;
        updateData.shippedDate = new Date().toISOString();
      }

      setTimeout(() => {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, ...updateData } : order
        ));
        alert('✅ Status pesanan berhasil diupdate!');
        setIsLoading(false);
        setShowDetailModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('❌ Terjadi kesalahan. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  // TODO: Integrate dengan backend - Fetch Chat Messages
  const fetchChatMessages = async (orderId) => {
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/supplier/orders/${orderId}/messages`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // setChatMessages(data.messages);

      // Dummy data - hapus setelah integrate
      setChatMessages([
        {
          id: 1,
          sender: 'umkm',
          senderName: 'Warung Kopi Nusantara',
          message: 'Halo, untuk pesanan ini bisa dipercepat pengirimannya?',
          timestamp: '2024-10-28T11:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'supplier',
          senderName: 'Anda',
          message: 'Halo, untuk pengiriman tercepat adalah 3 hari kerja. Apakah bisa?',
          timestamp: '2024-10-28T11:15:00',
          read: true
        },
        {
          id: 3,
          sender: 'umkm',
          senderName: 'Warung Kopi Nusantara',
          message: 'Oke tidak masalah. Mohon pastikan kualitas premium ya.',
          timestamp: '2024-10-28T11:20:00',
          read: true
        }
      ]);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  // TODO: Integrate dengan backend - Send Message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/supplier/orders/${selectedOrder.id}/messages`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     message: newMessage
      //   })
      // });
      //
      // if (response.ok) {
      //   fetchChatMessages(selectedOrder.id);
      //   setNewMessage('');
      // }

      // Simulasi - hapus setelah integrate
      const newMsg = {
        id: chatMessages.length + 1,
        sender: 'supplier',
        senderName: 'Anda',
        message: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // TODO: Integrate dengan backend - Download Invoice
  const handleDownloadInvoice = async (orderId) => {
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/supplier/orders/${orderId}/invoice`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      //
      // if (response.ok) {
      //   const blob = await response.blob();
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = `invoice-${orderId}.pdf`;
      //   document.body.appendChild(a);
      //   a.click();
      //   a.remove();
      // }

      alert('Download invoice dimulai...');
    } catch (error) {
      console.error('Error downloading invoice:', error);
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
      processing: { color: 'bg-blue-100 text-blue-700', icon: <Package size={14} />, label: 'Processing' },
      shipped: { color: 'bg-purple-100 text-purple-700', icon: <Truck size={14} />, label: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} />, label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: <XCircle size={14} />, label: 'Cancelled' }
    };
    return badges[status] || badges.pending;
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      unpaid: { color: 'bg-red-100 text-red-700', label: 'Unpaid' },
      paid: { color: 'bg-green-100 text-green-700', label: 'Paid' },
      refunded: { color: 'bg-gray-100 text-gray-700', label: 'Refunded' }
    };
    return badges[status] || badges.unpaid;
  };

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const openChatModal = (order) => {
    setSelectedOrder(order);
    fetchChatMessages(order.id);
    setShowChatModal(true);
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.umkmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    let matchesPeriod = true;
    if (selectedPeriod !== 'all') {
      const orderDate = new Date(order.orderDate);
      const now = new Date();
      const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
      
      if (selectedPeriod === 'today') matchesPeriod = daysDiff === 0;
      else if (selectedPeriod === 'week') matchesPeriod = daysDiff <= 7;
      else if (selectedPeriod === 'month') matchesPeriod = daysDiff <= 30;
    }
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Pesanan</h1>
        <p className="text-gray-600 mt-1">Manage pesanan dari UMKM</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ShoppingCart className="text-blue-600" size={20} />
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
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="text-blue-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Processing</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.processingOrders}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Truck className="text-purple-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Shipped</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.shippedOrders}</p>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-sm border-2 border-orange-200 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-orange-600 rounded-lg">
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
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor pesanan atau nama UMKM..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Period Filter */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Semua Periode</option>
            <option value="today">Hari Ini</option>
            <option value="week">7 Hari Terakhir</option>
            <option value="month">30 Hari Terakhir</option>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada pesanan</h3>
          <p className="text-gray-600">
            {searchQuery || selectedStatus !== 'all' || selectedPeriod !== 'all'
              ? 'Tidak ada pesanan yang sesuai dengan filter'
              : 'Belum ada pesanan masuk'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusBadge = getStatusBadge(order.status);
            const paymentBadge = getPaymentStatusBadge(order.paymentStatus);

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {/* UMKM Logo */}
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center text-3xl">
                      {order.umkmLogo}
                    </div>

                    {/* Order Info */}
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                          {statusBadge.icon}
                          <span>{statusBadge.label}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentBadge.color}`}>
                          {paymentBadge.label}
                        </span>
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

                  {/* Total Amount */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="text-2xl font-bold text-orange-600">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>

                {/* Order Items Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">
                          {item.productName} <span className="text-gray-500">x{item.quantity} {item.unit}</span>
                        </span>
                        <span className="font-semibold text-gray-900">{formatCurrency(item.subtotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Truck size={16} />
                    <span>Tracking: <span className="font-mono font-semibold text-gray-900">{order.trackingNumber}</span></span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openDetailModal(order)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    <Eye size={18} />
                    <span>Detail</span>
                  </button>

                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'processing')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                      Terima Pesanan
                    </button>
                  )}

                  {order.status === 'processing' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      Kirim Pesanan
                    </button>
                  )}

                  <button
                    onClick={() => openChatModal(order)}
                    className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-orange-300 hover:text-orange-600 transition"
                  >
                    <MessageSquare size={18} />
                  </button>

                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-orange-300 hover:text-orange-600 transition"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
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
              {/* Status Section */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold ${getStatusBadge(selectedOrder.status).color}`}>
                    {getStatusBadge(selectedOrder.status).icon}
                    <span>{getStatusBadge(selectedOrder.status).label}</span>
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${getPaymentStatusBadge(selectedOrder.paymentStatus).color}`}>
                    {getPaymentStatusBadge(selectedOrder.paymentStatus).label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(selectedOrder.totalAmount)}</p>
                </div>
              </div>

              {/* UMKM Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Informasi UMKM</h4>
                <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                      {selectedOrder.umkmLogo}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedOrder.umkmName}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{selectedOrder.umkmContact.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-gray-600 pt-2 border-t border-blue-100">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{selectedOrder.umkmContact.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Item Pesanan</h4>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Produk</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Qty</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Harga</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">{item.productName}</p>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-semibold text-gray-900">{item.quantity} {item.unit}</span>
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="font-bold text-gray-900">{formatCurrency(item.subtotal)}</span>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300 bg-gray-50">
                        <td colSpan="3" className="py-3 px-4 text-right font-bold text-gray-900">
                          TOTAL
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-xl font-bold text-orange-600">{formatCurrency(selectedOrder.totalAmount)}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Tanggal Pengiriman</h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar size={18} />
                      <span>{formatDate(selectedOrder.requestedDeliveryDate)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Alamat Pengiriman</h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start space-x-2 text-gray-700">
                      <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                      <span>{selectedOrder.deliveryAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              {selectedOrder.paymentStatus === 'paid' && selectedOrder.paymentMethod && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Informasi Pembayaran</h4>
                  <div className="bg-green-50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Metode Pembayaran:</span>
                      <span className="font-semibold text-gray-900">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Tanggal Pembayaran:</span>
                      <span className="font-semibold text-gray-900">{formatDate(selectedOrder.paymentDate)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tracking Info */}
              {selectedOrder.trackingNumber && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Informasi Pengiriman</h4>
                  <div className="bg-purple-50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Nomor Resi:</span>
                      <span className="font-mono font-bold text-gray-900">{selectedOrder.trackingNumber}</span>
                    </div>
                    {selectedOrder.shippedDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Tanggal Kirim:</span>
                        <span className="font-semibold text-gray-900">{formatDate(selectedOrder.shippedDate)}</span>
                      </div>
                    )}
                    {selectedOrder.deliveredDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Tanggal Terkirim:</span>
                        <span className="font-semibold text-gray-900">{formatDate(selectedOrder.deliveredDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Catatan Pesanan</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-gray-700">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Cancel Reason */}
              {selectedOrder.cancelReason && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Alasan Pembatalan</h4>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-gray-700">{selectedOrder.cancelReason}</p>
                  </div>
                </div>
              )}

              {/* Review */}
              {selectedOrder.rating && selectedOrder.review && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Review dari UMKM</h4>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-yellow-500">
                        {'⭐'.repeat(selectedOrder.rating)}
                      </div>
                      <span className="font-semibold text-gray-900">{selectedOrder.rating}/5</span>
                    </div>
                    <p className="text-gray-700">{selectedOrder.review}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                      {isLoading ? 'Processing...' : 'Terima Pesanan'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Apakah Anda yakin ingin menolak pesanan ini?')) {
                          handleUpdateStatus(selectedOrder.id, 'cancelled');
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
                    >
                      Tolak Pesanan
                    </button>
                  </>
                )}

                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                  >
                    {isLoading ? 'Processing...' : 'Tandai Sudah Dikirim'}
                  </button>
                )}

                <button
                  onClick={() => handleDownloadInvoice(selectedOrder.id)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Chat dengan {selectedOrder.umkmName}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'supplier' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.sender === 'supplier' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl p-4`}>
                    <p className="text-sm font-semibold mb-1">{msg.senderName}</p>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-2 ${msg.sender === 'supplier' ? 'text-orange-100' : 'text-gray-500'}`}>
                      {formatDate(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tulis pesan..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}