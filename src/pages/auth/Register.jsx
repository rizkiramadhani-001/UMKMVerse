import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Building2, TrendingUp, Package, Truck, Phone } from 'lucide-react';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'umkm', name: 'UMKM Owner', description: 'Pemilik usaha UMKM yang mencari investor', icon: <Building2 size={24} /> },
    { id: 'investor', name: 'Investor', description: 'Berinvestasi di UMKM potensial', icon: <TrendingUp size={24} /> },
    { id: 'supplier', name: 'Supplier', description: 'Menyediakan bahan baku untuk UMKM', icon: <Package size={24} /> },
    { id: 'distributor', name: 'Distributor', description: 'Mendistribusikan produk UMKM', icon: <Truck size={24} /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error saat user mengetik ulang
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({ ...prev, role: roleId }));
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Nama lengkap wajib diisi';
    else if (formData.name.length < 3) newErrors.name = 'Nama minimal 3 karakter';

    if (!formData.email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';

    if (!formData.phone) newErrors.phone = 'Nomor telepon wajib diisi';
    else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.phone.replace(/\s/g, '')))
      newErrors.phone = 'Format nomor telepon tidak valid';

    if (!formData.password) newErrors.password = 'Password wajib diisi';
    else if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Password tidak cocok';

    if (!formData.role) newErrors.role = 'Pilih role terlebih dahulu';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);

      console.log("Registration successful:", response.data);
      sessionStorage.setItem('token', response.data.token);
      navigate(response.data.redirect_url);
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        // Tangkap pesan dari server
        const status = error.response.status;
        const data = error.response.data;

        if (status === 409 || status === 422) {
          // Kasus user sudah ada atau validasi gagal
          const newErrors = {};

          if (data.errors) {
            // Laravel-style validation (data.errors.email[0], dll)
            if (data.errors.email) newErrors.email = data.errors.email[0];
            if (data.errors.phone) newErrors.phone = data.errors.phone[0];
            if (data.errors.password) newErrors.password = data.errors.password[0];
          } else if (data.message) {
            newErrors.general = data.message;
          } else {
            newErrors.general = "Registrasi gagal. Periksa kembali data Anda.";
          }

          setErrors(newErrors);
        } else {
          // Error umum dari server
          setErrors({
            general: data.message || "Terjadi kesalahan pada server. Coba lagi nanti."
          });
        }
      } else if (error.request) {
        // Tidak ada respon dari server
        setErrors({
          general: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
        });
      } else {
        // Error konfigurasi axios atau lainnya
        setErrors({
          general: "Terjadi kesalahan tak terduga. Silakan coba lagi."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              UMKMVerse
            </h1>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Daftar Sekarang
          </h2>
          <p className="text-gray-600">
            Bergabunglah dengan ekosistem kolaborasi UMKM
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Daftar Sebagai <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.role === role.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        formData.role === role.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{role.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{role.description}</div>
                      </div>
                      {formData.role === role.id && (
                        <div className="text-blue-600 text-xl">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.role && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.role}</span>
                </div>
              )}
            </div>

            {/* --- INPUT FIELDS --- */}
            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Nama Lengkap" id="name" name="name" value={formData.name} icon={<User />} placeholder="Nama Anda" error={errors.name} onChange={handleChange} />
              <InputField label="Email" id="email" name="email" value={formData.email} icon={<Mail />} placeholder="nama@email.com" error={errors.email} onChange={handleChange} />
            </div>

            {/* Phone */}
            <InputField label="Nomor Telepon" id="phone" name="phone" value={formData.phone} icon={<Phone />} placeholder="08123456789" error={errors.phone} onChange={handleChange} />

            {/* Passwords */}
            <div className="grid md:grid-cols-2 gap-6">
              <PasswordField label="Password" id="password" name="password" value={formData.password} show={showPassword} toggle={() => setShowPassword(!showPassword)} error={errors.password} onChange={handleChange} />
              <PasswordField label="Konfirmasi Password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} error={errors.confirmPassword} onChange={handleChange} />
            </div>

            {/* General Server Error */}
            {errors.general && (
              <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm text-center justify-center">
                <AlertCircle size={16} />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Memproses...' : 'Lanjutkan'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm transition">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ===== Helper Components ===== */

function InputField({ label, id, name, value, icon, placeholder, error, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            error ? 'border-red-300' : 'border-gray-200'
          }`}
        />
      </div>
      {error && (
        <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function PasswordField({ label, id, name, value, show, toggle, error, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={show ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            error ? 'border-red-300' : 'border-gray-200'
          }`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
