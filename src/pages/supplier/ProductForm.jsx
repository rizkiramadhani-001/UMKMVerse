// src/pages/supplier/ProductForm.jsx
import { useState } from 'react';
import {
  AlertCircle,
  X,
  Save,
  Upload
} from 'lucide-react';

export default function ProductForm({ 
  mode = 'create', // 'create' or 'edit'
  initialData = null,
  categories = [],
  onSubmit,
  onCancel,
  isLoading = false
}) {
  const [formData, setFormData] = useState(initialData || {
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
  const [imagePreview, setImagePreview] = useState(
    initialData?.image ? [initialData.image] : []
  );

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

    if (!formData.name.trim()) {
      errors.name = 'Nama produk wajib diisi';
    }
    
    if (!formData.category) {
      errors.category = 'Kategori wajib dipilih';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Deskripsi wajib diisi';
    } else if (formData.description.length < 20) {
      errors.description = 'Deskripsi minimal 20 karakter';
    }
    
    if (!formData.price || formData.price <= 0) {
      errors.price = 'Harga harus lebih dari 0';
    }
    
    if (!formData.unit.trim()) {
      errors.unit = 'Satuan wajib diisi';
    }
    
    if (formData.stock === '' || formData.stock < 0) {
      errors.stock = 'Stok tidak boleh negatif';
    }
    
    if (!formData.minOrder || formData.minOrder <= 0) {
      errors.minOrder = 'Minimal order harus lebih dari 0';
    }

    if (mode === 'create' && imagePreview.length === 0) {
      errors.images = 'Minimal upload 1 foto produk';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.border-red-300');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="p-6">
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
                onClick={() => document.getElementById(`imageUpload-${mode}`).click()}
                className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center hover:border-orange-400 transition cursor-pointer ${
                  formErrors.images ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-xs text-gray-500 text-center">Upload</p>
                <input
                  type="file"
                  id={`imageUpload-${mode}`}
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg"
                  multiple
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
          {formErrors.images && (
            <p className="text-red-600 text-sm mt-2 flex items-center space-x-1">
              <AlertCircle size={14} />
              <span>{formErrors.images}</span>
            </p>
          )}
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
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
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
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
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
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none ${
              formErrors.description ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Jelaskan detail produk, spesifikasi, kualitas, dll..."
          />
          <div className="flex justify-between items-center mt-1">
            {formErrors.description ? (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <AlertCircle size={14} />
                <span>{formErrors.description}</span>
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Minimal 20 karakter untuk deskripsi yang jelas
              </p>
            )}
            <span className={`text-xs font-medium ${
              formData.description.length >= 20 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {formData.description.length} karakter
            </span>
          </div>
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
                formErrors.price ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="0"
              min="0"
              step="1000"
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
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
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Status Produk
          </label>
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={handleChange}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                Aktif
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={handleChange}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                Nonaktif
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Produk nonaktif tidak akan tampil di katalog
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={18} />
            <div className="text-xs text-gray-700">
              <p className="font-semibold mb-2">💡 Tips Membuat Produk Menarik:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Gunakan foto produk yang jelas dan berkualitas tinggi</li>
                <li>Tulis deskripsi lengkap dengan spesifikasi detail</li>
                <li>Set minimal order yang realistis dan kompetitif</li>
                <li>Update stok secara berkala untuk akurasi</li>
                <li>Harga yang kompetitif akan menarik lebih banyak pembeli</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transform'
          }`}
        >
          <Save size={20} />
          <span>
            {isLoading ? 'Menyimpan...' : mode === 'create' ? 'Simpan Produk' : 'Update Produk'}
          </span>
        </button>
      </div>
    </div>
  );
}