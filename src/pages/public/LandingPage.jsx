import { Users, TrendingUp, Shield, MessageSquare, FileText, Zap, ChevronRight, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua', icon: '🏢' },
    { id: 'fnb', name: 'Food & Beverage', icon: '🍔' },
    { id: 'agrikultur', name: 'Agrikultur', icon: '🌾' },
    { id: 'service', name: 'Service / Jasa', icon: '⚙️' }
  ];

  const dummyUMKM = [
    {
      id: 1,
      name: 'Warung Kopi Nusantara',
      category: 'fnb',
      description: 'Kedai kopi dengan biji kopi pilihan dari berbagai daerah di Indonesia',
      location: 'Jakarta Selatan',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      invested: '60%',
      minInvest: 'Rp 5.000.000'
    },
    {
      id: 2,
      name: 'Tani Organik Sejahtera',
      category: 'agrikultur',
      description: 'Produsen sayuran organik berkualitas tinggi dengan metode pertanian modern',
      location: 'Bandung, Jawa Barat',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      invested: '45%',
      minInvest: 'Rp 10.000.000'
    },
    {
      id: 3,
      name: 'Bakery Roti Hangat',
      category: 'fnb',
      description: 'Toko roti artisan dengan resep tradisional dan bahan berkualitas',
      location: 'Surabaya, Jawa Timur',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      invested: '75%',
      minInvest: 'Rp 3.000.000'
    },
    {
      id: 4,
      name: 'Laundry Express 24/7',
      category: 'service',
      description: 'Layanan laundry premium dengan pickup & delivery service',
      location: 'Jakarta Pusat',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
      invested: '30%',
      minInvest: 'Rp 8.000.000'
    },
    {
      id: 5,
      name: 'Hidroponik Modern Farm',
      category: 'agrikultur',
      description: 'Pertanian hidroponik untuk sayuran segar tanpa pestisida',
      location: 'Bogor, Jawa Barat',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop',
      invested: '55%',
      minInvest: 'Rp 15.000.000'
    },
    {
      id: 6,
      name: 'Service AC Pro',
      category: 'service',
      description: 'Jasa service dan instalasi AC untuk rumah dan kantor',
      location: 'Tangerang, Banten',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
      invested: '20%',
      minInvest: 'Rp 5.000.000'
    }
  ];

  const filteredUMKM = selectedCategory === 'all' 
    ? dummyUMKM 
    : dummyUMKM.filter(umkm => umkm.category === selectedCategory);

  const features = [
    {
      icon: <Users className="text-blue-600" size={28} />,
      title: "Kolaborasi Multi-Stakeholder",
      description: "Terhubung dengan investor, supplier, distributor, dan mentor dalam satu platform"
    },
    {
      icon: <TrendingUp className="text-blue-600" size={28} />,
      title: "Dashboard Keuangan Real-time",
      description: "Pantau kesehatan finansial bisnis Anda dengan data yang selalu update"
    },
    {
      icon: <Shield className="text-blue-600" size={28} />,
      title: "Sistem Bagi Hasil Transparan",
      description: "Smart contract otomatis untuk pembagian keuntungan yang adil dan transparan"
    },
    {
      icon: <MessageSquare className="text-blue-600" size={28} />,
      title: "Forum & Chat Diskusi",
      description: "Komunikasi langsung dengan calon investor, supplier, dan partner bisnis"
    },
    {
      icon: <FileText className="text-blue-600" size={28} />,
      title: "E-Contract & Digital Sign",
      description: "Buat dan tandatangani kontrak secara digital dengan legal binding"
    },
    {
      icon: <Zap className="text-blue-600" size={28} />,
      title: "Credit Scoring AI",
      description: "Penilaian kredit otomatis berbasis data alternatif untuk akses pembiayaan lebih mudah"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            🚀 Platform Kolaborasi Digital #1 untuk UMKM
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Platform Kolaborasi UMKM
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Masa Depan
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Menghubungkan UMKM dengan investor, supplier, dan distributor dalam satu ekosistem digital yang aman dan transparan
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/browse"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600
                to-blue-700 text-white rounded-xl text-lg font-semibold hover:shadow-xl
                hover:scale-105 transition transform flex items-center justify-center
                space-x-2"
            >
              <span>Telusuri UMKM</span>
              <ChevronRight className="group-hover:translate-x-1
                transition" 
                size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-600 font-medium">UMKM Terdaftar</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Investor Aktif</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                50M+
              </div>
              <div className="text-gray-600 font-medium">Dana Tersalurkan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse UMKM Section */}
      <section id="browse" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Telusuri UMKM
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Temukan UMKM Potensial
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilih kategori dan temukan UMKM yang sesuai dengan minat investasi Anda
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* UMKM Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUMKM.map((umkm) => (
              <div
                key={umkm.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                    {umkm.invested} Terpenuhi
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {umkm.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {umkm.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={16} className="mr-1" />
                      {umkm.location}
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" className="mr-1" />
                      <span className="text-gray-900 font-semibold">{umkm.rating}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Min. Investasi</p>
                        <p className="text-lg font-bold text-gray-900">{umkm.minInvest}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-1">
                        <span>Lihat Detail</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/browse"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              Lihat Semua UMKM →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Fitur Unggulan
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Semua Yang Anda Butuhkan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform lengkap untuk mengembangkan bisnis UMKM Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Cara Kerja
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mulai Dalam 3 Langkah Mudah
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bergabung dan kembangkan bisnis Anda dengan cepat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Daftar & Buat Profil",
                description: "Buat akun sebagai UMKM, Investor, atau Supplier. Lengkapi profil bisnis Anda dengan informasi detail"
              },
              {
                step: "2",
                title: "Terhubung dengan Partner",
                description: "Cari dan terhubung dengan investor, supplier, atau UMKM yang sesuai dengan kebutuhan bisnis Anda"
              },
              {
                step: "3",
                title: "Kolaborasi & Berkembang",
                description: "Mulai kerja sama, tracking progress, dan kembangkan bisnis bersama dengan sistem yang transparan"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition transform">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Mengembangkan Bisnis UMKM Anda?
          </h2>
          <p className="text-blue-100 mb-10 text-xl leading-relaxed">
            Bergabunglah dengan ribuan UMKM dan investor yang sudah berkembang bersama kami
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 rounded-xl text-lg font-bold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition transform inline-flex items-center space-x-2">
            <span>Daftar Sekarang - Gratis!</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}