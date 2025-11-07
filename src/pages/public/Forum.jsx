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
  Send,
  Tag,
  Type,
  AlignLeft,
  X
} from 'lucide-react';

export default function Forum() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'supply',
    tags: ''
  });

  const [comment, setComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalMembers: 0,
    todayPosts: 0
  });

  useEffect(() => {
    fetchForumData();
  }, [selectedCategory, sortBy]);

  const fetchForumData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const dummyPosts = [
        {
          id: 'post-001',
          title: 'Mencari supplier kemasan ramah lingkungan untuk produk kopi',
          content:
            'Halo semua! Saya owner UMKM di bidang kopi dan sedang mencari supplier kemasan yang ramah lingkungan. Budget sekitar 5-10 juta per bulan. Ada rekomendasi?',
          category: 'supply',
          author: { name: 'Warung Kopi Nusantara', role: 'umkm' },
          likes: 24,
          views: 156,
          comments: [
            { user: 'EcoPack Indonesia', content: 'Kami bisa bantu! Hubungi kami ya.' },
            { user: 'GreenWrap', content: 'Kami juga punya kemasan biodegradable.' }
          ],
          tags: ['kemasan', 'supplier', 'ramah-lingkungan'],
          createdAt: '2024-07-30T10:00:00Z'
        },
        {
          id: 'post-002',
          title: 'Butuh distributor untuk area Jawa Timur',
          content:
            'Produk makanan ringan organik kami sudah siap untuk ekspansi ke Jawa Timur. Mencari distributor yang berpengalaman dan memiliki jaringan retail yang luas.',
          category: 'distribution',
          author: { name: 'Snack Sehat Indonesia', role: 'umkm' },
          likes: 18,
          views: 234,
          comments: [
            { user: 'Jaya Distribusi', content: 'Kami siap bantu distribusi area Surabaya.' }
          ],
          tags: ['distributor', 'jawa-timur', 'makanan'],
          createdAt: '2024-07-30T08:30:00Z'
        },
        {
          id: 'post-003',
          title: 'Tips mengelola inventory untuk UMKM kuliner',
          content:
            'Bagi yang sudah berpengalaman, boleh share tips mengelola inventory bahan baku agar tidak banyak waste? Saya baru 6 bulan jalan dan masih banyak belajar.',
          category: 'question',
          author: { name: 'Dapur Mama', role: 'umkm' },
          likes: 45,
          views: 421,
          comments: [
            { user: 'Supply Chain Expert', content: 'Gunakan sistem FIFO (First In First Out).' },
            { user: 'Resto Manager', content: 'Coba pakai aplikasi inventory management.' },
            { user: 'Chef Budi', content: 'Planning menu mingguan sangat membantu.' }
          ],
          tags: ['inventory', 'tips', 'kuliner'],
          createdAt: '2024-07-29T15:20:00Z'
        },
        {
          id: 'post-004',
          title: 'Mencari partner untuk kolaborasi produk lokal',
          content:
            'Kami produsen keripik singkong dari Malang ingin berkolaborasi dengan UMKM lain untuk bundling produk. Target pasar: gift box premium dan hampers.',
          category: 'partnership',
          author: { name: 'Keripik Nusantara', role: 'umkm' },
          likes: 32,
          views: 198,
          comments: [
            { user: 'Kopi Lokal', content: 'Menarik! Kami punya kopi specialty.' },
            { user: 'Madu Murni', content: 'Bisa gabung untuk hampers sehat?' }
          ],
          tags: ['kolaborasi', 'partnership', 'hampers'],
          createdAt: '2024-07-29T11:45:00Z'
        }
      ];
      const dummyStats = { totalPosts: 1247, totalMembers: 456, todayPosts: 23 };
      setPosts(dummyPosts);
      setStats(dummyStats);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newPost = {
        id: `post-${Date.now()}`,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        author: { name: 'Anda', role: 'umkm' },
        likes: 0,
        views: 1,
        comments: [],
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
      setFormData({ title: '', content: '', category: 'supply', tags: '' });
      setIsSubmitting(false);
      setShowCreateModal(false);
    }, 1000);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const updated = posts.map((p) =>
      p.id === selectedPost.id
        ? { ...p, comments: [...p.comments, { user: 'Anda', content: comment }] }
        : p
    );
    setPosts(updated);
    setSelectedPost({
      ...selectedPost,
      comments: [...selectedPost.comments, { user: 'Anda', content: comment }]
    });
    setComment('');
    setShowCommentModal(false);
    setShowDetailModal(true);
  };

  const openDetail = (post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      supply: 'Supply Chain',
      distribution: 'Distribusi',
      partnership: 'Kemitraan',
      question: 'Pertanyaan'
    };
    return labels[category] || category;
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat forum...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Forum Diskusi</h1>
          <p className="text-xl text-gray-600">
            Tempat berbagi informasi, mencari partner, dan bertanya jawab
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Posts"
            value={stats.totalPosts}
            icon={<MessageSquare className="text-blue-600" size={32} />}
          />
          <StatCard
            title="Active Members"
            value={stats.totalMembers}
            icon={<Users className="text-green-600" size={32} />}
          />
          <StatCard
            title="Posts Today"
            value={stats.todayPosts}
            icon={<TrendingUp className="text-purple-600" size={32} />}
          />
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari diskusi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Semua Kategori</option>
              <option value="supply">Supply Chain</option>
              <option value="distribution">Distribusi</option>
              <option value="partnership">Kemitraan</option>
              <option value="question">Pertanyaan</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="latest">Terbaru</option>
              <option value="popular">Terpopuler</option>
              <option value="most-commented">Terbanyak Komentar</option>
            </select>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => openDetail(post)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {getCategoryLabel(post.category)}
                    </span>
                    <span className="text-sm text-gray-500">oleh {post.author.name}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={14} /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} /> {post.comments.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {post.views}
                  </span>
                </div>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Button create */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span>Buat Post Baru</span>
          </button>
        </div>
      </div>

      {/* 🟦 Modal Buat Post */}
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)} title="Buat Post Baru">
          <form onSubmit={handleSubmitPost} className="space-y-6">
            <Input
              label="Judul"
              icon={<Type size={18} />}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="supply">Supply Chain</option>
                <option value="distribution">Distribusi</option>
                <option value="partnership">Kemitraan</option>
                <option value="question">Pertanyaan</option>
              </select>
            </div>
            <TextArea
              label="Isi Post"
              icon={<AlignLeft size={18} />}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
            <Input
              label="Tags"
              icon={<Tag size={18} />}
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Pisahkan dengan koma (contoh: kemasan, supplier, organik)"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Kirim Post</span>
                </>
              )}
            </button>
          </form>
        </Modal>
      )}

      {/* 🟩 Modal Detail Post */}
      {showDetailModal && selectedPost && (
        <Modal onClose={() => setShowDetailModal(false)} title="">
          <div className="space-y-6">
            {/* Post Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full">
                  {getCategoryLabel(selectedPost.category)}
                </span>
                <span className="text-sm text-gray-500">{formatDate(selectedPost.createdAt)}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedPost.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Users size={16} />
                <span className="font-medium">{selectedPost.author.name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{selectedPost.author.role === 'umkm' ? 'UMKM' : 'Supplier'}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedPost.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <ThumbsUp size={18} />
                <span className="font-medium">{selectedPost.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle size={18} />
                <span className="font-medium">{selectedPost.comments.length}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Eye size={18} />
                <span className="font-medium">{selectedPost.views}</span>
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Komentar ({selectedPost.comments.length})
              </h3>
              {selectedPost.comments.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {selectedPost.comments.map((c, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-semibold text-sm">
                            {c.user.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900 text-sm">{c.user}</span>
                            <span className="text-xs text-gray-400">baru saja</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{c.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl mb-6">
                  <MessageCircle size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">Belum ada komentar</p>
                  <p className="text-xs text-gray-400 mt-1">Jadilah yang pertama berkomentar!</p>
                </div>
              )}

              {/* Add Comment Button */}
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setShowCommentModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                <MessageCircle size={18} />
                <span>Tambah Komentar</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 🟨 Modal Tambah Komentar */}
      {showCommentModal && (
        <Modal onClose={() => setShowCommentModal(false)} title="Tambah Komentar">
          <form onSubmit={handleAddComment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Komentar Anda</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar Anda di sini..."
                rows="6"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Berikan tanggapan yang konstruktif dan saling menghormati
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setComment('');
                  setShowCommentModal(false);
                  setShowDetailModal(true);
                }}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>Kirim Komentar</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// 🧩 Reusable Components
function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
        {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          {...props}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function TextArea({ label, icon, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-gray-400">{icon}</div>}
        <textarea
          {...props}
          rows="5"
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
      <div className="p-3 rounded-xl bg-gray-50">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}