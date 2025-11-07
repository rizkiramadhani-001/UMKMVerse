import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Settings,
  Package,
  Truck,
  Users,
  BarChart3,
  Briefcase,
  ShoppingCart,
  FileCheck,
  UserCheck
} from 'lucide-react';

export default function DashboardSidebar({ role }) {
  const location = useLocation();

  // Menu items berdasarkan role
  const menuItems = {
    umkm: [
      { path: '/umkm-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { path: '/umkm-dashboard/profile', icon: <Building2 size={20} />, label: 'Profil UMKM' },
      { path: '/umkm-dashboard/finance', icon: <TrendingUp size={20} />, label: 'Keuangan' },
      { path: '/umkm-dashboard/contracts', icon: <FileText size={20} />, label: 'Kontrak' },
      { path: '/umkm-dashboard/browse', icon: <Building2 size={20} />, label: 'Browse Supplier' },
      // { path: '/umkm-dashboard/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
      { path: '/umkm-dashboard/chat', icon: <MessageSquare size={20} />, label: 'Chat' },
      { path: '/umkm-dashboard/settings', icon: <Settings size={20} />, label: 'Pengaturan' }
    ],
    investor: [
      { path: '/investor-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { path: '/investor-dashboard/portfolio', icon: <Briefcase size={20} />, label: 'Portfolio' },
      { path: '/investor-dashboard/browse', icon: <Building2 size={20} />, label: 'Browse UMKM' },
      { path: '/investor-dashboard/analytics', icon: <BarChart3 size={20} />, label: 'Analytics ROI' },
      { path: '/investor-dashboard/profit-sharing', icon: <TrendingUp size={20} />, label: 'Bagi Hasil' },
      { path: '/investor-dashboard/contracts', icon: <FileText size={20} />, label: 'Kontrak' },
      { path: '/investor-dashboard/chat', icon: <MessageSquare size={20} />, label: 'Chat' },
      { path: '/investor-dashboard/settings', icon: <Settings size={20} />, label: 'Pengaturan' }
    ],
    supplier: [
      { path: '/supplier-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { path: '/supplier-dashboard/profile', icon: <Building2 size={20} />, label: 'Profile' },
      { path: '/supplier-dashboard/browse', icon: <Building2 size={20} />, label: 'Browse Distributor' },

      { path: '/supplier-dashboard/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
      { path: '/supplier-dashboard/products', icon: <Package size={20} />, label: 'Produk' },
      { path: '/supplier-dashboard/contracts', icon: <FileText size={20} />, label: 'Kontrak' },
      { path: '/supplier-dashboard/chat', icon: <MessageSquare size={20} />, label: 'Chat' },
      { path: '/supplier-dashboard/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
      

    ],
    distributor: [
      { path: '/distributor-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { path: '/distributor-dashboard/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
      { path: '/distributor-dashboard/contracts', icon: <FileText size={20} />, label: 'Kontrak' },
      { path: '/distributor-dashboard/chat', icon: <MessageSquare size={20} />, label: 'Chat' },
      { path: '/distributor-dashboard/settings', icon: <Settings size={20} />, label: 'Pengaturan' }
    ],
    admin: [
      { path: '/admin-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { path: '/admin-dashboard/users', icon: <Users size={20} />, label: 'Kelola User' },
      { path: '/admin-dashboard/umkm', icon: <Building2 size={20} />, label: 'Kelola UMKM' },
      { path: '/admin-dashboard/verification', icon: <UserCheck size={20} />, label: 'Verifikasi' },
      { path: '/admin-dashboard/transactions', icon: <TrendingUp size={20} />, label: 'Transaksi' },
      { path: '/admin-dashboard/forum', icon: <MessageSquare size={20} />, label: 'Forum' },
      { path: '/admin-dashboard/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
      { path: '/admin-dashboard/settings', icon: <Settings size={20} />, label: 'Pengaturan' }
    ]
  };

  const currentMenuItems = menuItems[role] || [];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg"></div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            UMKMVerse
          </span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {currentMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User Info Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">User Name</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}