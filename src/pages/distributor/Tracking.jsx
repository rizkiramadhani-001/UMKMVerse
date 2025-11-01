// ============================================================================
// src/pages/distributor/Tracking.jsx
// ============================================================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Navigation,
  MapPin,
  Truck,
  Clock,
  Phone,
  User,
  Package,
  CheckCircle,
  Circle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export function DistributorTracking() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch Active Orders
  useEffect(() => {
    const fetchActiveOrders = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/distributor/orders/active-tracking', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setActiveOrders(data.orders);
        // 
        // if (orderId) {
        //   const order = data.orders.find(o => o.id === orderId);
        //   setSelectedOrder(order);
        // } else if (data.orders.length > 0) {
        //   setSelectedOrder(data.orders[0]);
        // }

        // Dummy data - hapus setelah integrate
        setTimeout(() => {
          const dummyOrders = [
            {
              id: 'DIS-002',
              orderNumber: 'DIST-2024-002',
              umkmName: 'Bakery Roti Hangat',
              umkmLogo: '🍞',
              pickupAddress: 'Jl. Ahmad Yani No. 45, Surabaya',
              deliveryAddress: 'Jl. Pahlawan No. 99, Surabaya',
              status: 'in-transit',
              currentLocation: {
                lat: -7.2575,
                lng: 112.7521,
                address: 'Jl. Pemuda, Surabaya'
              },
              estimatedArrival: '2024-10-29T10:00:00',
              totalWeight: 35,
              distance: '12 km',
              progress: 45,
              route: [
                { lat: -7.2504, lng: 112.7419, type: 'pickup', label: 'Pickup Point' },
                { lat: -7.2575, lng: 112.7521, type: 'current', label: 'Current Location' },
                { lat: -7.2684, lng: 112.7698, type: 'delivery', label: 'Delivery Point' }
              ]
            },
            {
              id: 'DIS-003',
              orderNumber: 'DIST-2024-003',
              umkmName: 'Tani Organik Sejahtera',
              umkmLogo: '🌾',
              pickupAddress: 'Jl. Raya Bandung No. 88, Bandung',
              deliveryAddress: 'Jl. Cihampelas No. 123, Bandung',
              status: 'in-transit',
              currentLocation: {
                lat: -6.9175,
                lng: 107.6191,
                address: 'Jl. Pasteur, Bandung'
              },
              estimatedArrival: '2024-10-28T14:00:00',
              totalWeight: 50,
              distance: '15 km',
              progress: 65,
              route: [
                { lat: -6.9033, lng: 107.6186, type: 'pickup', label: 'Pickup Point' },
                { lat: -6.9175, lng: 107.6191, type: 'current', label: 'Current Location' },
                { lat: -6.9147, lng: 107.6098, type: 'delivery', label: 'Delivery Point' }
              ]
            }
          ];
          
          setActiveOrders(dummyOrders);
          
          if (orderId) {
            const order = dummyOrders.find(o => o.id === orderId);
            setSelectedOrder(order || dummyOrders[0]);
          } else {
            setSelectedOrder(dummyOrders[0]);
          }
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching active orders:', error);
        setIsLoading(false);
      }
    };

    fetchActiveOrders();
    
    // TODO: Setup real-time updates (WebSocket or polling)
    // const interval = setInterval(() => {
    //   fetchActiveOrders();
    // }, 30000); // Update every 30 seconds
    // 
    // return () => clearInterval(interval);
  }, [orderId]);

  // TODO: Integrate dengan backend - Update Location
  const handleUpdateLocation = async () => {
    try {
      // TODO: Get current GPS location
      // navigator.geolocation.getCurrentPosition(async (position) => {
      //   const { latitude, longitude } = position.coords;
      //   
      //   const response = await fetch(`/api/distributor/orders/${selectedOrder.id}/location`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       lat: latitude,
      //       lng: longitude,
      //       timestamp: new Date().toISOString()
      //     })
      //   });
      // });

      alert('📍 Location updated!');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };
  // ============================================================

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (estimatedArrival) => {
    const now = new Date();
    const arrival = new Date(estimatedArrival);
    const diff = arrival - now;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 0) return 'Overdue';
    if (minutes < 60) return `${minutes} min`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tracking data...</p>
        </div>
      </div>
    );
  }

  if (activeOrders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Truck className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Deliveries</h3>
          <p className="text-gray-600">Tidak ada pengiriman yang sedang berlangsung</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real-time Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor pengiriman aktif secara real-time</p>
        </div>
        <button
          onClick={handleUpdateLocation}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          <RefreshCw size={20} />
          <span>Update Location</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Orders List */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Active Deliveries ({activeOrders.length})</h3>
          
          {activeOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`bg-white rounded-2xl shadow-sm border-2 p-4 cursor-pointer transition ${
                selectedOrder?.id === order.id
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-100 hover:border-purple-300'
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {order.umkmLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600 truncate">{order.umkmName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-bold text-purple-600">{order.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full transition-all"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>ETA: {getTimeRemaining(order.estimatedArrival)}</span>
                  </span>
                  <span>{order.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map & Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedOrder && (
            <>
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-96 bg-gradient-to-br from-purple-100 to-blue-100">
                  {/* This would be replaced with actual Google Maps / Leaflet / Mapbox */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="mx-auto text-purple-600 mb-4" size={64} />
                      <p className="text-gray-700 font-semibold mb-2">Map Integration Placeholder</p>
                      <p className="text-sm text-gray-600">
                        Current: {selectedOrder.currentLocation.address}
                      </p>
                    </div>
                  </div>

                  {/* Route Points Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="space-y-3">
                      {selectedOrder.route.map((point, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            point.type === 'pickup' ? 'bg-green-500' :
                            point.type === 'current' ? 'bg-purple-600 animate-pulse' :
                            'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{point.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Delivery Details</h3>

                <div className="space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                      {selectedOrder.umkmLogo}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedOrder.umkmName}</p>
                      <p className="text-sm text-gray-600">{selectedOrder.orderNumber}</p>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-start space-x-2">
                        <MapPin className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs text-green-700 font-semibold mb-1">PICKUP</p>
                          <p className="text-sm text-gray-900">{selectedOrder.pickupAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-start space-x-2">
                        <MapPin className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs text-red-700 font-semibold mb-1">DELIVERY</p>
                          <p className="text-sm text-gray-900">{selectedOrder.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Distance</p>
                      <p className="text-lg font-bold text-gray-900">{selectedOrder.distance}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Weight</p>
                      <p className="text-lg font-bold text-gray-900">{selectedOrder.totalWeight} kg</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">ETA</p>
                      <p className="text-lg font-bold text-purple-600">{getTimeRemaining(selectedOrder.estimatedArrival)}</p>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900">Current Status</span>
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold">
                        In Transit
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Navigation className="text-purple-600 flex-shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedOrder.currentLocation.address}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last updated: {new Date().toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">Delivery Progress</span>
                      <span className="text-sm font-bold text-purple-600">{selectedOrder.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-purple-700 h-4 rounded-full transition-all flex items-center justify-end pr-2"
                        style={{ width: `${selectedOrder.progress}%` }}
                      >
                        {selectedOrder.progress > 20 && (
                          <Truck className="text-white" size={14} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleUpdateLocation}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      <Navigation size={18} />
                      <span>Update Location</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-purple-300 hover:text-purple-600 transition">
                      <Phone size={18} />
                      <span>Call Customer</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Delivery Timeline</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white" size={20} />
                      </div>
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-green-300"></div>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-semibold text-gray-900">Order Accepted</p>
                      <p className="text-sm text-gray-600">Ready for pickup</p>
                      <p className="text-xs text-gray-500 mt-1">Completed</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white" size={20} />
                      </div>
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-purple-300"></div>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-semibold text-gray-900">Picked Up</p>
                      <p className="text-sm text-gray-600">{selectedOrder.pickupAddress}</p>
                      <p className="text-xs text-gray-500 mt-1">Completed</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Truck className="text-white" size={20} />
                      </div>
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-semibold text-gray-900">In Transit</p>
                      <p className="text-sm text-gray-600">Currently at: {selectedOrder.currentLocation.address}</p>
                      <p className="text-xs text-purple-600 mt-1 font-semibold">In Progress - {selectedOrder.progress}%</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Circle className="text-gray-400" size={20} />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-semibold text-gray-500">Delivery</p>
                      <p className="text-sm text-gray-500">{selectedOrder.deliveryAddress}</p>
                      <p className="text-xs text-gray-400 mt-1">Pending - ETA {formatDate(selectedOrder.estimatedArrival)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
          <div>
            <p className="font-semibold text-gray-900 mb-2">📱 Real-time Tracking Tips:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Klik "Update Location" untuk memperbarui posisi Anda secara manual</li>
              <li>• Pastikan GPS aktif untuk tracking yang akurat</li>
              <li>• Hubungi customer jika ada kendala pengiriman</li>
              <li>• Update status saat pickup dan delivery selesai</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}