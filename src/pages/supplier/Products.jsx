// src/pages/supplier/Products.jsx
import { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Box,
  BarChart3,
  Image as ImageIcon,
  X,
  Save,
  Upload
} from 'lucide-react';

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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    unit: '',
    stock: '',
    minOrder: '',
    images: [],
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState([]);

  // ==================== BACKEND INTEGRATION ====================
  // TODO: Integrate dengan backend - Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/supplier/products', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setProducts(data.products);

        // Dummy data - hapus setelah integrate dengan backend
        setTimeout(() => {
          setProducts([
            {
              id: 1,
              name: 'Biji Kopi Arabica Premium',
              category: 'bahan-baku',
              categoryName: 'Bahan Baku',
              description: 'Biji kopi arabica grade A dari perkebunan Aceh Gayo',
              price: 120000,
              unit: 'kg',
              stock: 500,
              minOrder: 10,
              sold: 450,
              image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
              status: 'active',
              views: 1245,
              createdAt: '2024-01-15'
            },
            {
              id: 2,
              name: 'Tepung Terigu Protein Tinggi',
              category: 'bahan-baku',
              categoryName: 'Bahan Baku',
              description: 'Tepung terigu protein tinggi cocok untuk roti dan pastry',
              price: 18000,
              unit: 'kg',
              stock: 1200,
              minOrder: 25,
              sold: 1150,
              image: 'https://images.unsplash.com/photo-1574968270082-b1c8e3386c3d?w=300&h=300&fit=crop',
              status: 'active',
              views: 2340,
              createdAt: '2024-02-10'
            },
            {
              id: 3,
              name: 'Kemasan Plastik Food Grade',
              category: 'packaging',
              categoryName: 'Packaging',
              description: 'Kemasan plastik food grade berbagai ukuran',
              price: 500,
              unit: 'pcs',
              stock: 5000,
              minOrder: 100,
              sold: 4200,
              image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=300&h=300&fit=crop',
              status: 'active',
              views: 890,
              createdAt: '2024-03-05'
            },
            {
              id: 4,
              name: 'Pupuk Organik Kompos',
              category: 'pertanian',
              categoryName: 'Pertanian',
              description: 'Pupuk organik dari kompos berkualitas tinggi',
              price: 25000,
              unit: 'kg',
              stock: 0,
              minOrder: 50,
              sold: 800,
              image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=300&fit=crop',
              status: 'out-of-stock',
              views: 567,
              createdAt: '2024-04-20'
            },
            {
              id: 5,
              name: 'Gula Pasir Kemasan 1kg',
              category: 'bahan-baku',
              categoryName: 'Bahan Baku',
              description: 'Gula pasir kualitas premium',
              price: 15000,
              unit: 'kg',
              stock: 300,
              minOrder: 20,
              sold: 280,
              image: 'https://images.unsplash.com/photo-1582454734395-c8c1cb07e65b?w=300&h=300&fit=crop',
              status: 'inactive',
              views: 234,
              createdAt: '2024-05-12'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // TODO: Integrate dengan backend - Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/supplier/product-categories', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setCategories(data.categories);

        // Dummy data - hapus setelah integrate
        setCategories([
          { id: 'bahan-baku', name: 'Bahan Baku', count: 15 },
          { id: 'packaging', name: 'Packaging', count: 8 },
          { id: 'pertanian', name: 'Pertanian', count: 12 },
          { id: 'logistik', name: 'Logistik', count: 5 }
        ]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // TODO: Integrate dengan backend - Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace dengan API call ke backend
        // const response = await fetch('/api/supplier/products/stats', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        // setStats(data);

        // Dummy data - hapus setelah integrate
        setStats({
          totalProducts: 48,
          activeProducts: 42,
          outOfStock: 4,
          totalViews: 5276,
          totalSold: 6880
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // TODO: Integrate dengan backend - Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // TODO: Replace dengan API call ke backend
      // Gunakan FormData untuk upload images
      // const formDataToSend = new FormData();
      // formDataToSend.append('name', formData.name);
      // formDataToSend.append('category', formData.category);
      // formDataToSend.append('description', formData.description);
      // formDataToSend.append('price', formData.price);
      // formDataToSend.append('unit', formData.unit);
      // formDataToSend.append('stock', formData.stock);
      // formDataToSend.append('minOrder', formData.minOrder);
      // formDataToSend.append('status', formData.status);
      // formData.images.forEach((image, index) => {
      //   formDataToSend.append(`images[${index}]`, image);
      // });
      //
      // const response = await fetch('/api/supplier/products', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: formDataToSend
      // });
      //
      // if (response.ok) {
      //   const data = await response.json();
      //   alert('✅ Produk berhasil ditambahkan!');
      //   setShowAddModal(false);
      //   resetForm();
      //   // Refresh products list
      //   fetchProducts();
      // } else {
      //   alert('❌ Gagal menambahkan produk. Silakan coba lagi.');
      // }

      // Simulasi success - hapus setelah integrate
      setTimeout(() => {
        alert('✅ Produk berhasil ditambahkan!');
        setShowAddModal(false);
        resetForm();
        // Simulasi refresh - nanti pakai fetchProducts()
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('❌ Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Integrate dengan backend - Update Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // TODO: Replace dengan API call ke backend
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   if (key === 'images' && Array.isArray(formData[key])) {
      //     formData[key].forEach((image, index) => {
      //       if (image instanceof File) {
      //         formDataToSend.append(`images[${index}]`, image);
      //       }
      //     });
      //   } else {
      //     formDataToSend.append(key, formData[key]);
      //   }
      // });
      //
      // const response = await fetch(`/api/supplier/products/${selectedProduct.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: formDataToSend
      // });
      //
      // if (response.ok) {
      //   alert('✅ Produk berhasil diupdate!');
      //   setShowEditModal(false);
      //   resetForm();
      //   fetchProducts();
      // }

      // Simulasi - hapus setelah integrate
      setTimeout(() => {
        alert('✅ Produk berhasil diupdate!');
        setShowEditModal(false);
        resetForm();
      }, 1500);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('❌ Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Integrate dengan backend - Delete Product
  const handleDeleteProduct = async (productId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    
    setIsLoading(true);
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/supplier/products/${productId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      //
      // if (response.ok) {
      //   alert('✅ Produk berhasil dihapus!');
      //   fetchProducts();
      // }

      // Simulasi - hapus setelah integrate
      setTimeout(() => {
        alert('✅ Produk berhasil dihapus!');
        setProducts(products.filter(p => p.id !== productId));
      }, 1000);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Integrate dengan backend - Toggle Product Status
  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      // TODO: Replace dengan API call ke backend
      // const response = await fetch(`/api/supplier/products/${productId}/status`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // });
      //
      // if (response.ok) {
      //   fetchProducts();
      // }

      // Simulasi - hapus setelah integrate
      setProducts(products.map(p => 
        p.id === productId ? { ...p, status: newStatus } : p
      ));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (imagePreview.length + files.length > 5) {
      alert('Maksimal 5 foto produk');
      return;
    }

    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, file]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Nama produk wajib diisi';
    if (!formData.category) errors.category = 'Kategori wajib dipilih';
    if (!formData.description.trim()) errors.description = 'Deskripsi wajib diisi';
    if (!formData.price || formData.price <= 0) errors.price = 'Harga harus lebih dari 0';
    if (!formData.unit.trim()) errors.unit = 'Satuan wajib diisi';
    if (!formData.stock || formData.stock < 0) errors.stock = 'Stok tidak boleh negatif';
    if (!formData.minOrder || formData.minOrder <= 0) errors.minOrder = 'Minimal order harus lebih dari 0';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      unit: '',
      stock: '',
      minOrder: '',
      images: [],
      status: 'active'
    });
    setFormErrors({});
    setImagePreview([]);
    setSelectedProduct(null);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      unit: product.unit,
      stock: product.stock,
      minOrder: product.minOrder,
      images: [],
      status: product.status
    });
    setImagePreview(product.image ? [product.image] : []);
    setShowEditModal(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Aktif</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Stok Habis</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Eye className="text-purple-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <TrendingUp className="text-orange-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Terjual</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalSold}</p>
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
              <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
            ))}
          </select>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produk ditemukan
          </div>
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
      ) : filteredProducts.length === 0 ? (
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' :
                    product.status === 'out-of-stock' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status === 'active' ? 'Aktif' :
                     product.status === 'out-of-stock' ? 'Stok Habis' :
                     'Nonaktif'}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">
                    {product.categoryName}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                {/* Price & Unit */}
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-bold text-orange-600">{formatCurrency(product.price)}</span>
                  <span className="text-sm text-gray-500">/ {product.unit}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Stok</p>
                    <p className="text-sm font-bold text-gray-900">{product.stock}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Min Order</p>
                    <p className="text-sm font-bold text-gray-900">{product.minOrder}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Terjual</p>
                    <p className="text-sm font-bold text-gray-900">{product.sold}</p>
                  </div>
                </div>

                {/* Views */}
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <Eye size={16} />
                  <span>{product.views} views</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleStatus(product.id, product.status)}
                    disabled={product.status === 'out-of-stock'}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition ${
                      product.status === 'active'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : product.status === 'out-of-stock'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {product.status === 'active' ? (
                      <span className="flex items-center justify-center space-x-1">
                        <EyeOff size={16} />
                        <span>Nonaktifkan</span>
                      </span>
                    ) : product.status === 'out-of-stock' ? (
                      <span>Stok Habis</span>
                    ) : (
                      <span className="flex items-center justify-center space-x-1">
                        <Eye size={16} />
                        <span>Aktifkan</span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6">
              <div className="space-y-6">
                {/* Product Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Foto Produk <span className="text-red-500">*</span>
                    <span className="text-gray-500 font-normal ml-2">(Maksimal 5 foto)</span>
                  </label>
                  
                  <div className="grid grid-cols-5 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    
                    {imagePreview.length < 5 && (
                      <div
                        onClick={() => document.getElementById('imageUpload').click()}
                        className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-orange-400 transition cursor-pointer"
                      >
                        <Upload className="text-gray-400 mb-2" size={24} />
                        <p className="text-xs text-gray-500 text-center">Upload</p>
                        <input
                          type="file"
                          id="imageUpload"
                          className="hidden"
                          accept="image/png,image/jpeg,image/jpg"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Produk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Contoh: Biji Kopi Arabica Premium"
                  />
                  {formErrors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.category ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>{formErrors.category}</span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi Produk <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.description ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Jelaskan detail produk, spesifikasi, kualitas, dll..."
                  />
                  {formErrors.description && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>{formErrors.description}</span>
                    </p>
                  )}
                </div>

                {/* Price & Unit */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Harga (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        formErrors.price ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="0"
                      min="0"
                    />
                    {formErrors.price && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formErrors.price}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Satuan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        formErrors.unit ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="kg, liter, pcs, dll"
                    />
                    {formErrors.unit && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formErrors.unit}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Stock & Min Order */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stok Tersedia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        formErrors.stock ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="0"
                      min="0"
                    />
                    {formErrors.stock && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formErrors.stock}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimal Order <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minOrder"
                      value={formData.minOrder}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        formErrors.minOrder ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="0"
                      min="1"
                    />
                    {formErrors.minOrder && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>{formErrors.minOrder}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status Produk
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Aktif</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Nonaktif</span>
                    </label>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-xs text-gray-700">
                      <p className="font-semibold mb-1">Tips:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Gunakan foto produk yang jelas dan berkualitas</li>
                        <li>Tulis deskripsi lengkap untuk menarik pembeli</li>
                        <li>Set minimal order yang realistis</li>
                        <li>Update stok secara berkala</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Save size={20} />
                  <span>{isLoading ? 'Menyimpan...' : 'Simpan Produk'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Edit Produk</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="p-6">
              <div className="space-y-6">
                {/* Product Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Foto Produk <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="grid grid-cols-5 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    
                    {imagePreview.length < 5 && (
                      <div
                        onClick={() => document.getElementById('imageUploadEdit').click()}
                        className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-orange-400 transition cursor-pointer"
                      >
                        <Upload className="text-gray-400 mb-2" size={24} />
                        <p className="text-xs text-gray-500 text-center">Upload</p>
                        <input
                          type="file"
                          id="imageUploadEdit"
                          className="hidden"
                          accept="image/png,image/jpeg,image/jpg"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Same form fields as Add Modal */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Produk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.category ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi Produk <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.description ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Harga (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Satuan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stok Tersedia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimal Order <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minOrder"
                      value={formData.minOrder}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status Produk
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Aktif</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Nonaktif</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Save size={20} />
                  <span>{isLoading ? 'Menyimpan...' : 'Update Produk'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}