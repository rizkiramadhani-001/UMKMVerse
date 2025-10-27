// src/pages/umkm/Contracts.jsx
import { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  FileSignature,
  Calendar,
  User,
  Building2,
  DollarSign
} from 'lucide-react';

export default function UMKMContracts() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all'); // all, pending, signed, expired
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  // State untuk menyimpan data contracts dari backend
  const [contracts, setContracts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    signed: 0,
    expired: 0
  });

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH CONTRACTS
  // ========================================
  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    setIsLoading(true);
    
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch('/api/umkm/contracts', {
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
      //     contracts: [
      //       {
      //         id: "CTR-001",
      //         contractNumber: "INV/2024/001",
      //         type: "investment", // investment, supplier, distributor
      //         partnerName: "John Doe",
      //         partnerType: "investor", // investor, supplier, distributor
      //         amount: 50000000,
      //         status: "signed", // pending, signed, expired, rejected
      //         createdAt: "2024-07-15T10:30:00Z",
      //         signedAt: "2024-07-20T14:20:00Z",
      //         expiryDate: "2025-07-15T00:00:00Z",
      //         contractUrl: "https://api.umkmverse.com/contracts/xxx.pdf",
      //         description: "Perjanjian investasi untuk pengembangan usaha"
      //       }
      //     ],
      //     stats: {
      //       total: 15,
      //       pending: 3,
      //       signed: 10,
      //       expired: 2
      //     }
      //   }
      // }

      // DUMMY DATA - Hapus setelah integrasi backend
      setTimeout(() => {
        const dummyContracts = [
          {
            id: 'CTR-001',
            contractNumber: 'INV/2024/001',
            type: 'investment',
            partnerName: 'John Doe',
            partnerType: 'investor',
            amount: 50000000,
            status: 'signed',
            createdAt: '2024-07-15T10:30:00Z',
            signedAt: '2024-07-20T14:20:00Z',
            expiryDate: '2025-07-15T00:00:00Z',
            contractUrl: '#',
            description: 'Perjanjian investasi untuk pengembangan usaha'
          },
          {
            id: 'CTR-002',
            contractNumber: 'SUP/2024/005',
            type: 'supplier',
            partnerName: 'CV Supplier Bahan Baku',
            partnerType: 'supplier',
            amount: 15000000,
            status: 'pending',
            createdAt: '2024-07-25T09:15:00Z',
            signedAt: null,
            expiryDate: '2024-08-25T00:00:00Z',
            contractUrl: '#',
            description: 'Kontrak supply bahan baku kopi'
          },
          {
            id: 'CTR-003',
            contractNumber: 'DIS/2024/003',
            type: 'distributor',
            partnerName: 'PT Distribusi Express',
            partnerType: 'distributor',
            amount: 25000000,
            status: 'signed',
            createdAt: '2024-06-10T11:00:00Z',
            signedAt: '2024-06-15T16:30:00Z',
            expiryDate: '2025-06-10T00:00:00Z',
            contractUrl: '#',
            description: 'Perjanjian distribusi produk ke Jawa Timur'
          },
          {
            id: 'CTR-004',
            contractNumber: 'INV/2024/002',
            type: 'investment',
            partnerName: 'Jane Smith',
            partnerType: 'investor',
            amount: 35000000,
            status: 'expired',
            createdAt: '2023-07-01T08:00:00Z',
            signedAt: '2023-07-05T10:00:00Z',
            expiryDate: '2024-07-01T00:00:00Z',
            contractUrl: '#',
            description: 'Perjanjian investasi tahap awal'
          },
          {
            id: 'CTR-005',
            contractNumber: 'SUP/2024/006',
            type: 'supplier',
            partnerName: 'Toko Kemasan Jaya',
            partnerType: 'supplier',
            amount: 8000000,
            status: 'pending',
            createdAt: '2024-07-28T13:45:00Z',
            signedAt: null,
            expiryDate: '2024-08-28T00:00:00Z',
            contractUrl: '#',
            description: 'Supply kemasan produk bulanan'
          }
        ];

        const dummyStats = {
          total: dummyContracts.length,
          pending: dummyContracts.filter(c => c.status === 'pending').length,
          signed: dummyContracts.filter(c => c.status === 'signed').length,
          expired: dummyContracts.filter(c => c.status === 'expired').length
        };

        setContracts(dummyContracts);
        setStats(dummyStats);
        setIsLoading(false);
      }, 1000);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setContracts(data.data.contracts);
      //   setStats(data.data.stats);
      // }
      // setIsLoading(false);

    } catch (error) {
      console.error('Error fetching contracts:', error);
      setIsLoading(false);
      alert('Gagal memuat data kontrak');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #3: SIGN CONTRACT
  // ========================================
  const handleSignContract = async (contractId) => {
    if (!confirm('Apakah Anda yakin ingin menandatangani kontrak ini?')) return;

    try {
      // TODO: BACKEND - API untuk sign contract
      // const response = await fetch(`/api/umkm/contracts/${contractId}/sign`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     signature: 'digital_signature_data', // Bisa dari e-signature provider
      //     signedAt: new Date().toISOString()
      //   })
      // });
      // const data = await response.json();

      // EXPECTED REQUEST BODY:
      // {
      //   signature: "base64_signature_data",
      //   signedAt: "2024-07-30T10:00:00Z"
      // }

      // EXPECTED RESPONSE:
      // {
      //   success: true,
      //   message: "Kontrak berhasil ditandatangani",
      //   data: { ... updated contract ... }
      // }

      // DUMMY - Hapus setelah integrasi
      alert('✅ Kontrak berhasil ditandatangani!');
      fetchContracts(); // Refresh data

      // ACTUAL IMPLEMENTATION
      // if (data.success) {
      //   alert('✅ Kontrak berhasil ditandatangani!');
      //   fetchContracts();
      // }

    } catch (error) {
      console.error('Error signing contract:', error);
      alert('Gagal menandatangani kontrak');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #4: DOWNLOAD CONTRACT
  // ========================================
  const handleDownloadContract = async (contractId, contractUrl) => {
    try {
      // TODO: BACKEND - Download contract file
      // const response = await fetch(`/api/umkm/contracts/${contractId}/download`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `contract_${contractId}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);

      // DUMMY - Hapus setelah integrasi
      alert('📄 Download kontrak (dummy - belum terintegrasi backend)');

    } catch (error) {
      console.error('Error downloading contract:', error);
      alert('Gagal download kontrak');
    }
  };

  // Filter contracts
  const filteredContracts = contracts.filter(contract => {
    // Filter by tab
    if (selectedTab !== 'all' && contract.status !== selectedTab) return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        contract.contractNumber.toLowerCase().includes(query) ||
        contract.partnerName.toLowerCase().includes(query) ||
        contract.description.toLowerCase().includes(query)
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Menunggu',
        icon: <Clock size={16} />,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
      },
      signed: {
        label: 'Ditandatangani',
        icon: <CheckCircle size={16} />,
        className: 'bg-green-100 text-green-700 border-green-200'
      },
      expired: {
        label: 'Kadaluarsa',
        icon: <AlertCircle size={16} />,
        className: 'bg-red-100 text-red-700 border-red-200'
      },
      rejected: {
        label: 'Ditolak',
        icon: <X size={16} />,
        className: 'bg-gray-100 text-gray-700 border-gray-200'
      }
    };
    return configs[status] || configs.pending;
  };

  const getTypeLabel = (type) => {
    const types = {
      investment: 'Investasi',
      supplier: 'Supplier',
      distributor: 'Distributor'
    };
    return types[type] || type;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data kontrak...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">E-Contract Management</h1>
        <p className="text-gray-600 mt-1">Kelola semua kontrak digital dengan stakeholder</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-blue-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Kontrak</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-yellow-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          <p className="text-sm text-gray-600">Menunggu Tanda Tangan</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.signed}</p>
          <p className="text-sm text-gray-600">Kontrak Aktif</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-red-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
          <p className="text-sm text-gray-600">Kadaluarsa</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor kontrak, partner, atau deskripsi..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'pending', label: 'Pending' },
              { id: 'signed', label: 'Signed' },
              { id: 'expired', label: 'Expired' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
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

      {/* Contracts List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {filteredContracts.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada kontrak</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Tidak ditemukan hasil pencarian' : 'Belum ada kontrak yang dibuat'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nomor Kontrak</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Tipe</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Partner</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nilai</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Tanggal</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => {
                  const statusConfig = getStatusConfig(contract.status);
                  
                  return (
                    <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{contract.contractNumber}</p>
                            <p className="text-xs text-gray-500">{contract.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {getTypeLabel(contract.type)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <User className="text-gray-400" size={16} />
                          <div>
                            <p className="font-medium text-gray-900">{contract.partnerName}</p>
                            <p className="text-xs text-gray-500 capitalize">{contract.partnerType}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="text-green-600" size={16} />
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(contract.amount)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar size={14} />
                          <span>{formatDate(contract.createdAt)}</span>
                        </div>
                        {contract.signedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Signed: {formatDate(contract.signedAt)}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.className}`}>
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedContract(contract);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Lihat Detail"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDownloadContract(contract.id, contract.contractUrl)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Download"
                          >
                            <Download size={18} />
                          </button>
                          {contract.status === 'pending' && (
                            <button
                              onClick={() => handleSignContract(contract.id)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                              title="Tanda Tangan"
                            >
                              <FileSignature size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Detail Kontrak</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contract Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Nomor Kontrak</label>
                  <p className="font-semibold text-gray-900">{selectedContract.contractNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tipe Kontrak</label>
                  <p className="font-semibold text-gray-900">{getTypeLabel(selectedContract.type)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Partner</label>
                  <p className="font-semibold text-gray-900">{selectedContract.partnerName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Nilai Kontrak</label>
                  <p className="font-semibold text-gray-900">{formatCurrency(selectedContract.amount)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tanggal Dibuat</label>
                  <p className="font-semibold text-gray-900">{formatDate(selectedContract.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <p className="font-semibold text-gray-900 capitalize">{selectedContract.status}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Deskripsi</label>
                <p className="text-gray-900 mt-1">{selectedContract.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadContract(selectedContract.id, selectedContract.contractUrl)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  <Download size={20} />
                  <span>Download Kontrak</span>
                </button>
                {selectedContract.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleSignContract(selectedContract.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    <FileSignature size={20} />
                    <span>Tanda Tangan</span>
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