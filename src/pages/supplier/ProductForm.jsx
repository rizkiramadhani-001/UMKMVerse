import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AlertCircle,
  X,
  Save,
  Upload
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm({ mode = 'create' }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🧩 Kategori statis
  const categories = [
    { id: 1, name: 'Makanan' },
    { id: 2, name: 'Minuman' },
    { id: 3, name: 'Kerajinan' },
    { id: 4, name: 'Pakaian' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    unit: '',
    stock: '',
    minOrder: '',
    status: 'active',
    images: [],
  });

  const API_BASE_URL = 'http://localhost:8000/api'; // sesuaikan dengan backend kamu

  // Jika mode edit, ambil data produk berdasarkan ID
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (mode === 'edit' && id) {
      axios
        .get(`${API_BASE_URL}/supplier/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const p = res.data.data;
          setFormData({
            name: p.name || '',
            category: p.category_id || '',
            description: p.description || '',
            price: p.price || '',
            unit: p.unit || '',
            stock: p.stock || '',
            minOrder: p.min_order || '',
            status: p.status || 'active',
            images: [],
          });
        })
        .catch((err) => console.error(err));
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5),
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nama produk wajib diisi';
    if (!formData.category) newErrors.category = 'Pilih kategori';
    if (!formData.price) newErrors.price = 'Harga wajib diisi';
    if (!formData.stock) newErrors.stock = 'Stok wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category_id', formData.category);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('unit', formData.unit);
    data.append('stock', formData.stock);
    data.append('min_order', formData.minOrder);
    data.append('status', formData.status);

    formData.images.forEach((file) => data.append('images[]', file));

    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    };

    try {
      if (mode === 'edit' && id) {
        data.append('_method', 'PUT');
        await axios.post(`${API_BASE_URL}/supplier/products/${id}`, data, { headers });
        alert('Produk berhasil diperbarui!');
      } else {
        await axios.post(`${API_BASE_URL}/supplier/products`, data, { headers });
        alert('Produk berhasil ditambahkan!');
      }
      navigate('/supplier/products');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan produk. Periksa kembali input Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {mode === 'edit' ? 'Edit Produk' : 'Tambah Produk'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama Produk */}
        <div>
          <label className="block font-medium">Nama Produk</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded-lg p-2"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <AlertCircle size={14} /> {errors.name}
            </p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block font-medium">Kategori</label>
          <select
            name="category"
            className="w-full border rounded-lg p-2"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <AlertCircle size={14} /> {errors.category}
            </p>
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            name="description"
            className="w-full border rounded-lg p-2 h-24"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Harga & Satuan */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Harga</label>
            <input
              type="number"
              name="price"
              className="w-full border rounded-lg p-2"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                <AlertCircle size={14} /> {errors.price}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Satuan</label>
            <input
              type="text"
              name="unit"
              className="w-full border rounded-lg p-2"
              value={formData.unit}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Stok & Minimal Order */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Stok</label>
            <input
              type="number"
              name="stock"
              className="w-full border rounded-lg p-2"
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                <AlertCircle size={14} /> {errors.stock}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Minimal Order</label>
            <input
              type="number"
              name="minOrder"
              className="w-full border rounded-lg p-2"
              value={formData.minOrder}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            className="w-full border rounded-lg p-2"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Tersedia</option>
            <option value="inactive">Tidak Tersedia</option>
          </select>
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block font-medium mb-2 flex items-center gap-2">
            <Upload size={18} /> Upload Gambar (maks. 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2"
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            {formData.images.map((file, i) => (
              <div
                key={i}
                className="relative w-24 h-24 border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/supplier/products')}
            className="border rounded-lg px-4 py-2"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Save size={18} />
            {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </div>
  );
}
