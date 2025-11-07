// src/components/DashboardTopbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, LogOut, User, Settings } from 'lucide-react';
import echo from '../../utils/echo';
import axios from 'axios';

export default function DashboardTopbar({ title = 'Dashboard' }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    sessionStorage.clear();
    alert('Logout berhasil!');
    navigate('/login');
  };

  // Fetch user and subscribe to Reverb
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get('http://127.0.0.1:8000/api/getMe', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setUser(userRes.data);
        console.log('Authenticated user:', userRes.data);

        // Fetch user chats
        const chatRes = await axios.get('http://127.0.0.1:8000/api/chats', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        console.log('Fetched chats:', chatRes.data);

        // Subscribe to each chat channel
        chatRes.data.forEach((chat) => {
          const channel = echo.channel(`broadcast.${chat.id}`);
          console.log('Subscribed to channel:', `broadcast.${chat.id}`);
          channel.listen('.message.sent', (data) => {
            console.log('🔔 New message notification:', data);
            setNotifications((prev) => [
              {
                ...data.message,
                title: 'Pesan Baru',
                message: data.message.message,
                time: new Date(data.message.created_at).toLocaleTimeString(),
                unread: true,
                id: data.message.id,
              },
              ...prev,
            ]);
          });
        });
      } catch (err) {
        console.error('Failed to fetch user or subscribe channel:', err);
      }
    };

    fetchUser();
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Helper to generate initials
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Title & Search */}
        <div className="flex items-center space-x-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500 px-4 py-3">Belum ada notifikasi</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${
                          notif.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {notif.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Lihat Semua
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(user?.name)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {user ? user.name : 'Loading...'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user ? user.role : 'Fetching...'}
                </p>
              </div>
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                <Link
                  to="/umkm-dashboard/profile"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <User size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Profil Saya</span>
                </Link>
                <Link
                  to="/umkm-dashboard/settings"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <Settings size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Pengaturan</span>
                </Link>
                <hr className="my-2 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition w-full text-left"
                >
                  <LogOut size={18} className="text-red-500" />
                  <span className="text-sm text-red-600 font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
                                                        