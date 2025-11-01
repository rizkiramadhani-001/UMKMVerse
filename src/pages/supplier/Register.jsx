// src/pages/supplier/Register.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, AlertCircle, CheckCircle, MapPin, Globe } from 'lucide-react';

export default function RegisterSupplier() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    namaPerusahaan: '',
    jenisProduk: '',
    lokasi: '',
    website: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [basicData, setBasicData] = useState(null);

  useEffect(() => {
    const data = location.state?.basicData;
    if (!data) {
      navigate('/register');
      return;
    }
    setBasicData(data);
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaPerusahaan.trim()) {
      newErrors.namaPerusahaan = 'Nama perusahaan/usaha wajib diisi';
    } else if (formData.namaPerusahaan.length < 3) {
      newErrors.namaPerusahaan = 'Nama minimal 3 karakter';
    }

    if (!formData.jenisProduk.trim()) {
      newErrors.jenisProduk = 'Jenis produk/supply wajib diisi';
    } else if (formData.jenisProduk.length < 10) {
      newErrors.jenisProduk = 'Jelaskan jenis produk minimal 10 karakter';
    }

    if (!formData.lokasi.trim()) {
      newErrors.lokasi = 'Lokasi wajib diisi';
    }

    // Website opsional, tapi validasi jika diisi
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Format website tidak valid (harus dimulai dengan http:// atau https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const completeData = {
      ...basicData,
      ...formData
    };

    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Complete Registration Data:', completeData);
      
      alert('✅ Registrasi berhasil! Akun Supplier Anda telah dibuat.');
      navigate('/login');
    }, 1500);
  };

  if (!basicData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              UMKMVerse
            </h1>
          </Link>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4">
            <Package className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Registrasi Supplier
          </h2>
          <p className="text-gray-600">
            Lengkapi informasi usaha supplier Anda
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">Data Dasar</span>
            </div>
            <div className="w-12 h-1 bg-blue-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Detail Supplier</span>
            </div>
          </div>
        </div>

        {/* Basic Data Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">Data Dasar Tersimpan</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>Nama: <span className="font-medium">{basicData.name}</span></div>
                <div>Email: <span className="font-medium">{basicData.email}</span></div>
                <div>Telepon: <span className="font-medium">{basicData.phone}</span></div>
                <div>Role: <span className="font-medium">Supplier</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Perusahaan/Usaha */}
            <div>
              <label htmlFor="namaPerusahaan" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Perusahaan / Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="namaPerusahaan"
                name="namaPerusahaan"
                value={formData.namaPerusahaan}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.namaPerusahaan ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Contoh: CV Supplier Bahan Baku"
              />
              <p className="text-xs text-gray-500 mt-1">Profil pemasok untuk UMKM</p>
              {errors.namaPerusahaan && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.namaPerusahaan}</span>
                </div>
              )}
            </div>

            {/* Jenis Produk/Supply */}
            <div>
              <label htmlFor="jenisProduk" className="block text-sm font-semibold text-gray-700 mb-2">
                Jenis Produk / Supply <span className="text-red-500">*</span>
              </label>
              <textarea
                id="jenisProduk"
                name="jenisProduk"
                value={formData.jenisProduk}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.jenisProduk ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Contoh: bahan baku kemasan, logistik, bahan pangan, dll"
              />
              <p className="text-xs text-gray-500 mt-1">
                Jelaskan jenis supply yang Anda sediakan
              </p>
              {errors.jenisProduk && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.jenisProduk}</span>
                </div>
              )}
            </div>

            {/* Lokasi */}
            <div>
              <label htmlFor="lokasi" className="block text-sm font-semibold text-gray-700 mb-2">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="lokasi"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.lokasi ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Contoh: Surabaya, Jawa Timur"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Kota / wilayah operasi</p>
              {errors.lokasi && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.lokasi}</span>
                </div>
              )}
            </div>

            {/* Website/Portfolio (Optional) */}
            <div>
              <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                Website / Portfolio <span className="text-gray-400 text-xs">(Opsional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.website ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="https://www.contoh-supplier.com"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Jika ada website atau portfolio online</p>
              {errors.website && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.website}</span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-medium mb-2">ℹ️ Informasi Penting:</p>
              <ul className="space-y-1 text-xs">
                <li>• Data akan direview admin sebelum profil publish</li>
                <li>• Anda bisa menawarkan produk di forum setelah akun aktif</li>
                <li>• Website/portfolio membantu meningkatkan kredibilitas</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-900 text-sm transition"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}