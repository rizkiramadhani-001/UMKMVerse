/// src/pages/public/BrowseUMKM.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  X,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal
} from 'lucide-react';

export default function BrowseUMKM() {
  const navigate = useNavigate();

  // State utama
  const [allUMKM, setAllUMKM] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filters, setFilters] = useState({
    location: '',
    minRating: 0
  });

  const categories = [
    { id: 'all', name: 'Semua', icon: '🏢' },
    { id: 'fnb', name: 'Food & Beverage', icon: '🍔' },
    { id: 'agrikultur', name: 'Agrikultur', icon: '🌾' },
    { id: 'service', name: 'Service / Jasa', icon: '⚙️' }
  ];

  // === Fetch Data dari API ===
  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:8000/api/umkm/supplier');

        // Pastikan response adalah array
        const umkmArray = Array.isArray(res.data) ? res.data : res.data.data || [];

        const formatted = umkmArray.map((item) => ({
          id: item.id,
          name: item.namaUmkm,
          category: item.bidangUsaha || 'other',
          description: item.deskripsiSingkat,
          location: item.lokasiUsaha,
          rating: 4.8,
          reviewCount: 0,
          image: item.foto_produk?.length
            ? `http://127.0.0.1:8000/storage/${item.foto_produk[0].path}`
            : `https://placehold.co/400x300?text=${encodeURIComponent(item.namaUmkm)}`,
          verified: true
        }));

        setAllUMKM(formatted);
      } catch (error) {
        console.error('Error fetching UMKM:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  // === Filter ===
  const filteredUMKM = allUMKM.filter((umkm) => {
    if (selectedCategory !== 'all' && umkm.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !umkm.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (filters.location && !umkm.location.toLowerCase().includes(filters.location.toLowerCase()))
      return false;
    if (filters.minRating && umkm.rating < filters.minRating) return false;
    return true;
  });

  // === Sort ===
  const sortedUMKM = [...filteredUMKM].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id - a.id;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popular':
      default:
        return b.rating - a.rating;
    }
  });

  // === Pagination ===
  const totalPages = Math.ceil(sortedUMKM.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUMKM = sortedUMKM.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setFilters({
      location: '',
      minRating: 0
    });
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleCardClick = (umkmId) => navigate(`/umkm-dashboard/umkm/${umkmId}`);

  // === Render ===
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-700">
        ⏳ Memuat data UMKM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            🔍 Explore UMKM Potensial
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Temukan Supplier Terbaik
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Jelajahi {allUMKM.length}+ UMKM terverifikasi di berbagai kategori bisnis
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama UMKM atau kata kunci..."
                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600">{allUMKM.length}</div>
              <div className="text-sm text-gray-600">UMKM Terdaftar</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600">4.8</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                  }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filter</span>
                  {Object.values(filters).some(v => v && v !== 0) && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                      {Object.values(filters).filter(v => v && v !== 0).length}
                    </span>
                  )}
                </button>

                {Object.values(filters).some(v => v && v !== 0) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Terbaru</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="name">Nama (A-Z)</option>
                </select>

                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredUMKM.length}</span> hasil ditemukan
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="Cari kota..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Semua Rating</option>
                    <option value={4}>4+ ⭐</option>
                    <option value={4.5}>4.5+ ⭐</option>
                    <option value={4.8}>4.8+ ⭐</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* UMKM Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {paginatedUMKM.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada hasil ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedUMKM.map((umkm) => (
                  <div
                    key={umkm.id}
                    onClick={() => handleCardClick(umkm.id)}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-200"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={umkm.image}
                        alt={umkm.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        {umkm.verified && (
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold flex items-center space-x-1">
                            <span>✓</span>
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
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
                          <span className="text-gray-500 text-sm ml-1">({umkm.reviewCount})</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-end">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-1 group-hover:scale-105 transform">
                            <span>Lihat Detail</span>
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border-2 transition ${currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                      }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition ${currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border-2 transition ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                      }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Punya UMKM?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Daftarkan UMKM Anda dan promosikan bisnis Anda kepada ribuan pengunjung
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-4 bg-white text-blue-600 rounded-xl text-lg font-bold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition transform inline-flex items-center space-x-2"
          >
            <span>Daftar Sebagai UMKM</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}