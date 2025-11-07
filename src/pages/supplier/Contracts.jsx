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
  DollarSign,
  Plus,
  Upload,
  Send
} from 'lucide-react';
import axios from 'axios';

// OpenSign Configuration
const OPENSIGN_CONFIG = {
  apiUrl: 'https://sandbox.opensignlabs.com/api/v1',
  token: 'test.4sbh0JvlUorJuC2KmOrDh4', // Your API token
  appUrl: 'https://app.opensignlabs.com'
};

export default function UMKMContracts() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const [contracts, setContracts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    signed: 0,
    expired: 0
  });

  const [uploadForm, setUploadForm] = useState({
    contractNumber: '',
    type: 'investment',
    partnerName: '',
    partnerEmail: '',
    partnerType: 'investor',
    amount: '',
    expiryDate: '',
    description: '',
    file: null
  });
  const [isUploading, setIsUploading] = useState(false);

  // ========================================
  // FETCH CONTRACTS
  // ========================================
  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    setIsLoading(true);
    
    try {
      // Fetch documents from OpenSign API
      await fetchOpenSignDocuments();


      const lmao = await axios.get('http://127.0.0.1:8000/api/contracts',
        {
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
        }
      )

      console.log(lmao)

      // TODO: Also fetch from your backend
      // const response = await fetch('/api/umkm/contracts', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // setContracts(data.contracts);
      // setStats(data.stats);

    } catch (error) {
      console.error('Error fetching contracts:', error);
      alert('Gagal memuat data kontrak');
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================
  // FETCH DOCUMENTS FROM OPENSIGN
  // ========================================
  const fetchOpenSignDocuments = async () => {
    try {
      console.log('📥 Fetching documents from OpenSign...');

      const statusTypes = ['draft', 'inprogress', 'completed', 'expired', 'declined'];
      let allDocs = [];

        const response = await axios.get(`http://127.0.0.1:8000/api/contracts`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
        });
        console.log("LOL", response )

        if (Array.isArray(response.data)) {
          allDocs.push(...response.data);
        }
      



      console.log("allldocs",allDocs)

      const transformedContracts = allDocs.map(doc => {
        // Determine status
        let contractStatus = ''; // default
        const isExpired = doc.ExpireAt?.iso && new Date(doc.ExpireAt.iso) < new Date();

        if (doc.status == 'signed') {
          contractStatus = 'signed';
        } else if (doc.status == 'cancelled') {
          contractStatus = 'rejected';
        } else if (isExpired) {
          contractStatus = 'expired';
        } else if (doc.status == 'pending') {
          contractStatus = 'pending';
        }

        // First signer
        const firstSigner = doc.Signers?.[0] ?? {};

        return {
          id: doc.id,
          contractNumber: doc.contract_number ?? doc.objectId,
          type: 'investment',
          partnerName: doc.partner_name ?? 'Unknown',
          partnerEmail: doc.partner_email ?? 'N/A',
          partnerType: 'investor',
          amount: doc.amount ?? 0, // from backend if needed
          status: contractStatus,
          createdAt: doc.createdAt,
          signedAt: doc.IsCompleted ? doc.CompletedOn?.iso : null,
          expiryDate: doc.ExpireAt?.iso ?? null,
          contractUrl: doc.contract_url ?? doc.SignedUrl ?? '#',
          openSignDocId: doc.objectId,
          description: doc.Note ?? doc.description ?? 'No description'
        };
      });

      console.log('✅ Transformed contracts:', transformedContracts);

      setContracts(transformedContracts);

      // Fix stats calculation
      const calculatedStats = {
        total: transformedContracts.length,
        pending: transformedContracts.filter(c => c.status === 'pending').length,
        inprogress: transformedContracts.filter(c => c.status === 'inprogress').length,
        signed: transformedContracts.filter(c => c.status === 'signed').length,
        expired: transformedContracts.filter(c => c.status === 'expired').length,
        rejected: transformedContracts.filter(c => c.status === 'rejected').length
      };
      setStats(calculatedStats);

      console.log('📊 Stats:', calculatedStats);

    } catch (error) {
      console.error('❌ Error fetching OpenSign documents:', error);
      loadDummyData();
    }
  };


  // ========================================
  // LOAD DUMMY DATA (Fallback)
  // ========================================
  const loadDummyData = () => {
    console.log('⚠️ Loading dummy data as fallback...');
    
    const dummyContracts = [
      {
        id: 'CTR-001',
        contractNumber: 'INV/2024/001',
        type: 'investment',
        partnerName: 'John Doe',
        partnerEmail: 'john@example.com',
        partnerType: 'investor',
        amount: 50000000,
        status: 'signed',
        createdAt: '2024-07-15T10:30:00Z',
        signedAt: '2024-07-20T14:20:00Z',
        expiryDate: '2025-07-15T00:00:00Z',
        contractUrl: 'https://example.com/contract.pdf',
        openSignDocId: 'doc_123abc',
        description: 'Perjanjian investasi untuk pengembangan usaha'
      },
      {
        id: 'CTR-002',
        contractNumber: 'SUP/2024/005',
        type: 'supplier',
        partnerName: 'CV Supplier Bahan Baku',
        partnerEmail: 'supplier@example.com',
        partnerType: 'supplier',
        amount: 15000000,
        status: 'pending',
        createdAt: '2024-07-25T09:15:00Z',
        signedAt: null,
        expiryDate: '2024-08-25T00:00:00Z',
        contractUrl: 'https://example.com/contract2.pdf',
        openSignDocId: 'doc_456def',
        description: 'Kontrak supply bahan baku kopi'
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
  };

  // ========================================
  // OPENSIGN: CONVERT FILE TO BASE64
  // ========================================
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove data:application/pdf;base64, prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // ========================================
  // OPENSIGN: CREATE DOCUMENT & SEND FOR SIGNATURE
  // ========================================
const createOpenSignDocument = async (contractData, fileBase64) => {
  try {
    console.log('📤 Sending document to OpenSign...');

    const requestBody = {
      title: contractData.contractNumber,
      description: contractData.description,
      file: fileBase64,
      signers: [
        {
          name: contractData.partnerName,
          email: contractData.partnerEmail,
          widgets: [
            {
              type: 'signature',
              page: 1,
              x: 100,
              y: 700,
              w: 150,
              h: 50
            }
          ]
        }
      ],
      expirydate: contractData.expiryDate ? new Date(contractData.expiryDate).getTime() : null,
      sendmail: true
    };

    const response = await fetch(`${OPENSIGN_CONFIG.apiUrl}/createdocument`, {
      method: 'POST',
      headers: {
        'X-API-Token': OPENSIGN_CONFIG.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const rawResponse = await response.text();
    console.log('📥 Raw OpenSign response:', rawResponse);

    if (!response.ok) throw new Error(`OpenSign (${response.status}): ${rawResponse}`);

    const data = JSON.parse(rawResponse);
    console.log('✅ Parsed OpenSign data:', data);

    // ✅ Now send result to Laravel API
    await axios.post("http://127.0.0.1:8000/api/contracts", {
      contract_number: contractData.contractNumber,
      type: contractData.type,
      partner_name: contractData.partnerName,
      partner_email: contractData.partnerEmail,
      partner_type: contractData.partnerType,
      amount: contractData.amount,
      expiry_date: contractData.expiryDate,
      description: contractData.description,
      open_sign_doc_id: data.objectId,
      contract_url: data.signurl[0].url || data.fileUrl || null,
      status: "pending"
    },{
      headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    });

    return {
      success: true,
      documentId: data.objectId,
      message: "✅ Document created & stored successfully",
      data
    };

  } catch (error) {
    console.error("❌ OpenSign error:", error);
    return { success: false, error: error.message };
  }
};


  // ========================================
  // HANDLE FILE UPLOAD
  // ========================================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Hanya file PDF dan Word yang diperbolehkan');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB');
        return;
      }

      setUploadForm({ ...uploadForm, file });
    }
  };

  // ========================================
  // UPLOAD CONTRACT & SEND TO OPENSIGN
  // ========================================
  const handleUploadContract = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      alert('Silakan pilih file kontrak');
      return;
    }

    if (!uploadForm.partnerEmail) {
      alert('Email partner wajib diisi');
      return;
    }

    setIsUploading(true);

    try {
      console.log('🚀 Starting contract upload process...');

      // Step 1: Convert file to Base64
      const fileBase64 = await convertFileToBase64(uploadForm.file);
      console.log('✅ File converted to Base64');

      // Step 2: Prepare contract data
      const contractData = {
        contractNumber: uploadForm.contractNumber,
        type: uploadForm.type,
        partnerName: uploadForm.partnerName,
        partnerEmail: uploadForm.partnerEmail,
        partnerType: uploadForm.partnerType,
        amount: parseFloat(uploadForm.amount),
        expiryDate: uploadForm.expiryDate,
        description: uploadForm.description,
        status: 'pending'
      };

      // Step 3: TODO - Save contract to your backend first
      // const backendResponse = await fetch('/api/umkm/contracts', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     ...contractData,
      //     file: uploadForm.file // Save file to your storage
      //   })
      // });
      // const savedContract = await backendResponse.json();

      // Step 4: Send to OpenSign for e-signature
      console.log('📧 Sending to OpenSign...');
      const openSignResult = await createOpenSignDocument(contractData, fileBase64);

      if (openSignResult.success) {
        console.log('✅ OpenSign document created:', openSignResult.documentId);

        // Step 5: TODO - Update contract with OpenSign document ID in backend
        // await fetch(`/api/umkm/contracts/${savedContract.id}`, {
        //   method: 'PATCH',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     openSignDocId: openSignResult.documentId
        //   })
        // });

        alert(`✅ Kontrak berhasil diupload dan dikirim untuk ditandatangani!

OpenSign Document ID: ${openSignResult.documentId}

Partner (${uploadForm.partnerEmail}) akan menerima email dari OpenSign untuk menandatangani dokumen.`);
        
        setShowUploadModal(false);
        setUploadForm({
          contractNumber: '',
          type: 'investment',
          partnerName: '',
          partnerEmail: '',
          partnerType: 'investor',
          amount: '',
          expiryDate: '',
          description: '',
          file: null
        });
        
        fetchContracts();
      } else {
        throw new Error(openSignResult.error || 'Failed to send to OpenSign');
      }

    } catch (error) {
      console.error('❌ Error uploading contract:', error);
      alert(`❌ Gagal mengupload kontrak: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // ========================================
  // OPENSIGN: GET DOCUMENT DETAILS
  // ========================================
  const getDocumentDetails = async (openSignDocId) => {
    try {
      const response = await fetch(`${OPENSIGN_CONFIG.apiUrl}/getdocument/${openSignDocId}`, {
        method: 'GET',
        headers: {
          'X-API-Token': OPENSIGN_CONFIG.token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get document details');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error getting document details:', error);
      return null;
    }
  };

  // ========================================
  // OPENSIGN: RESEND SIGNING EMAIL
  // ========================================
  const handleResendContract = async (contractId, openSignDocId) => {
    try {
      if (!openSignDocId) {
        alert('Document belum tersedia di OpenSign');
        return;
      }

      // OpenSign resend email endpoint
      const response = await fetch(`${OPENSIGN_CONFIG.apiUrl}/resendemail`, {
        method: 'POST',
        headers: {
          'X-API-Token': OPENSIGN_CONFIG.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          documentid: openSignDocId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to resend document');
      }

      alert('✅ Email pengingat berhasil dikirim ke partner!');

    } catch (error) {
      console.error('Error resending contract:', error);
      alert('Gagal mengirim ulang kontrak: ' + error.message);
    }
  };

  // ========================================
  // OPENSIGN: GET SIGNING URL
  // ========================================
  const handleSignContract = async (contractId, openSignDocId) => {
    try {
      window.open(contractId)
      axios.post('http://127.0.0.1:8000/api/contracts/updateStatus', {
        id: openSignDocId
      })
    }catch(error)
    {
      console.log(error )
    }
  };

  // ========================================
  // DOWNLOAD CONTRACT
  // ========================================
  const handleDownloadContract = async (contractId, contractUrl) => {
    try {
      if (contractUrl && contractUrl !== '#') {
        window.open(contractUrl, '_blank');
        return;
      }

      // TODO: Download from backend
      alert('📄 Download kontrak');

    } catch (error) {
      console.error('Error downloading contract:', error);
      alert('Gagal download kontrak');
    }
  };

  // ========================================
  // FILTER & HELPERS
  // ========================================
  const filteredContracts = contracts.filter(contract => {
    if (selectedTab !== 'all' && contract.status !== selectedTab) return false;
    
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-Contract Management</h1>
          <p className="text-gray-600 mt-1">Kelola semua kontrak digital dengan OpenSign</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchContracts()}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            title="Refresh dari OpenSign"
          >
            <svg 
              className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            <span>Upload Kontrak</span>
          </button>
        </div>
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

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
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
                  {/* <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th> */}
                  <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => {
                  const statusConfig = getStatusConfig(contract.status);
                  console.log("CHECK",contract)
                  
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
                      {/* <td className="py-4 px-6">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.className}`}>
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </span>
                      </td> */}
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
                            <>
                              <button
                                onClick={() => handleSignContract(contract.contractUrl, contract.id)}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                title="Tanda Tangan"
                              >
                                <FileSignature size={18} />
                              </button>
                              <button
                                onClick={() => handleResendContract(contract.contractUrl, contract.openSignDocId)}
                                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                                title="Kirim Ulang"
                              >
                                <Send size={18} />
                              </button>
                            </>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Upload Kontrak Baru</h3>
                <p className="text-sm text-gray-600 mt-1">Dokumen akan dikirim via OpenSign untuk e-signature</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                disabled={isUploading}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUploadContract} className="p-6 space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  File Kontrak <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition">
                  <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="contractFile"
                    required
                  />
                  <label
                    htmlFor="contractFile"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Pilih File
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Format: PDF, Word • Maksimal 10MB
                  </p>
                  {uploadForm.file && (
                    <p className="text-sm text-green-600 mt-2 font-semibold">
                      ✓ {uploadForm.file.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Contract Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor Kontrak <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.contractNumber}
                    onChange={(e) => setUploadForm({ ...uploadForm, contractNumber: e.target.value })}
                    placeholder="INV/2024/001"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipe Kontrak <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="investment">Investasi</option>
                    <option value="supplier">Supplier</option>
                    <option value="distributor">Distributor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Partner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.partnerName}
                    onChange={(e) => setUploadForm({ ...uploadForm, partnerName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Partner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={uploadForm.partnerEmail}
                    onChange={(e) => setUploadForm({ ...uploadForm, partnerEmail: e.target.value })}
                    placeholder="partner@example.com"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    📧 Email untuk mengirim undangan tanda tangan via OpenSign
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipe Partner <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.partnerType}
                    onChange={(e) => setUploadForm({ ...uploadForm, partnerType: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="investor">Investor</option>
                    <option value="supplier">Supplier</option>
                    <option value="distributor">Distributor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nilai Kontrak (IDR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={uploadForm.amount}
                    onChange={(e) => setUploadForm({ ...uploadForm, amount: e.target.value })}
                    placeholder="50000000"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Kadaluarsa
                  </label>
                  <input
                    type="date"
                    value={uploadForm.expiryDate}
                    onChange={(e) => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Perjanjian investasi untuk pengembangan usaha..."
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* OpenSign Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <FileSignature className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 mb-1">✨ Powered by OpenSign</p>
                    <p className="text-blue-800">
                      Kontrak akan otomatis dikirim ke email partner untuk ditandatangani secara digital. 
                      Partner akan menerima link aman untuk e-signature yang sah secara hukum.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  disabled={isUploading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Mengirim ke OpenSign...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      <span>Upload & Kirim untuk Tanda Tangan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <label className="text-sm text-gray-600">Email Partner</label>
                  <p className="font-semibold text-gray-900">{selectedContract.partnerEmail}</p>
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
                {selectedContract.openSignDocId && (
                  <div>
                    <label className="text-sm text-gray-600">OpenSign Doc ID</label>
                    <p className="font-mono text-xs text-gray-700">{selectedContract.openSignDocId}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600">Deskripsi</label>
                <p className="text-gray-900 mt-1">{selectedContract.description}</p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadContract(selectedContract.id, selectedContract.contractUrl)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  <Download size={20} />
                  <span>Download</span>
                </button>
                {selectedContract.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleSignContract(selectedContract.contractUrl, selectedContract.openSignDocId);
                        setShowDetailModal(false);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      <FileSignature size={20} />
                      <span>Tanda Tangan</span>
                    </button>
                    <button
                      onClick={() => {
                        handleResendContract(selectedContract.id, selectedContract.openSignDocId);
                        setShowDetailModal(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition"
                    >
                      <Send size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}