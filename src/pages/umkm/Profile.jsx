// src/pages/umkm/Profile.jsx
import { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Mail, Globe, Upload, Video, Save, Eye, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function UMKMProfile() {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [id, setId] = useState(null);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);


  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #1: FETCH USER DATA
  // ========================================
  // TODO: Ganti dengan API call untuk fetch data profil UMKM
  // Endpoint: GET /api/umkm/profile
  // Headers: Authorization: Bearer {token}
  // Response format yang diharapkan:
  // {
  //   data: {
  //     namaUmkm: string,
  //     nib: string,
  //     bidangUsaha: 'fnb' | 'agrikultur' | 'service',
  //     email: string,
  //     phone: string,
  //     website: string,
  //     lokasiUsaha: string,
  //     alamatLengkap: string,
  //     deskripsiSingkat: string,
  //     deskripsiLengkap: string,
  //     visiMisi: string,
  //     targetPasar: string,
  //     keunggulanProduk: string,
  //     videoPitchUrl: string,
  //     minInvestasi: number,
  //     targetInvestasi: number,
  //     logoUrl: string,
  //     fotoProduk: string[] // array of image URLs
  //   }
  // }

  const [formData, setFormData] = useState({
    namaUmkm: '',
    nib: '',
    bidangUsaha: '',
    email: '',
    phone: '',
    website: '',
    lokasiUsaha: '',
    alamatLengkap: '',
    deskripsiSingkat: '',
    deskripsiLengkap: '',
    visiMisi: '',
    targetPasar: '',
    keunggulanProduk: '',
    videoPitchUrl: '',
    minInvestasi: '',
    targetInvestasi: '',
    logo: null,
    fotoProduk: []
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [fotoPreview, setFotoPreview] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #2: FETCH DATA ON MOUNT
  // ========================================
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        const token = sessionStorage.getItem('token');
        if (!token) {
          setErrors({ auth: 'Token tidak ditemukan. Silakan login.' });
          setIsLoading(false);
          return;
        }

        // 🔹 Fetch data dari API berdasarkan user id atau UMKM id
        const response = await axios.get(`http://127.0.0.1:8000/api/umkm/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;

        console.log("Fetch successful:", data);

        // 🔹 Set state id UMKM jika perlu
        setId(data.id);

        // 🔹 Set form data
        setFormData({
          namaUmkm: data.namaUmkm || '',
          nib: data.nib || '',
          bidangUsaha: data.bidangUsaha || '',
          email: data.email || '',
          phone: data.phone || '',
          website: data.website || '',
          lokasiUsaha: data.lokasiUsaha || '',
          alamatLengkap: data.alamatLengkap || '',
          deskripsiSingkat: data.deskripsiSingkat || '',
          deskripsiLengkap: data.deskripsiLengkap || '',
          visiMisi: data.visiMisi || '',
          targetPasar: data.targetPasar || '',
          keunggulanProduk: data.keunggulanProduk || '',
          videoPitchUrl: data.videoPitchUrl || '',
          minInvestasi: data.minInvestasi || '',
          targetInvestasi: data.targetInvestasi || '',
          logo: "http://127.0.0.1:8000/storage/" + data.logo || null,
          fotoProduk: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop']
        });

        // 🔹 Set preview gambar
        setLogoPreview(formData.logo || '');
        setFotoPreview(formData.fotoProduk || []);

      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrors({ fetch: 'Gagal memuat data profil' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [id]); // tambahkan dependency id jika id bisa berubah



  useEffect(() => {
    console.log(id)
  }, [id]);


  const bidangUsahaOptions = [
    { id: 'fnb', name: 'Food & Beverage', icon: '🍔' },
    { id: 'agrikultur', name: 'Agrikultur', icon: '🌾' },
    { id: 'service', name: 'Service / Jasa', icon: '⚙' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Cek ukuran file
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB');
      return;
    }

    // --- Preview menggunakan FileReader ---
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setFormData(prev => ({ ...prev, logo: file }));
    };
    reader.readAsDataURL(file);

    // --- Upload ke backend ---
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('logo', file);
      if (id) formDataToSend.append('id', id); // opsional, kalau update

      const response = await axios.post(
        'http://127.0.0.1:8000/api/umkm', // endpoint create/update UMKM
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Logo uploaded successfully:', response.data);
      // Opsional: update formData dengan data dari backend
      setFormData(prev => ({
        ...prev,
        logo: response.data.data.logo, // jika backend mengembalikan path file
      }));

    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Gagal mengunggah logo');
    }
  };


const handleFotoUpload = async (e) => {
  const files = Array.from(e.target.files);

  if (fotoPreview.length + files.length > 5) {
    alert('Maksimal 5 foto produk');
    return;
  }

  for (const file of files) {
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB per foto');
      continue; // skip file yang terlalu besar
    }

    // --- Preview ---
    const reader = new FileReader();
    reader.onloadend = () => {
      setFotoPreview(prev => [...prev, reader.result]);
    };
    reader.readAsDataURL(file);

    // --- Upload ke backend ---
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fotoProduk[]', file);
      if (id) formDataToSend.append('id', id); // opsional, untuk update UMKM

      const response = await axios.post(
        'http://127.0.0.1:8000/api/umkm', // endpoint create/update UMKM
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Foto uploaded successfully:', response.data);
      // Jika backend mengembalikan array path foto, update formData
      setFormData(prev => ({
        ...prev,
        fotoProduk: [...prev.fotoProduk, response.data.data.fotoProduk?.[0] || file]
      }));

    } catch (error) {
      console.error('Error uploading foto:', error);
      alert('Gagal mengunggah foto: ' + file.name);
    }
  }
};


  const removeFoto = (index) => {
    setFotoPreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      fotoProduk: prev.fotoProduk.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.namaUmkm.trim()) newErrors.namaUmkm = 'Nama UMKM wajib diisi';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    if (!formData.lokasiUsaha.trim()) newErrors.lokasiUsaha = 'Lokasi wajib diisi';
    if (!formData.deskripsiSingkat.trim()) newErrors.deskripsiSingkat = 'Deskripsi singkat wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // 🔴 BACKEND INTEGRATION POINT #3: UPDATE PROFILE
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setSuccessMessage('');

    try {
      axios.post("http://127.0.0.1:8000/api/umkm", formData, {
        headers: {
          Authorization: `Bearer ` + sessionStorage.getItem('token'),
        }
      }).then(response => {
        console.log("Update successful:", response.data);
      })
      // TODO: Replace with actual API call
      // Gunakan FormData untuk upload file
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   if (key === 'fotoProduk') {
      //     formData[key].forEach(file => {
      //       formDataToSend.append('fotoProduk[]', file);
      //     });
      //   } else if (key === 'logo' && formData[key]) {
      //     formDataToSend.append('logo', formData[key]);
      //   } else {
      //     formDataToSend.append(key, formData[key]);
      //   }
      // });

      // const response = await fetch('/api/umkm/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //     // JANGAN set Content-Type untuk FormData, browser akan set otomatis
      //   },
      //   body: formDataToSend
      // });

      // const result = await response.json();

      // if (!response.ok) {
      //   throw new Error(result.message || 'Gagal update profil');
      // }

      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccessMessage('✅ Profil berhasil diperbarui!');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: error.message || 'Gagal memperbarui profil' });
    } finally {
      setIsSaving(false);
    }
  };

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil UMKM</h1>
          <p className="text-gray-600 mt-1">Kelola informasi dan tampilan profil UMKM Anda</p>
        </div>
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
        >
          <Eye size={20} />
          <span>Preview Profil</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-red-600" size={24} />
            <p className="text-red-800 font-medium">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'basic', label: 'Informasi Dasar', icon: <Building2 size={18} /> },
              { id: 'media', label: 'Media & Foto', icon: <Video size={18} /> },
              { id: 'description', label: 'Deskripsi Detail', icon: <Globe size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition ${activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Tab Content: Basic Info */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nama UMKM */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama UMKM <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="namaUmkm"
                    value={formData.namaUmkm}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.namaUmkm ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Nama usaha UMKM"
                  />
                  {errors.namaUmkm && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>{errors.namaUmkm}</span>
                    </p>
                  )}
                </div>

                {/* NIB */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NIB / Nomor Izin Usaha
                  </label>
                  <input
                    type="text"
                    name="nib"
                    value={formData.nib}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="1234567890123"
                  />
                </div>
              </div>

              {/* Bidang Usaha */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Bidang Usaha <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {bidangUsahaOptions.map(bidang => (
                    <button
                      key={bidang.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, bidangUsaha: bidang.id }))}
                      className={`p-4 border-2 rounded-xl transition-all ${formData.bidangUsaha === bidang.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <div className="text-3xl mb-2">{bidang.icon}</div>
                      <div className="font-semibold text-sm">{bidang.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Bisnis
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="email@umkm.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.phone ? 'border-red-300' : 'border-gray-200'
                        }`}
                      placeholder="08123456789"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Website */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website / Social Media
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Lokasi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lokasi Usaha <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="lokasiUsaha"
                      value={formData.lokasiUsaha}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.lokasiUsaha ? 'border-red-300' : 'border-gray-200'
                        }`}
                      placeholder="Kota, Provinsi"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  name="alamatLengkap"
                  value={formData.alamatLengkap}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Alamat detail usaha"
                />
              </div>

              {/* Investment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Informasi Investasi</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Investasi (Rp)
                    </label>
                    <input
                      type="number"
                      name="minInvestasi"
                      value={formData.minInvestasi}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="5000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Target Investasi (Rp)
                    </label>
                    <input
                      type="number"
                      name="targetInvestasi"
                      value={formData.targetInvestasi}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="100000000"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Media */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Logo UMKM
                </label>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-200"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      onClick={() => document.getElementById('logoUpload').click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer"
                    >
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-600 mb-1">Klik untuk upload logo baru</p>
                      <p className="text-xs text-gray-400">PNG, JPG (max. 2MB, rasio 1:1)</p>
                      <input
                        type="file"
                        id="logoUpload"
                        className="hidden"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Foto Produk */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Foto Produk / Usaha (Maksimal 5 foto)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {fotoPreview.map((foto, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={foto}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeFoto(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {fotoPreview.length < 5 && (
                    <div
                      onClick={() => document.getElementById('fotoUpload').click()}
                      className="h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer"
                    >
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-600">Upload Foto</p>
                      <input
                        type="file"
                        id="fotoUpload"
                        className="hidden"
                        accept="image/png,image/jpeg,image/jpg"
                        multiple
                        onChange={handleFotoUpload}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Video Pitch */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Video Pitch (YouTube URL)
                </label>
                <div className="relative mb-4">
                  <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="url"
                    name="videoPitchUrl"
                    value={formData.videoPitchUrl}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                {formData.videoPitchUrl && extractVideoId(formData.videoPitchUrl) && (
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractVideoId(formData.videoPitchUrl)}`}
                      title="Video Pitch Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab Content: Description */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              {/* Deskripsi Singkat */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi Singkat <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsiSingkat"
                  value={formData.deskripsiSingkat}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.deskripsiSingkat ? 'border-red-300' : 'border-gray-200'
                    }`}
                  placeholder="Deskripsi singkat untuk card preview (max 200 karakter)"
                  maxLength="200"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">Akan ditampilkan di card UMKM</p>
                  <span className="text-xs text-gray-400">{formData.deskripsiSingkat.length}/200</span>
                </div>
              </div>

              {/* Deskripsi Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi Lengkap
                </label>
                <textarea
                  name="deskripsiLengkap"
                  value={formData.deskripsiLengkap}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Ceritakan tentang usaha Anda secara detail..."
                />
              </div>

              {/* Visi & Misi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Visi & Misi
                </label>
                <textarea
                  name="visiMisi"
                  value={formData.visiMisi}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Visi dan misi usaha Anda..."
                />
              </div>

              {/* Target Pasar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Pasar
                </label>
                <input
                  type="text"
                  name="targetPasar"
                  value={formData.targetPasar}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Contoh: Usia 20-45 tahun, profesional muda"
                />
              </div>

              {/* Keunggulan Produk */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Keunggulan Produk/Layanan
                </label>
                <textarea
                  name="keunggulanProduk"
                  value={formData.keunggulanProduk}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Apa yang membuat produk/layanan Anda berbeda?"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition ${isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <Save size={20} />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Preview Profil UMKM</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Building2 className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600">Preview profil akan ditampilkan di sini</p>
                <p className="text-sm text-gray-500 mt-2">Seperti yang akan dilihat oleh investor dan publik</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}