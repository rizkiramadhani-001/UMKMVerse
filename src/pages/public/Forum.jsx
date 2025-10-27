// src/pages/public/Forum.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Eye,
  TrendingUp,
  Package,
  Truck,
  Users,
  Clock,
  Filter,
  ChevronRight
} from 'lucide-react';

export default function Forum() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest'); // latest, popular, trending

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalMembers: 0,
    todayPosts: 0
  });

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH FORUM DATA
  // ========================================
  useEffect(() => {
    fetchForumData();
  }, [selectedCategory, sortBy]);

  const fetchForumData = async () => {
    setIsLoading(true);
    
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch(`/api/forum/posts?category=${selectedCategory}&sort=${sortBy}`, {
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
      //     posts: [
      //       {
      //         id: "post-001",
      //         title: "Mencari supplier kemasan ramah lingkungan",
      //         content: "Halo, saya mencari supplier kemasan...",
      //         category: "supply",
      //         author: {
      //           name: "Warung Kopi Nusantara",
      //           role: "umkm",
      //           avatar: "url"
      //         },
      //         likes: 24,
      //         comments: 12,
      //         views: 156,
      //         createdAt: "2024-07-30T10:00:00Z",
      //         tags: ["kemasan", "supplier", "ramah-lingkungan"]
      //       }
      //     ],
      //     stats: {
      //       totalPosts: 1247,
      //       totalMembers: 456,
      //       todayPosts: 23
      //     }
      //   }
      // }

      // DUMMY DATA
      setTimeout(() => {
        const dummyPosts = [
          {
            id: 'post-001',
            title: 'Mencari supplier kemasan ramah lingkungan untuk produk kopi',
            content: 'Halo semua! Saya owner UMKM di bidang kopi dan sedang mencari supplier kemasan yang ramah lingkungan. Budget sekitar 5-10 juta per bulan. Ada rekomendasi?',
            category: 'supply',
            author: {
              name: 'Warung Kopi Nusantara',
              role: 'umkm',
              avatar: null
            },
            likes: 24,
            comments: 12,
            views: 156,
            createdAt: '2024-07-30T10:00:00Z',
            tags: ['kemasan', 'supplier', 'ramah-lingkungan']
          },
          {
            id: 'post-002',
            title: 'Butuh distributor untuk area Jawa Timur',
            content: 'Produk makanan ringan organik kami sudah siap untuk ekspansi ke Jawa Timur. Mencari distributor yang berpengalaman dan memiliki jaringan retail yang luas.',
            category: 'distribution',
            author: {
              name: 'Snack Sehat Indonesia',
              role: 'umkm',
              avatar: null
            },
            likes: 18,
            comments: 8,
            views: 234,
            createdAt: '2024-07-30T08:30:00Z',
            tags: ['distributor', 'jawa-timur', 'makanan']
          },
          {
            id: 'post-003',
            title: 'Tips meningkatkan ROI untuk investor pemula',
            content: 'Sebagai investor yang baru 6 bulan terjun di UMKM, saya ingin share beberapa tips yang saya pelajari untuk memaksimalkan ROI...',
            category: 'partnership',
            author: {
              name: 'John Investor',
              role: 'investor',
              avatar: null
            },
            likes: 45,
            comments: 23,
            views: 589,
            createdAt: '2024-07-29T14:20:00Z',
            tags: ['investment', 'tips', 'roi']
          },
          {
            id: 'post-004',
            title: 'Ada yang punya pengalaman kerja sama dengan ekspor?',
            content: 'UMKM saya sudah mulai dapat inquiry dari luar negeri. Ada yang bisa share pengalaman tentang ekspor, perizinan, dan logistik internasional?',
            category: 'qa',
            author: {
              name: 'Kerajinan Tangan Nusantara',
              role: 'umkm',
              avatar: null
            },
            likes: 12,
            comments: 15,
            views: 178,
            createdAt: '2024-07-29T11:00:00Z',
            tags: ['ekspor', 'perizinan', 'logistik']
          },
          {
            id: 'post-005',
            title: 'Tersedia: Bahan baku organik untuk F&B',
            content: 'Kami supplier bahan baku organik dengan sertifikasi lengkap. Melayani pengiriman ke seluruh Indonesia. Harga kompetitif dan kualitas terjamin.',
            category: 'supply',
            author: {
              name: 'CV Organik Sejahtera',
              role: 'supplier',
              avatar: null
            },
            likes: 8,
            comments: 5,
            views: 123,
            createdAt: '2024-07-28T16:45:00Z',
            tags: ['bahan-baku', 'organik', 'fnb']
          }
        ];

        const dummyStats = {
          totalPosts: 1247,
          totalMembers: 456,
          todayPosts: 23
        };

        setPosts(dummyPosts);
        setStats(dummyStats);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error fetching forum data:', error);
      setIsLoading(false);
    }
  };

  // Filter & Sort
  const filteredPosts = posts.filter(post => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Categories
  const categoryList = [
    { id: 'all', name: 'Semua', icon: <MessageSquare size={18} />, count: posts.length },
    { id: 'supply', name: 'Supply', icon: <Package size={18} />, count: posts.filter(p => p.category === 'supply').length },
    { id: 'distribution', name: 'Distribusi', icon: <Truck size={18} />, count: posts.filter(p => p.category === 'distribution').length },
    { id: 'partnership', name: 'Partnership', icon: <Users size={18} />, count: posts.filter(p => p.category === 'partnership').length },
    { id: 'qa', name: 'Q&A', icon: <MessageCircle size={18} />, count: posts.filter(p => p.category === 'qa').length }
  ];

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} menit lalu`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} jam lalu`;
    } else if (diffInHours < 48) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      umkm: 'bg-blue-100 text-blue-700',
      investor: 'bg-green-100 text-green-700',
      supplier: 'bg-orange-100 text-orange-700',
      distributor: 'bg-purple-100 text-purple-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getRoleLabel = (role) => {
    const labels = {
      umkm: 'UMKM Owner',
      investor: 'Investor',
      supplier: 'Supplier',
      distributor: 'Distributor'
    };
    return labels[role] || role;
  };

  const handleCreatePost = () => {
    // Redirect to login if not authenticated
    navigate('/login', { state: { from: '/forum' } });
  };

  const handlePostClick = (postId) => {
    // Redirect to login for detail
    navigate('/login', { state: { from: `/forum/${postId}` } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat forum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Forum Diskusi</h1>
          <p className="text-xl text-gray-600">Tempat berbagi informasi, mencari partner, dan bertanya jawab</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <MessageSquare className="text-blue-600" size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Users className="text-green-600" size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Posts Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.todayPosts}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <TrendingUp className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
              <div className="space-y-2">
                {categoryList.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition ${
                      selectedCategory === cat.id
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === cat.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCreatePost}
                className="w-full mt-6 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                <Plus size={20} />
                <span>Buat Post Baru</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari post, tag, atau kata kunci..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <MessageSquare className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada post</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? 'Tidak ditemukan hasil pencarian' : 'Belum ada post di kategori ini'}
                </p>
                <button
                  onClick={handleCreatePost}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  <Plus size={20} />
                  <span>Buat Post Pertama</span>
                </button>
              </div>
            ) : (
              filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition cursor-pointer"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {post.author.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{post.author.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleColor(post.author.role)}`}>
                            {getRoleLabel(post.author.role)}
                          </span>
                          <span className="text-xs text-gray-500">• {formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp size={16} />
                      <span>{post.likes} Likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={16} />
                      <span>{post.comments} Comments</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={16} />
                      <span>{post.views} Views</span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <div className="text-center">
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition">
                  Load More Posts
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Bergabung dengan Komunitas!</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Daftar sekarang untuk bisa membuat post, berkomentar, dan terhubung dengan ribuan pelaku UMKM lainnya
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Daftar Gratis Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}