import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Ban,
  Eye,
  Edit,
  Trash2,
  Download,
  X,
  Building2,
  TrendingUp,
  Package,
  Truck,
  AlertCircle
} from 'lucide-react';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Roles
  const roles = [
    { id: 'all', name: 'Semua Role', icon: <Users size={18} />, count: 1247 },
    { id: 'umkm', name: 'UMKM Owner', icon: <Building2 size={18} />, count: 456 },
    { id: 'investor', name: 'Investor', icon: <TrendingUp size={18} />, count: 312 },
    { id: 'supplier', name: 'Supplier', icon: <Package size={18} />, count: 289 },
    { id: 'distributor', name: 'Distributor', icon: <Truck size={18} />, count: 190 }
  ];

  // Dummy Users Data
  const allUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '08123456789',
      role: 'investor',
      status: 'active',
      verified: true,
      registeredAt: '15 Jan 2024',
      lastActive: '2 jam lalu',
      location: 'Jakarta',
      totalTransactions: 5,
      totalInvestment: 150000000
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@warungkopi.com',
      phone: '08198765432',
      role: 'umkm',
      status: 'active',
      verified: true,
      registeredAt: '12 Jan 2024',
      lastActive: '1 hari lalu',
      location: 'Bandung',
      umkmName: 'Warung Kopi Nusantara',
      totalRevenue: 125000000
    },
    {
      id: 3,
      name: 'Robert Wilson',
      email: 'robert@supplier.com',
      phone: '08156781234',
      role: 'supplier',
      status: 'active',
      verified: true,
      registeredAt: '10 Jan 2024',
      lastActive: '5 jam lalu',
      location: 'Surabaya',
      companyName: 'CV Supplier Bahan Baku',
      totalOrders: 45
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah@pending.com',
      phone: '08167894561',
      role: 'umkm',
      status: 'pending',
      verified: false,
      registeredAt: '8 Jan 2024',
      lastActive: '3 jam lalu',
      location: 'Yogyakarta',
      umkmName: 'Bakery Sederhana'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@distributor.com',
      phone: '08145678912',
      role: 'distributor',
      status: 'suspended',
      verified: true,
      registeredAt: '5 Jan 2024',
      lastActive: '1 minggu lalu',
      location: 'Tangerang',
      companyName: 'PT Distribusi Express',
      totalDeliveries: 120
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@investor.com',
      phone: '08178945612',
      role: 'investor',
      status: 'active',
      verified: true,
      registeredAt: '3 Jan 2024',
      lastActive: '4 jam lalu',
      location: 'Jakarta',
      totalTransactions: 8,
      totalInvestment: 250000000
    },
    {
      id: 7,
      name: 'David Martinez',
      email: 'david@umkm.com',
      phone: '08134567891',
      role: 'umkm',
      status: 'active',
      verified: true,
      registeredAt: '1 Jan 2024',
      lastActive: '6 jam lalu',
      location: 'Semarang',
      umkmName: 'Tani Organik Sejahtera',
      totalRevenue: 200000000
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa@supplier.com',
      phone: '08189456123',
      role: 'supplier',
      status: 'pending',
      verified: false,
      registeredAt: '28 Des 2023',
      lastActive: '2 hari lalu',
      location: 'Malang',
      companyName: 'Supplier Kemasan'
    }
  ];

  // Filter users
  const filteredUsers = allUsers.filter(user => {
    if (selectedRole !== 'all' && user.role !== selectedRole) return false;
    if (selectedStatus !== 'all' && user.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query)
      );
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const getRoleIcon = (role) => {
    const icons = {
      umkm: <Building2 size={16} />,
      investor: <TrendingUp size={16} />,
      supplier: <Package size={16} />,
      distributor: <Truck size={16} />
    };
    return icons[role];
  };

  const getRoleName = (role) => {
    const names = {
      umkm: 'UMKM Owner',
      investor: 'Investor',
      supplier: 'Supplier',
      distributor: 'Distributor'
    };
    return names[role];
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      suspended: 'bg-red-100 text-red-700'
    };
    const labels = {
      active: 'Active',
      pending: 'Pending',
      suspended: 'Suspended'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Users</h1>
          <p className="text-gray-600 mt-1">
            Manage semua user terdaftar di platform
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          <Download size={20} />
          <span>Export Data</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedRole === role.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className={selectedRole === role.id ? 'text-blue-600' : 'text-gray-600'}>
                {role.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{role.name}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{role.count}</div>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, email, atau nomor telepon..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition"
            >
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Menampilkan <span className="font-semibold text-gray-900">{filteredUsers.length}</span> dari{' '}
          <span className="font-semibold text-gray-900">{allUsers.length}</span> users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Role</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Terdaftar</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Last Active</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          {user.verified && (
                            <UserCheck size={16} className="text-blue-600" />
                          )}
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="text-xs text-gray-600 flex items-center space-x-1">
                            <Mail size={12} />
                            <span>{user.email}</span>
                          </p>
                          <p className="text-xs text-gray-600 flex items-center space-x-1">
                            <Phone size={12} />
                            <span>{user.phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-600">
                        {getRoleIcon(user.role)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {getRoleName(user.role)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>{user.registeredAt}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{user.lastActive}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserDetail(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Detail"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Edit User"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showUserDetail && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">User Detail</h3>
              <button
                onClick={() => setShowUserDetail(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h4>
                    {selectedUser.verified && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <UserCheck size={14} />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Mail size={16} />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedUser.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Phone size={16} />
                    <span className="text-sm font-medium">Telepon</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedUser.phone}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Role</span>
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(selectedUser.role)}
                    <span className="font-semibold text-gray-900">{getRoleName(selectedUser.role)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Lokasi</span>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-600" />
                    <span className="font-semibold text-gray-900">{selectedUser.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Terdaftar</span>
                  <span className="font-semibold text-gray-900">{selectedUser.registeredAt}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-semibold text-gray-900">{selectedUser.lastActive}</span>
                </div>
              </div>

              {/* Role-specific info */}
              {selectedUser.role === 'investor' && selectedUser.totalInvestment && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Investment Info</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Transaksi</span>
                      <span className="text-sm font-semibold text-gray-900">{selectedUser.totalTransactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Investasi</span>
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(selectedUser.totalInvestment)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                {selectedUser.status === 'pending' && (
                  <button className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2">
                    <UserCheck size={20} />
                    <span>Approve User</span>
                  </button>
                )}
                {selectedUser.status === 'active' && (
                  <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center space-x-2">
                    <Ban size={20} />
                    <span>Suspend User</span>
                  </button>
                )}
                {selectedUser.status === 'suspended' && (
                  <button className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2">
                    <UserCheck size={20} />
                    <span>Activate User</span>
                  </button>
                )}
                <button className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}