// src/pages/umkm/Register.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, AlertCircle, CheckCircle, MapPin, Upload } from 'lucide-react';

export default function RegisterUMKM() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    namaUmkm: '',
    nib: '',
    bidangUsaha: '',
    deskripsi: '',
    lokasiUsaha: '',
    logo: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [basicData, setBasicData] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    const data = location.state?.basicData;
    if (!data) {
      navigate('/register');
      return;
    }
    setBasicData(data);
  }, [location, navigate]);

  const bidangUsahaOptions = [
    {
      id: 'fnb',
      name: 'Food & Beverage',
      icon: '🍔',
      description: 'Makanan & Minuman'
    },
    {
      id: 'agrikultur',
      name: 'Agrikultur',
      icon: '🌾',
      description: 'Pertanian & Perkebunan'
    },
    {
      id: 'service',
      name: 'Service / Jasa',
      icon: '⚙️',
      description: 'Layanan & Jasa'
    }
  ];

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

  const handleBidangSelect = (bidangId) => {
    setFormData(prev => ({
      ...prev,
      bidangUsaha: bidangId
    }));
    if (errors.bidangUsaha) {
      setErrors(prev => ({
        ...prev,
        bidangUsaha: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi file
      if (file.size > 2 * 1024 * 1024) { // 2MB
        alert('Ukuran file maksimal 2MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Format file harus JPG atau PNG');
        return;
      }

      setFormData(prev => ({
        ...prev,
        logo: file
      }));

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaUmkm.trim()) {
      newErrors.namaUmkm = 'Nama UMKM wajib diisi';
    } else if (formData.namaUmkm.length < 3) {
      newErrors.namaUmkm = 'Nama UMKM minimal 3 karakter';
    }

    if (!formData.bidangUsaha) {
      newErrors.bidangUsaha = 'Pilih bidang usaha';
    }

    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi singkat wajib diisi';
    } else if (formData.deskripsi.length < 50) {
      newErrors.deskripsi = 'Deskripsi minimal 50 karakter';
    }

    if (!formData.lokasiUsaha.trim()) {
      newErrors.lokasiUsaha = 'Lokasi usaha wajib diisi';
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

    // Gabungkan data basic dengan data detail
    const completeData = {
      ...basicData,
      ...formData
    };

    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Complete Registration Data:', completeData);
      
      // TODO: Panggil API register dengan FormData untuk upload file
      // const formDataToSend = new FormData();
      // Object.keys(completeData).forEach(key => {
      //   formDataToSend.append(key, completeData[key]);
      // });
      // const response = await authService.register(formDataToSend);
      
      alert('✅ Registrasi berhasil! Akun UMKM Anda telah dibuat.\n\nSelanjutnya admin akan review profil Anda.');
      navigate('/login');
    }, 1500);
  };

  if (!basicData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              UMKMVerse
            </h1>
          </Link>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Registrasi UMKM Owner
          </h2>
          <p className="text-gray-600">
            Lengkapi informasi usaha UMKM Anda
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
              <span className="ml-2 text-sm font-medium text-blue-600">Detail UMKM</span>
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
                <div>Role: <span className="font-medium">UMKM Owner</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama UMKM */}
            <div>
              <label htmlFor="namaUmkm" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama UMKM <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="namaUmkm"
                name="namaUmkm"
                value={formData.namaUmkm}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.namaUmkm ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Contoh: Warung Makan Bu Iin"
              />
              <p className="text-xs text-gray-500 mt-1">Nama usaha UMKM Anda</p>
              {errors.namaUmkm && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.namaUmkm}</span>
                </div>
              )}
            </div>

            {/* NIB/Nomor Izin */}
            <div>
              <label htmlFor="nib" className="block text-sm font-semibold text-gray-700 mb-2">
                NIB / Nomor Izin Usaha <span className="text-gray-400 text-xs">(Opsional)</span>
              </label>
              <input
                type="text"
                id="nib"
                name="nib"
                value={formData.nib}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Contoh: 1234567890123"
              />
              <p className="text-xs text-gray-500 mt-1">Opsional tapi penting untuk validasi kredibilitas</p>
            </div>

            {/* Bidang Usaha - Card Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Bidang Usaha <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {bidangUsahaOptions.map((bidang) => (
                  <button
                    key={bidang.id}
                    type="button"
                    onClick={() => handleBidangSelect(bidang.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.bidangUsaha === bidang.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`text-3xl p-2 rounded-lg ${
                        formData.bidangUsaha === bidang.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {bidang.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{bidang.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{bidang.description}</div>
                      </div>
                      {formData.bidangUsaha === bidang.id && (
                        <div className="text-blue-600 text-xl">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Pilih kategori yang paling sesuai dengan usaha Anda</p>
              {errors.bidangUsaha && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.bidangUsaha}</span>
                </div>
              )}
            </div>

            {/* Deskripsi Singkat */}
            <div>
              <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Singkat <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.deskripsi ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Jelaskan tentang usaha Anda, produk yang dijual, target pasar, dll."
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  Profil singkat UMKM Anda (min. 50 karakter)
                </p>
                <span className={`text-xs font-medium ${
                  formData.deskripsi.length >= 50 ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {formData.deskripsi.length}/50
                </span>
              </div>
              {errors.deskripsi && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.deskripsi}</span>
                </div>
              )}
            </div>

            {/* Lokasi Usaha */}
            <div>
              <label htmlFor="lokasiUsaha" className="block text-sm font-semibold text-gray-700 mb-2">
                Lokasi Usaha <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="lokasiUsaha"
                  name="lokasiUsaha"
                  value={formData.lokasiUsaha}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.lokasiUsaha ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Contoh: Bandung, Jawa Barat"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Alamat atau kota lokasi usaha</p>
              {errors.lokasiUsaha && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.lokasiUsaha}</span>
                </div>
              )}
            </div>

            {/* Upload Logo/Foto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Logo / Foto UMKM <span className="text-gray-400 text-xs">(Opsional)</span>
              </label>
              
              {!logoPreview ? (
                <div 
                  onClick={() => document.getElementById('logoUpload').click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer"
                >
                  <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-sm text-gray-600 mb-1">Klik untuk upload atau drag & drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG (max. 2MB)</p>
                  <input
                    type="file"
                    id="logoUpload"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={logoPreview} 
                    alt="Preview Logo" 
                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview(null);
                      setFormData(prev => ({ ...prev, logo: null }));
                      document.getElementById('logoUpload').value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                  >
                    ✕ Hapus
                  </button>
                </div>
              )}
              
              {formData.logo && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ File terpilih: {formData.logo.name}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-medium mb-2">ℹ️ Informasi Penting:</p>
              <ul className="space-y-1 text-xs">
                <li>• Data akan direview admin sebelum profil publish</li>
                <li>• Anda bisa upload video pitch setelah akun aktif</li>
                <li>• NIB membantu meningkatkan kredibilitas UMKM</li>
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