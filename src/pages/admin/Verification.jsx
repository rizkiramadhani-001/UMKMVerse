import { useState } from 'react';
import {
  UserCheck,
  Building2,
  TrendingUp,
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  MapPin,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Download,
  Filter,
  Search,
  X,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminVerification() {
  const [selectedTab, setSelectedTab] = useState('pending'); // pending, approved, rejected
  const [selectedType, setSelectedType] = useState('all'); // all, umkm, investor, supplier, distributor
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Stats
  const stats = [
    {
      title: 'Pending Verification',
      value: '24',
      icon: <Clock size={24} />,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Approved Today',
      value: '8',
      icon: <CheckCircle size={24} />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Rejected Today',
      value: '2',
      icon: <XCircle size={24} />,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Total Verified',
      value: '1,247',
      icon: <UserCheck size={24} />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  // Dummy verification data
  const allSubmissions = [
    {
      id: 1,
      name: 'Warung Kopi Nusantara',
      ownerName: 'Jane Smith',
      type: 'umkm',
      email: 'jane@warungkopi.com',
      phone: '08123456789',
      location: 'Jakarta Selatan',
      submittedAt: '2 jam lalu',
      submittedDate: '30 Jul 2024',
      status: 'pending',
      nib: '1234567890123',
      category: 'Food & Beverage',
      description: 'Kedai kopi dengan biji kopi pilihan dari berbagai daerah di Indonesia',
      documents: [
        { name: 'NIB.pdf', size: '2.4 MB', url: '#' },
        { name: 'KTP.pdf', size: '1.8 MB', url: '#' }
      ],
      images: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'PT Investasi Maju',
      ownerName: 'John Doe',
      type: 'investor',
      email: 'john@investasi.com',
      phone: '08198765432',
      location: 'Jakarta Pusat',
      submittedAt: '5 jam lalu',
      submittedDate: '30 Jul 2024',
      status: 'pending',
      npwp: '12.345.678.9-012.000',
      investorType: 'Corporate',
      documents: [
        { name: 'NPWP.pdf', size: '1.5 MB', url: '#' },
        { name: 'Akta Perusahaan.pdf', size: '3.2 MB', url: '#' }
      ]
    },
    {
      id: 3,
      name: 'CV Supplier Bahan Baku',
      ownerName: 'Robert Wilson',
      type: 'supplier',
      email: 'robert@supplier.com',
      phone: '08156781234',
      location: 'Surabaya',
      submittedAt: '1 hari lalu',
      submittedDate: '29 Jul 2024',
      status: 'pending',
      nib: '9876543210987',
      productType: 'Bahan baku makanan dan kemasan',
      documents: [
        { name: 'NIB.pdf', size: '2.1 MB', url: '#' }
      ]
    },
    {
      id: 4,
      name: 'PT Distribusi Express',
      ownerName: 'Michael Brown',
      type: 'distributor',
      email: 'michael@distribusi.com',
      phone: '08145678912',
      location: 'Tangerang',
      submittedAt: '1 hari lalu',
      submittedDate: '29 Jul 2024',
      status: 'pending',
      nib: '5678901234567',
      coverageArea: 'Jabodetabek dan Jawa Barat',
      documents: [
        { name: 'Izin Usaha.pdf', size: '2.8 MB', url: '#' }
      ]
    },
    {
      id: 5,
      name: 'Bakery Sederhana',
      ownerName: 'Sarah Johnson',
      type: 'umkm',
      email: 'sarah@bakery.com',
      phone: '08167894561',
      location: 'Yogyakarta',
      submittedAt: '2 hari lalu',
      submittedDate: '28 Jul 2024',
      status: 'approved',
      nib: '4567890123456',
      category: 'Food & Beverage',
      description: 'Toko roti dan kue dengan resep tradisional',
      approvedAt: '1 hari lalu',
      approvedBy: 'Admin 1'
    },
    {
      id: 6,
      name: 'Investor Individual - David Lee',
      ownerName: 'David Lee',
      type: 'investor',
      email: 'david@email.com',
      phone: '08134567891',
      location: 'Bandung',
      submittedAt: '3 hari lalu',
      submittedDate: '27 Jul 2024',
      status: 'rejected',
      npwp: '98.765.432.1-098.000',
      investorType: 'Individual',
      rejectedAt: '2 hari lalu',
      rejectedBy: 'Admin 1',
      rejectionReason: 'Dokumen NPWP tidak jelas dan tidak sesuai dengan nama'
    }
  ];

  // Filter submissions
  const filteredSubmissions = allSubmissions.filter(submission => {
    if (selectedTab !== 'all' && submission.status !== selectedTab) return false;
    if (selectedType !== 'all' && submission.type !== selectedType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        submission.name.toLowerCase().includes(query) ||
        submission.ownerName.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getTypeIcon = (type) => {
    const icons = {
      umkm: <Building2 size={18} />,
      investor: <TrendingUp size={18} />,
      supplier: <Package size={18} />,
      distributor: <Truck size={18} />
    };
    return icons[type];
  };

  const getTypeName = (type) => {
    const names = {
      umkm: 'UMKM',
      investor: 'Investor',
      supplier: 'Supplier',
      distributor: 'Distributor'
    };
    return names[type];
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-orange-100 text-orange-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    const icons = {
      pending: <Clock size={14} />,
      approved: <CheckCircle size={14} />,
      rejected: <XCircle size={14} />
    };
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${styles[status]}`}>
        {icons[status]}
        <span>{labels[status]}</span>
      </span>
    );
  };

  const handleApprove = (submission) => {
    if (confirm(`Approve verification untuk ${submission.name}?`)) {
      alert(`✅ ${submission.name} telah diverifikasi!`);
      setShowDetailModal(false);
    }
  };

  const handleReject = (submission) => {
    const reason = prompt('Alasan penolakan:');
    if (reason) {
      alert(`❌ ${submission.name} ditolak. Alasan: ${reason}`);
      setShowDetailModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verifikasi User</h1>
          <p className="text-gray-600 mt-1">
            Review dan verifikasi pendaftaran user baru
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mt-4 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'pending', label: 'Pending', count: 24 },
              { id: 'approved', label: 'Approved', count: 8 },
              { id: 'rejected', label: 'Rejected', count: 2 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition ${
                  selectedTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama atau email..."
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Type</option>
                <option value="umkm">UMKM</option>
                <option value="investor">Investor</option>
                <option value="supplier">Supplier</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="divide-y divide-gray-100">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada data</h3>
              <p className="text-gray-600">Tidak ada submission yang ditemukan</p>
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <div key={submission.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white">
                      {getTypeIcon(submission.type)}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{submission.name}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {getTypeName(submission.type)}
                        </span>
                        {getStatusBadge(submission.status)}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Mail size={14} />
                          <span>{submission.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone size={14} />
                          <span>{submission.phone}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{submission.location}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>Submitted: {submission.submittedAt}</span>
                        </span>
                        {submission.status === 'approved' && (
                          <span className="text-green-600">
                            Approved by {submission.approvedBy} • {submission.approvedAt}
                          </span>
                        )}
                        {submission.status === 'rejected' && (
                          <span className="text-red-600">
                            Rejected by {submission.rejectedBy} • {submission.rejectedAt}
                          </span>
                        )}
                      </div>

                      {submission.status === 'rejected' && submission.rejectionReason && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-700">
                            <span className="font-semibold">Alasan penolakan:</span> {submission.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setShowDetailModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                      <Eye size={18} />
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white">
                  {getTypeIcon(selectedSubmission.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedSubmission.name}</h3>
                  <p className="text-sm text-gray-600">{getTypeName(selectedSubmission.type)} Verification</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium">Status Verifikasi:</span>
                {getStatusBadge(selectedSubmission.status)}
              </div>

              {/* Basic Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Informasi Dasar</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Mail size={16} />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedSubmission.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Phone size={16} />
                      <span className="text-sm font-medium">Telepon</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedSubmission.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <MapPin size={16} />
                      <span className="text-sm font-medium">Lokasi</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedSubmission.location}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">Submitted</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedSubmission.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Type-specific Info */}
              {selectedSubmission.type === 'umkm' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Informasi UMKM</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">NIB</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.nib}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Kategori</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.category}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Deskripsi</span>
                      <span className="font-semibold text-gray-900 text-right max-w-md">{selectedSubmission.description}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubmission.type === 'investor' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Informasi Investor</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">NPWP</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.npwp}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Tipe</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.investorType}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubmission.type === 'supplier' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Informasi Supplier</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">NIB</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.nib}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Jenis Produk</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.productType}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubmission.type === 'distributor' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Informasi Distributor</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">NIB</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.nib}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Area Distribusi</span>
                      <span className="font-semibold text-gray-900">{selectedSubmission.coverageArea}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents */}
              {selectedSubmission.documents && selectedSubmission.documents.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Dokumen</h4>
                  <div className="space-y-3">
                    {selectedSubmission.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          <ExternalLink size={16} />
                          <span>Lihat</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Images */}
              {selectedSubmission.images && selectedSubmission.images.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Foto</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSubmission.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-xl transition flex items-center justify-center">
                          <button className="opacity-0 group-hover:opacity-100 transition px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold">
                            View Full
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedSubmission.status === 'pending' && (
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedSubmission)}
                    className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <CheckCircle size={20} />
                    <span>Approve Verification</span>
                  </button>
                  <button
                    onClick={() => handleReject(selectedSubmission)}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center space-x-2"
                  >
                    <XCircle size={20} />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}