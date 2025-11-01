import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  TrendingUp,
  Users,
  X,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal
} from 'lucide-react';

export default function BrowseUMKM() {
  const navigate = useNavigate();

  const [allUMKM, setAllUMKM] = useState([]); // data dari backend
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filters, setFilters] = useState({
    minInvestment: '',
    maxInvestment: '',
    location: '',
    minRating: 0,
    investmentProgress: 'all'
  });

useEffect(() => {
  const fetchUMKM = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://127.0.0.1:8000/api/umkm', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      // Cek apakah data array ada di res.data.data atau langsung di res.data
      const dataArray = Array.isArray(res.data) ? res.data : res.data.data;

      const formattedData = (dataArray || []).map((item) => ({
        id: item.id,
        name: item.namaUmkm,
        category: item.bidangUsaha?.toLowerCase() || 'lainnya',
        description: item.deskripsiSingkat || '-',
        location: item.lokasiUsaha || '-',
        rating: 4.8,
        reviewCount: 0,
        image:
          item.foto_produk?.length > 0
            ? `http://127.0.0.1:8000/storage/${item.foto_produk[0].path}`
            : 'https://via.placeholder.com/400x300?text=No+Image',
        invested: 60,
        minInvest: item.minInvestasi || 0,
        targetInvest: item.targetInvestasi || 0,
        roi: 18.5,
        investorCount: 10,
        verified: true,
      }));

      setAllUMKM(formattedData);
    } catch (err) {
      console.error('Error fetching UMKM:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUMKM();
}, []);


  // 🔍 Filter dan pencarian
  const filteredUMKM = allUMKM.filter((umkm) => {
    const matchesSearch =
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || umkm.category === selectedCategory;
    const matchesLocation =
      !filters.location ||
      umkm.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinInvest =
      !filters.minInvestment || umkm.minInvest >= filters.minInvestment;
    const matchesMaxInvest =
      !filters.maxInvestment || umkm.minInvest <= filters.maxInvestment;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesMinInvest &&
      matchesMaxInvest
    );
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);
  const paginatedUMKM = filteredUMKM.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔄 Fungsi ganti halaman
  const changePage = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next'
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  // 🧭 Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 text-lg font-semibold animate-pulse">
          Loading data UMKM...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* 🔍 Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-3">
        <div className="flex-grow flex items-center bg-white rounded-xl shadow px-4 py-2">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari UMKM atau bidang usaha..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 focus:outline-none bg-transparent"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* 🧾 Filters */}
      {showFilters && (
        <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow mb-6">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Lokasi"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Min Investasi"
              value={filters.minInvestment}
              onChange={(e) =>
                setFilters({ ...filters, minInvestment: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Max Investasi"
              value={filters.maxInvestment}
              onChange={(e) =>
                setFilters({ ...filters, maxInvestment: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
            <button
              onClick={() =>
                setFilters({
                  minInvestment: '',
                  maxInvestment: '',
                  location: '',
                  minRating: 0,
                  investmentProgress: 'all',
                })
              }
              className="flex items-center gap-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      )}

      {/* 🏪 Grid UMKM */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedUMKM.map((umkm) => (
          <div
            key={umkm.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group cursor-pointer"
            onClick={() => navigate(`/umkm/${umkm.id}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {umkm.verified && (
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Verified
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {umkm.name}
              </h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" /> {umkm.location}
              </div>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {umkm.description}
              </p>

              <div className="mt-3 flex justify-between items-center text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {umkm.rating} ({umkm.reviewCount})
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" /> ROI {umkm.roi}%
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center border-t pt-3">
                <span className="text-blue-600 font-semibold text-sm">
                  Rp {umkm.minInvest.toLocaleString()}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Users className="w-4 h-4 mr-1" /> {umkm.investorCount} Investor
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => changePage('prev')}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="text-gray-700 font-medium">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => changePage('next')}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
