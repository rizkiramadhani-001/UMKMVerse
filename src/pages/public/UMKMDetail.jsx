// src/pages/public/UMKMDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Calendar,
  Award,
  Target,
  Briefcase,
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

export default function UMKMDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, financials, reviews
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  const [umkmData, setUmkmData] = useState(null);
  const [reviews, setReviews] = useState([]);

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH UMKM DETAIL
  // ========================================
  useEffect(() => {
    fetchUMKMDetail();
    fetchReviews();
  }, [id]);

  const fetchUMKMDetail = async () => {
    setIsLoading(true);
    
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch(`/api/umkm/${id}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //     // No auth needed for public view
      //   }
      // });
      // const data = await response.json();

      // EXPECTED RESPONSE FORMAT dari backend:
      // {
      //   success: true,
      //   data: {
      //     id: "umkm-001",
      //     name: "Warung Kopi Nusantara",
      //     category: "fnb",
      //     description: "Kedai kopi dengan biji kopi pilihan...",
      //     fullDescription: "Full description...",
      //     location: "Jakarta Selatan",
      //     address: "Jl. Mampang Prapatan Raya No. 123",
      //     email: "info@warungkopi.com",
      //     phone: "08123456789",
      //     website: "https://warungkopi.com",
      //     logoUrl: "https://api.umkmverse.com/uploads/logo/xxx.jpg",
      //     images: ["url1.jpg", "url2.jpg", "url3.jpg"],
      //     videoPitchUrl: "https://www.youtube.com/watch?v=xxx",
      //     rating: 4.8,
      //     reviewCount: 124,
      //     investorCount: 24,
      //     minInvestment: 5000000,
      //     targetInvestment: 100000000,
      //     currentInvestment: 60000000,
      //     investmentProgress: 60,
      //     roi: 18.5,
      //     verified: true,
      //     established: "2020-01-15",
      //     visionMission: "Menjadi kedai kopi terdepan...",
      //     targetMarket: "Usia 20-45 tahun...",
      //     uniqueValue: "Biji kopi 100% nusantara...",
      //     financials: {
      //       revenue: 125000000,
      //       profit: 46500000,
      //       profitMargin: 37.2,
      //       growth: 24.8
      //     }
      //   }
      // }

      // DUMMY DATA - Hapus setelah integrasi backend
      setTimeout(() => {
        const dummyData = {
          id: id,
          name: 'Warung Kopi Nusantara',
          category: 'fnb',
          description: 'Kedai kopi dengan biji kopi pilihan dari berbagai daerah di Indonesia dengan cita rasa premium',
          fullDescription: 'Warung Kopi Nusantara adalah kedai kopi yang menyajikan berbagai jenis kopi nusantara berkualitas tinggi. Kami bangga menghadirkan cita rasa kopi dari berbagai daerah di Indonesia, mulai dari Aceh Gayo, Toraja, hingga Papua. Setiap biji kopi dipilih dengan teliti dan diolah dengan standar specialty coffee untuk menghasilkan secangkir kopi yang sempurna.\n\nKami memiliki barista bersertifikat internasional dan menggunakan peralatan brewing modern untuk memastikan setiap cangkir kopi yang kami sajikan memiliki kualitas terbaik. Selain menyajikan kopi, kami juga berkomitmen untuk mendukung petani kopi lokal dengan membeli langsung dari mereka dengan harga yang adil.',
          location: 'Jakarta Selatan',
          address: 'Jl. Mampang Prapatan Raya No. 123, Jakarta Selatan',
          email: 'info@warungkopi.com',
          phone: '08123456789',
          website: 'https://warungkopi.com',
          logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop'
          ],
          videoPitchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          rating: 4.8,
          reviewCount: 124,
          investorCount: 24,
          minInvestment: 5000000,
          targetInvestment: 100000000,
          currentInvestment: 60000000,
          investmentProgress: 60,
          roi: 18.5,
          verified: true,
          established: '2020-01-15',
          visionMission: 'Menjadi kedai kopi terdepan yang memperkenalkan kekayaan kopi nusantara kepada dunia dan mendukung kesejahteraan petani kopi lokal.',
          targetMarket: 'Usia 20-45 tahun, pencinta kopi, profesional muda, dan wisatawan yang mencari pengalaman kopi autentik Indonesia.',
          uniqueValue: '• Biji kopi 100% nusantara dari berbagai daerah\n• Barista bersertifikat internasional\n• Suasana cozy dan instagramable\n• Direct trade dengan petani lokal\n• Peralatan brewing modern',
          financials: {
            revenue: 125000000,
            profit: 46500000,
            profitMargin: 37.2,
            growth: 24.8
          }
        };

        setUmkmData(dummyData);
        setIsLoading(false);
      }, 1000);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setUmkmData(data.data);
      // }
      // setIsLoading(false);

    } catch (error) {
      console.error('Error fetching UMKM detail:', error);
      setIsLoading(false);
      alert('Gagal memuat data UMKM');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #3: FETCH REVIEWS
  // ========================================
  const fetchReviews = async () => {
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch(`/api/umkm/${id}/reviews`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // EXPECTED RESPONSE FORMAT:
      // {
      //   success: true,
      //   data: {
      //     reviews: [
      //       {
      //         id: "rev-001",
      //         userName: "John Doe",
      //         userRole: "investor",
      //         rating: 5,
      //         comment: "Great investment opportunity!",
      //         createdAt: "2024-07-20T10:00:00Z",
      //         verified: true
      //       }
      //     ]
      //   }
      // }

      // DUMMY DATA
      const dummyReviews = [
        {
          id: 'rev-001',
          userName: 'John Doe',
          userRole: 'investor',
          rating: 5,
          comment: 'Investasi yang sangat menjanjikan! ROI konsisten dan komunikasi dengan owner sangat baik. Highly recommended!',
          createdAt: '2024-07-20T10:00:00Z',
          verified: true
        },
        {
          id: 'rev-002',
          userName: 'Jane Smith',
          userRole: 'investor',
          rating: 5,
          comment: 'Kopi berkualitas tinggi dengan konsep yang unik. Tim profesional dan transparansi keuangan sangat baik.',
          createdAt: '2024-07-15T14:30:00Z',
          verified: true
        },
        {
          id: 'rev-003',
          userName: 'CV Supplier Bahan Baku',
          userRole: 'supplier',
          rating: 4,
          comment: 'Partner yang baik. Pembayaran tepat waktu dan komunikasi lancar.',
          createdAt: '2024-07-10T09:15:00Z',
          verified: true
        }
      ];

      setReviews(dummyReviews);

    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

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

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
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

  const handleInvest = () => {
    // Redirect to login if not authenticated
    navigate('/login', { state: { from: `/umkm/${id}` } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail UMKM...</p>
        </div>
      </div>
    );
  }

  if (!umkmData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">UMKM tidak ditemukan</h2>
          <p className="text-gray-600 mb-4">UMKM yang Anda cari tidak tersedia</p>
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
                  src={umkmData.images[selectedImageIndex]}
                  alt={umkmData.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {umkmData.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? umkmData.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full transition"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev === umkmData.images.length - 1 ? 0 : prev + 1))}
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
              <div className="p-4 flex space-x-3 overflow-x-auto">
                {umkmData.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
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
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>Berdiri sejak {new Date(umkmData.established).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1">
                      <Star size={18} fill="currentColor" className="text-yellow-500" />
                      <span className="font-bold text-gray-900">{umkmData.rating}</span>
                      <span className="text-gray-600 text-sm">({umkmData.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users size={18} />
                      <span className="text-sm">{umkmData.investorCount} Investors</span>
                    </div>
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
            {umkmData.videoPitchUrl && (
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
                    { id: 'financials', label: 'Financial Performance' },
                    { id: 'reviews', label: `Reviews (${reviews.length})` }
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
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Deskripsi Lengkap</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{umkmData.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Visi & Misi</h3>
                      <p className="text-gray-700 leading-relaxed">{umkmData.visionMission}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Target Pasar</h3>
                      <p className="text-gray-700 leading-relaxed">{umkmData.targetMarket}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Keunggulan</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{umkmData.uniqueValue}</p>
                    </div>

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
                            <a href={umkmData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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

                {/* Financials Tab */}
                {activeTab === 'financials' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(umkmData.financials.revenue)}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">Monthly Profit</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(umkmData.financials.profit)}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
                        <p className="text-2xl font-bold text-gray-900">{umkmData.financials.profitMargin}%</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">YoY Growth</p>
                        <p className="text-2xl font-bold text-gray-900">{umkmData.financials.growth}%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">💡 Note</p>
                      <p className="text-sm text-gray-700">Data keuangan lengkap hanya tersedia untuk investor terdaftar. Silakan login atau daftar untuk melihat detail lebih lanjut.</p>
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
                        <div key={review.id} className="p-4 border-2 border-gray-100 rounded-xl">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {review.userName.charAt(0)}
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

          {/* Right Column - Investment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
              {/* Investment Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progress Investasi</span>
                  <span className="text-sm font-bold text-blue-600">{umkmData.investmentProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all"
                    style={{ width: `${umkmData.investmentProgress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Terkumpul:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(umkmData.currentInvestment)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(umkmData.targetInvestment)}</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">Average ROI</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{umkmData.roi}%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Users className="text-blue-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">Total Investors</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{umkmData.investorCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-purple-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">Min. Investment</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{formatCurrency(umkmData.minInvestment)}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleInvest}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition transform"
                >
                  Investasi Sekarang
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  Hubungi UMKM
                </button>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-gray-700">
                <p className="font-semibold mb-2">💡 Informasi</p>
                <ul className="space-y-1 text-xs">
                  <li>• Semua investasi dijamin dengan e-contract legal</li>
                  <li>• Sistem bagi hasil transparan dengan smart contract</li>
                  <li>• Tracking ROI real-time di dashboard</li>
                  <li>• Withdrawal kapan saja sesuai kesepakatan</li>
                </ul>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-around text-center">
                  <div>
                    <CheckCircle className="mx-auto text-green-600 mb-1" size={24} />
                    <p className="text-xs font-semibold text-gray-900">Verified</p>
                  </div>
                  <div>
                    <Award className="mx-auto text-yellow-600 mb-1" size={24} />
                    <p className="text-xs font-semibold text-gray-900">Top Rated</p>
                  </div>
                  <div>
                    <Shield className="mx-auto text-blue-600 mb-1" size={24} />
                    <p className="text-xs font-semibold text-gray-900">Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}