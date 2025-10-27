// src/pages/auth/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Cek apakah ada email dari state (dari ForgotPassword page)
    const stateData = location.state;
    if (!stateData || !stateData.email || !stateData.verified) {
      // Jika tidak ada data atau tidak terverifikasi, redirect ke forgot-password
      navigate('/forgot-password');
      return;
    }
    setEmail(stateData.email);
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

    if (!formData.password) {
      newErrors.password = 'Password baru wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
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

    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      
      // TODO: Nanti integrate dengan backend
      // const response = await authService.resetPassword(email, formData.password);
      
      console.log('Password reset for:', email);
      console.log('New password:', formData.password);
      
      alert('✅ Password berhasil direset!\n\nSilakan login dengan password baru Anda.');
      navigate('/login');
    }, 1500);
  };

  if (!email) {
    return null; // atau loading component
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              UMKMVerse
            </h1>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600">
            Buat password baru untuk akun Anda
          </p>
        </div>

        {/* Email Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-green-600 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">Email Terverifikasi</p>
              <p className="text-sm text-gray-700">
                Reset password untuk: <span className="font-medium">{email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Baru */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password Baru <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.password ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Min. 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Konfirmasi Password Baru <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Ulangi password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-medium mb-2">🔒 Persyaratan Password:</p>
              <ul className="text-xs space-y-1">
                <li className={formData.password.length >= 6 ? 'text-green-600' : ''}>
                  • Minimal 6 karakter {formData.password.length >= 6 && '✓'}
                </li>
                <li className={formData.password === formData.confirmPassword && formData.password ? 'text-green-600' : ''}>
                  • Password harus sama {formData.password === formData.confirmPassword && formData.password && '✓'}
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Mereset Password...' : 'Reset Password'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 text-sm transition"
            >
              Ingat password? <span className="font-semibold text-blue-600">Login</span>
            </Link>
          </div>
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