// src/pages/public/UMKMDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  MapPin,
  Star,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Calendar,
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const STORAGE_BASE_URL = 'http://127.0.0.1:8000/storage';

export default function UMKMDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [userid, setUserid] = useState(null);

  const [umkmData, setUmkmData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Get ID from params or query params
    const umkmId = id || searchParams.get('id');
    
    if (umkmId) {
      console.log('Fetching UMKM detail for ID:', umkmId);
      fetchUMKMDetail(umkmId);
      loadDummyReviews();
    } else {
      setError('ID UMKM tidak valid');
      setIsLoading(false);
    }
  }, [id, searchParams]);

  const fetchUMKMDetail = async (umkmId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/umkm/${umkmId}/display`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      
      if (response.data.success || response.data) {
        const data = response.data.data || response.data;
        
        // Transform backend data ke format frontend
        const transformedData = {
          id: data.id,
          name: data.namaUmkm,
          category: data.bidangUsaha,
          description: data.deskripsiSingkat,
          fullDescription: data.deskripsiLengkap,
          location: data.lokasiUsaha,
          address: data.alamatLengkap,
          email: data.email,
          phone: data.phone,
          website: data.website,
          logoUrl: data.logo ? `${STORAGE_BASE_URL}/${data.logo}` : null,
          
          // Handle foto produk dari relasi atau string JSON
          images: data.foto_produk && Array.isArray(data.foto_produk) && data.foto_produk.length > 0
            ? data.foto_produk.map(foto => `${STORAGE_BASE_URL}/${foto.path}`)
            : (data.fotoProduk 
                ? (typeof data.fotoProduk === 'string' 
                    ? JSON.parse(data.fotoProduk).map(path => `${STORAGE_BASE_URL}/${path}`)
                    : data.fotoProduk.map(path => `${STORAGE_BASE_URL}/${path}`)
                  )
                : []
              ),
          
          videoPitchUrl: data.videoPitchUrl,
          rating: parseFloat(data.rating) || 4.5,
          reviewCount: parseInt(data.reviewCount) || 8,
          verified: data.verified === 1 || data.verified === true || true,
          established: data.tahunBerdiri || data.created_at,
          visionMision: data.visiMisi,
          targetMarket: data.targetPasar,
          uniqueValue: data.keunggulanProduk,
          nib: data.nib
        };

        console.log('Transformed UMKM Data:', transformedData);
        setUmkmData(transformedData);
        setUserid(data.user_id);
      } else {
        throw new Error(response.data.message || 'Gagal memuat data UMKM');
      }
    } catch (error) {
      console.error('Error fetching UMKM detail:', error);
      
      if (error.response) {
        if (error.response.status === 404) {
          setError('UMKM tidak ditemukan');
        } else {
          setError(error.response.data?.message || 'Gagal memuat data UMKM');
        }
      } else if (error.request) {
        setError('Tidak dapat terhubung ke server');
      } else {
        setError(error.message || 'Terjadi kesalahan');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load dummy reviews
  const loadDummyReviews = () => {
    const dummyReviews = [
      {
        id: 'rev-001',
        userName: 'Budi Santoso',
        userRole: 'customer',
        rating: 5,
        comment: 'Produk sangat berkualitas dan pelayanan memuaskan. Pengalaman berbelanja yang sangat menyenangkan. Highly recommended!',
        createdAt: '2025-10-20T10:00:00Z',
        verified: true
      },
      {
        id: 'rev-002',
        userName: 'Siti Nurhaliza',
        userRole: 'customer',
        rating: 5,
        comment: 'Produk berkualitas tinggi dengan konsep yang unik. Pelayanan sangat profesional dan ramah. Pasti akan order lagi!',
        createdAt: '2025-10-15T14:30:00Z',
        verified: true
      },
      {
        id: 'rev-003',
        userName: 'Ahmad Wijaya',
        userRole: 'customer',
        rating: 4,
        comment: 'UMKM yang solid dengan produk yang bagus. Proses pemesanan mudah dan cepat. Pengiriman tepat waktu.',
        createdAt: '2025-10-10T09:15:00Z',
        verified: true
      },
      {
        id: 'rev-004',
        userName: 'CV Maju Bersama',
        userRole: 'supplier',
        rating: 5,
        comment: 'Partner bisnis yang sangat baik. Pembayaran selalu tepat waktu dan komunikasi lancar. Sudah bekerjasama lebih dari 1 tahun dan tidak ada kendala.',
        createdAt: '2025-10-05T16:20:00Z',
        verified: true
      },
      {
        id: 'rev-005',
        userName: 'Dewi Kusuma',
        userRole: 'customer',
        rating: 5,
        comment: 'Pertama kali beli di UMKM ini dan sangat puas! Owner responsif dan produk sesuai ekspektasi bahkan lebih baik.',
        createdAt: '2025-09-28T11:45:00Z',
        verified: true
      },
      {
        id: 'rev-006',
        userName: 'Rudi Hartono',
        userRole: 'customer',
        rating: 4,
        comment: 'Produk berkualitas dengan harga yang wajar. Dokumentasi lengkap dan legal. Cocok untuk kebutuhan bisnis.',
        createdAt: '2025-09-22T08:30:00Z',
        verified: true
      },
      {
        id: 'rev-007',
        userName: 'PT Distribusi Nusantara',
        userRole: 'distributor',
        rating: 5,
        comment: 'Kualitas produk konsisten dan supply chain management yang baik. Senang bisa menjadi distributor resmi. Potensi pertumbuhan sangat besar.',
        createdAt: '2025-09-15T13:00:00Z',
        verified: true
      },
      {
        id: 'rev-008',
        userName: 'Linda Permata',
        userRole: 'customer',
        rating: 5,
        comment: 'Pelayanan yang excellent dan produk berkualitas. Sangat puas dengan pembelian ini. Owner sangat welcome untuk diskusi tentang produk.',
        createdAt: '2025-09-10T15:20:00Z',
        verified: true
      }
    ];

    setReviews(dummyReviews);
  };

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getCategoryLabel = (category) => {
    const categories = {
      fnb: 'Food & Beverage',
      agrikultur: 'Agrikultur',
      service: 'Service / Jasa'
    };
    return categories[category] || category;
  };

  const handleContact = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const umkmId = id || searchParams.get('id');
    
    if (!token) {
      navigate('/login', { state: { from: `/umkm/${umkmId}` } });
    } else {
      axios.post(`http://127.0.0.1:8000/api/chats`, {
        other_user_id: userid
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(response => {
        console.log('Chat created:', response.data);
        // Navigate to chat or show success message
        navigate('/umkm-dashboard/chat');
      }).catch(error => {
        console.error('Error creating chat:', error);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail UMKM...</p>
        </div>
      </div>
    );
  }

  if (error || !umkmData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'UMKM tidak ditemukan'}
          </h2>
          <p className="text-gray-600 mb-4">
            {error ? 'Terjadi kesalahan saat memuat data' : 'UMKM yang Anda cari tidak tersedia'}
          </p>
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Kembali ke Browse
          </button>
        </div>
      </div>
    );
  }

  const defaultImages = ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'];
  const displayImages = umkmData.images.length > 0 ? umkmData.images : defaultImages;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-96 bg-gray-900">
                <img
                  src={displayImages[selectedImageIndex]}
                  alt={umkmData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = defaultImages[0];
                  }}
                />
                
                {/* Navigation Arrows */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => 
                        prev === 0 ? displayImages.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full transition"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => 
                        prev === displayImages.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full transition"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Verified Badge */}
                {umkmData.verified && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold flex items-center space-x-2">
                    <CheckCircle size={16} />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {displayImages.length > 1 && (
                <div className="p-4 flex space-x-3 overflow-x-auto">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImageIndex === idx ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = defaultImages[0];
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* UMKM Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{umkmData.name}</h1>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      {getCategoryLabel(umkmData.category)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{umkmData.location}</span>
                    </div>
                    {umkmData.established && (
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>Berdiri sejak {new Date(umkmData.established).getFullYear()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mt-3">
                    {umkmData.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star size={18} fill="currentColor" className="text-yellow-500" />
                        <span className="font-bold text-gray-900">{umkmData.rating.toFixed(1)}</span>
                        <span className="text-gray-600 text-sm">({umkmData.reviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{umkmData.description}</p>
            </div>

            {/* Video Pitch */}
            {umkmData.videoPitchUrl && extractVideoId(umkmData.videoPitchUrl) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Play size={24} className="text-blue-600" />
                  <span>Video Pitch</span>
                </h2>
                
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractVideoId(umkmData.videoPitchUrl)}`}
                    title="Video Pitch"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200">
                <div className="flex space-x-1 p-2">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'reviews', label: `Reviews (${reviews.length})` },
                    { id: 'products', label: 'Products'}
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-xl font-semibold transition ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {umkmData.fullDescription && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Deskripsi Lengkap</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {umkmData.fullDescription}
                        </p>
                      </div>
                    )}

                    {umkmData.visionMision && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Visi & Misi</h3>
                        <p className="text-gray-700 leading-relaxed">{umkmData.visionMision}</p>
                      </div>
                    )}

                    {umkmData.targetMarket && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Target Pasar</h3>
                        <p className="text-gray-700 leading-relaxed">{umkmData.targetMarket}</p>
                      </div>
                    )}

                    {umkmData.uniqueValue && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Keunggulan</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {umkmData.uniqueValue}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Kontak</h3>
                      <div className="space-y-2">
                        {umkmData.phone && (
                          <div className="flex items-center space-x-3 text-gray-700">
                            <Phone size={18} className="text-gray-400" />
                            <span>{umkmData.phone}</span>
                          </div>
                        )}
                        {umkmData.email && (
                          <div className="flex items-center space-x-3 text-gray-700">
                            <Mail size={18} className="text-gray-400" />
                            <span>{umkmData.email}</span>
                          </div>
                        )}
                        {umkmData.website && (
                          <div className="flex items-center space-x-3 text-gray-700">
                            <Globe size={18} className="text-gray-400" />
                            <a 
                              href={umkmData.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline"
                            >
                              {umkmData.website}
                            </a>
                          </div>
                        )}
                        {umkmData.address && (
                          <div className="flex items-start space-x-3 text-gray-700">
                            <MapPin size={18} className="text-gray-400 mt-1" />
                            <span>{umkmData.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageSquare className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-600">Belum ada review</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-100 transition">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                                {review.userName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-semibold text-gray-900">{review.userName}</p>
                                  {review.verified && (
                                    <CheckCircle size={16} className="text-blue-600" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 capitalize">{review.userRole}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  fill={i < review.rating ? 'currentColor' : 'none'}
                                  className={i < review.rating ? '' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          <p className="text-xs text-gray-500 mt-2">{formatDate(review.createdAt)}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
              {/* UMKM Info */}
              <div className="text-center">
                {umkmData.logoUrl && (
                  <img 
                    src={umkmData.logoUrl} 
                    alt={umkmData.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{umkmData.name}</h3>
                <p className="text-sm text-gray-600">{getCategoryLabel(umkmData.category)}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-xl text-center">
                  <Star className="mx-auto text-yellow-500 mb-1" size={20} fill="currentColor" />
                  <p className="text-xs text-gray-600">Rating</p>
                  <p className="text-lg font-bold text-gray-900">{umkmData.rating.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl text-center">
                  <MessageSquare className="mx-auto text-green-600 mb-1" size={20} />
                  <p className="text-xs text-gray-600">Reviews</p>
                  <p className="text-lg font-bold text-gray-900">{umkmData.reviewCount}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleContact}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition transform"
              >
                Hubungi Supplier
              </button>

              {/* Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Informasi Kontak</h4>
                {umkmData.phone && (
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <Phone size={16} className="text-gray-400" />
                    <span>{umkmData.phone}</span>
                  </div>
                )}
                {umkmData.email && (
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <Mail size={16} className="text-gray-400" />
                    <span className="break-all">{umkmData.email}</span>
                  </div>
                )}
                {umkmData.website && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Globe size={16} className="text-gray-400" />
                    <a 
                      href={umkmData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      Kunjungi Website
                    </a>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-gray-700">
                <p className="font-semibold mb-2">💡 Informasi</p>
                <ul className="space-y-1 text-xs">
                  <li>• Hubungi langsung untuk informasi produk</li>
                  <li>• Konsultasi gratis tentang layanan</li>
                  <li>• Response time dalam 24 jam</li>
                  <li>• Tanya jawab seputar UMKM</li>
                </ul>
              </div>

              {/* Verified Badge */}
              {umkmData.verified && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle size={20} />
                    <span className="text-sm font-semibold">UMKM Terverifikasi</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}