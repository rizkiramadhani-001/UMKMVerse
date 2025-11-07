// src/pages/supplier/Products.jsx
import ProductForm from './ProductForm';
import { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  X
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/supplier';

export default function SupplierProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk data dari backend
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Get auth token
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  });

  // ==================== BACKEND INTEGRATION ====================
  
  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  // Fetch Categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch Stats
  useEffect(() => {
    fetchStats();
  }, []);

  /**
   * Fetch products from API
   */
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category_id', selectedCategory);
      params.append('per_page', '50'); // Load more products
      params.append('sort_by', 'created_at');
      params.append('sort_order', 'desc');

      const response = await axios.get(
        `${API_BASE_URL}/products?${params}`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        setProducts(response.data.data.data); // pagination data
        setPagination({
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          total: response.data.data.total,
        });

        
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Gagal memuat produk');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch categories from API
   */
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/categories`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  /**
   * Fetch statistics from API
   */
  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/stats/summary`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  /**
   * Handle create product success
   */
  const handleCreateSuccess = (product) => {
    setShowAddModal(false);
    fetchProducts(); // Refresh list
    fetchStats(); // Refresh stats
  };

  /**
   * Handle edit product success
   */
  const handleEditSuccess = (product) => {
    setShowEditModal(false);
    setSelectedProduct(null);
    fetchProducts(); // Refresh list
  };

  /**
   * Delete product
   */
  const handleDeleteProduct = async (productId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/products/${productId}`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        alert('✅ Produk berhasil dihapus!');
        fetchProducts();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Gagal menghapus produk. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle product status (active/inactive)
   */
  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/products/${productId}/status`,
        { status: newStatus },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        // Update local state
        setProducts(products.map(p => 
          p.id === productId ? { ...p, status: newStatus } : p
        ));
        fetchStats(); // Update stats
        alert(`✅ Produk berhasil ${newStatus === 'active' ? 'diaktifkan' : 'dinonaktifkan'}!`);
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('❌ Gagal mengubah status produk.');
    }
  };

  // ============================================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  /**
   * Get status badge for product
   */
  const getStatusInfo = (product) => {
    if (product.stock === 0) {
      return {
        label: 'Stok Habis',
        className: 'bg-red-100 text-red-700',
        canToggle: false
      };
    }
    
    if (product.status === 'active') {
      return {
        label: 'Aktif',
        className: 'bg-green-100 text-green-700',
        canToggle: true
      };
    }
    
    return {
      label: 'Nonaktif',
      className: 'bg-gray-100 text-gray-700',
      canToggle: true
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Produk</h1>
          <p className="text-gray-600 mt-1">Manage produk supply untuk UMKM</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition transform"
        >
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="text-blue-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Produk</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total_products}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Aktif</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.active_products}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Stok Habis</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.out_of_stock_products}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Eye className="text-purple-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total_views.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <TrendingUp className="text-orange-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total_orders.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama produk..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {pagination && (
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{products.length}</span> dari{' '}
              <span className="font-semibold text-gray-900">{pagination.total}</span> produk
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada produk</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || selectedCategory !== 'all' 
              ? 'Tidak ada produk yang sesuai dengan pencarian'
              : 'Belum ada produk. Tambahkan produk pertama Anda!'}
          </p>
          {(!searchQuery && selectedCategory === 'all') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition"
            >
              Tambah Produk Pertama
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const statusInfo = getStatusInfo(product);
            console.log(product)
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {product.images ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.images}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="text-gray-300" size={64} />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
                      {statusInfo.label}
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  {/* Price & Unit */}
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-2xl font-bold text-orange-600">{product.formatted_price}</span>
                    <span className="text-sm text-gray-500">/ {product.unit}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Stok</p>
                      <p className={`text-sm font-bold ${
                        product.stock === 0 ? 'text-red-600' :
                        product.is_low_stock ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {product.stock}
                      </p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Min Order</p>
                      <p className="text-sm font-bold text-gray-900">{product.min_order}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="text-sm font-bold text-gray-900">{product.order_count}</p>
                    </div>
                  </div>

                  {/* Views */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Eye size={16} />
                    <span>{product.view_count} views</span>
                    {product.rating > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span>⭐ {product.rating.toFixed(1)}</span>
                      </>
                    )}
                  </div>

                  {/* Low Stock Warning */}
                  {product.is_low_stock && product.stock > 0 && (
                    <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-700 font-medium">
                        ⚠️ Stok menipis! Segera restock
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(product.id, product.status)}
                      disabled={!statusInfo.canToggle}
                      className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition ${
                        product.status === 'active'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : product.stock === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {product.status === 'active' ? (
                        <span className="flex items-center justify-center space-x-1">
                          <EyeOff size={16} />
                          <span>Nonaktifkan</span>
                        </span>
                      ) : product.stock === 0 ? (
                        <span>Stok Habis</span>
                      ) : (
                        <span className="flex items-center justify-center space-x-1">
                          <Eye size={16} />
                          <span>Aktifkan</span>
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      title="Edit Produk"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      title="Hapus Produk"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between z-10">
              <h3 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <ProductForm
              mode="create"
              onSuccess={handleCreateSuccess}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between z-10">
              <h3 className="text-2xl font-bold text-gray-900">Edit Produk</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedProduct(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <ProductForm
              mode="edit"
              productId={selectedProduct.id}
              onSuccess={handleEditSuccess}
              onCancel={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}