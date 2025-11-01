// src/pages/investor/Register.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, User, CreditCard, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterInvestor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    namaPerusahaan: '',
    nomorIdentitas: '',
    jenisInvestor: '',
    sumberDana: '',
    domisili: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [basicData, setBasicData] = useState(null);

  useEffect(() => {
    // Ambil data dari state routing (dari halaman register sebelumnya)
    const data = location.state?.basicData;
    if (!data) {
      // Jika tidak ada data basic, redirect ke /register
      navigate('/register');
      return;
    }
    setBasicData(data);
  }, [location, navigate]);

  const jenisInvestorOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const sumberDanaOptions = [
    { value: 'pribadi', label: 'Dana Pribadi' },
    { value: 'perusahaan', label: 'Dana Perusahaan' },
    { value: 'venture_capital', label: 'Venture Capital' },
    { value: 'angel_investor', label: 'Angel Investor' }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaPerusahaan.trim()) {
      newErrors.namaPerusahaan = 'Nama perusahaan/individu wajib diisi';
    }

    if (!formData.nomorIdentitas.trim()) {
      newErrors.nomorIdentitas = 'Nomor identitas/NPWP wajib diisi';
    } else if (formData.nomorIdentitas.length < 15) {
      newErrors.nomorIdentitas = 'Nomor identitas minimal 15 digit';
    }

    if (!formData.jenisInvestor) {
      newErrors.jenisInvestor = 'Pilih jenis investor';
    }

    if (!formData.domisili.trim()) {
      newErrors.domisili = 'Domisili wajib diisi';
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

    // Simulasi API call (nanti integrate dengan backend Riski)
    setTimeout(() => {
      setIsLoading(false);
      console.log('Complete Registration Data:', completeData);
      
      // TODO: Panggil API register
      // const response = await authService.register(completeData);
      
      alert('✅ Registrasi berhasil! Akun Investor Anda telah dibuat.');
      navigate('/login');
    }, 1500);
  };

  if (!basicData) {
    return null; // atau loading component
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
            <TrendingUp className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Registrasi Investor
          </h2>
          <p className="text-gray-600">
            Lengkapi data profil investor Anda
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
              <span className="ml-2 text-sm font-medium text-blue-600">Detail Investor</span>
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
                <div>Role: <span className="font-medium capitalize">{basicData.role}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Perusahaan/Individu */}
            <div>
              <label htmlFor="namaPerusahaan" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Perusahaan / Individu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="namaPerusahaan"
                  name="namaPerusahaan"
                  value={formData.namaPerusahaan}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.namaPerusahaan ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="PT Investasi Maju / John Doe"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Untuk profil investor (nama entitas atau individu)</p>
              {errors.namaPerusahaan && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.namaPerusahaan}</span>
                </div>
              )}
            </div>

            {/* Nomor Identitas/NPWP */}
            <div>
              <label htmlFor="nomorIdentitas" className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Identitas / NPWP <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="nomorIdentitas"
                  name="nomorIdentitas"
                  value={formData.nomorIdentitas}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.nomorIdentitas ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="1234567890123456"
                  maxLength="16"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">KTP/NIK atau NPWP untuk verifikasi dasar</p>
              {errors.nomorIdentitas && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.nomorIdentitas}</span>
                </div>
              )}
            </div>

            {/* Jenis Investor */}
            <div>
              <label htmlFor="jenisInvestor" className="block text-sm font-semibold text-gray-700 mb-2">
                Jenis Investor <span className="text-red-500">*</span>
              </label>
              <select
                id="jenisInvestor"
                name="jenisInvestor"
                value={formData.jenisInvestor}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.jenisInvestor ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">-- Pilih Jenis Investor --</option>
                {jenisInvestorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">"Individual" atau "Corporate"</p>
              {errors.jenisInvestor && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.jenisInvestor}</span>
                </div>
              )}
            </div>

            {/* Sumber Dana (Optional) */}
            <div>
              <label htmlFor="sumberDana" className="block text-sm font-semibold text-gray-700 mb-2">
                Sumber Dana <span className="text-gray-400 text-xs">(Opsional)</span>
              </label>
              <select
                id="sumberDana"
                name="sumberDana"
                value={formData.sumberDana}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">-- Pilih Sumber Dana --</option>
                {sumberDanaOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Opsional untuk credit scoring (menambah kepercayaan)</p>
            </div>

            {/* Domisili */}
            <div>
              <label htmlFor="domisili" className="block text-sm font-semibold text-gray-700 mb-2">
                Domisili <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="domisili"
                  name="domisili"
                  value={formData.domisili}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.domisili ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Jakarta, Indonesia"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Kota / Negara tempat tinggal</p>
              {errors.domisili && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.domisili}</span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-medium mb-2">ℹ️ Informasi Penting:</p>
              <ul className="space-y-1 text-xs">
                <li>• Data akan diverifikasi oleh admin sebelum akun aktif</li>
                <li>• Sumber dana opsional tapi membantu credit scoring</li>
                <li>• Semua data dijaga kerahasiaannya</li>
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