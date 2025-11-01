// src/pages/umkm/Settings.jsx
import { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Bell,
  Shield,
  Globe,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  LogOut,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UMKMSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'umkm'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newInvestor: true,
    newOrder: true,
    paymentReceived: true,
    contractSigned: true,
    messageReceived: true,
    weeklyReport: true,
    monthlyReport: true
  });

  const [preferenceSettings, setPreferenceSettings] = useState({
    language: 'id',
    timezone: 'Asia/Jakarta',
    currency: 'IDR',
    theme: 'light'
  });

  const [errors, setErrors] = useState({});

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH USER SETTINGS
  // ========================================
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch('/api/umkm/settings', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // DUMMY DATA - Hapus setelah integrasi backend
      setTimeout(() => {
        const dummyData = {
          account: {
            name: 'Warung Kopi Nusantara',
            email: 'info@warungkopi.com',
            phone: '08123456789',
            role: 'umkm'
          },
          notifications: {
            emailNotifications: true,
            pushNotifications: true,
            newInvestor: true,
            newOrder: true,
            paymentReceived: true,
            contractSigned: true,
            messageReceived: true,
            weeklyReport: true,
            monthlyReport: true
          },
          preferences: {
            language: 'id',
            timezone: 'Asia/Jakarta',
            currency: 'IDR',
            theme: 'light'
          }
        };

        setAccountData(dummyData.account);
        setNotificationSettings(dummyData.notifications);
        setPreferenceSettings(dummyData.preferences);
        setIsLoading(false);
      }, 1000);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setAccountData(data.data.account);
      //   setNotificationSettings(data.data.notifications);
      //   setPreferenceSettings(data.data.preferences);
      // }
      // setIsLoading(false);

    } catch (error) {
      console.error('Error fetching settings:', error);
      setIsLoading(false);
      alert('Gagal memuat pengaturan');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #3: UPDATE ACCOUNT INFO
  // ========================================
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!accountData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!accountData.email.trim()) newErrors.email = 'Email wajib diisi';
    if (!accountData.phone.trim()) newErrors.phone = 'Telepon wajib diisi';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setSuccessMessage('');

    try {
      // TODO: BACKEND - API untuk update account
      // const response = await fetch('/api/umkm/settings/account', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(accountData)
      // });
      // const data = await response.json();

      // DUMMY - Hapus setelah integrasi
      setTimeout(() => {
        setIsSaving(false);
        setSuccessMessage('✅ Data akun berhasil diperbarui!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1000);

    } catch (error) {
      console.error('Error updating account:', error);
      setIsSaving(false);
      alert('Gagal memperbarui data akun');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #4: CHANGE PASSWORD
  // ========================================
  const handleChangePassword = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Password lama wajib diisi';
    if (!passwordData.newPassword) newErrors.newPassword = 'Password baru wajib diisi';
    else if (passwordData.newPassword.length < 8) newErrors.newPassword = 'Password minimal 8 karakter';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    try {
      // TODO: BACKEND - API untuk change password
      // const response = await fetch('/api/umkm/settings/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword
      //   })
      // });
      // const data = await response.json();

      // DUMMY - Hapus setelah integrasi
      setTimeout(() => {
        setIsSaving(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setSuccessMessage('✅ Password berhasil diubah!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1000);

    } catch (error) {
      console.error('Error changing password:', error);
      setIsSaving(false);
      alert('Gagal mengubah password');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #5: UPDATE NOTIFICATION SETTINGS
  // ========================================
  const handleUpdateNotifications = async () => {
    try {
      // TODO: BACKEND - API untuk update notification settings
      // await fetch('/api/umkm/settings/notifications', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(notificationSettings)
      // });

      setSuccessMessage('✅ Pengaturan notifikasi berhasil diperbarui!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error updating notifications:', error);
      alert('Gagal memperbarui pengaturan notifikasi');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #6: UPDATE PREFERENCES
  // ========================================
  const handleUpdatePreferences = async () => {
    try {
      // TODO: BACKEND - API untuk update preferences
      // await fetch('/api/umkm/settings/preferences', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(preferenceSettings)
      // });

      setSuccessMessage('✅ Preferensi berhasil diperbarui!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Gagal memperbarui preferensi');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #7: LOGOUT
  // ========================================
  const handleLogout = async () => {
    if (!confirm('Apakah Anda yakin ingin keluar?')) return;

    try {
      // TODO: BACKEND - API untuk logout (optional)
      // await fetch('/api/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');

    } catch (error) {
      console.error('Error logging out:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #8: DELETE ACCOUNT
  // ========================================
  const handleDeleteAccount = async () => {
    const confirmation = prompt('Ketik "HAPUS AKUN" untuk mengonfirmasi penghapusan akun (TIDAK DAPAT DIBATALKAN):');
    
    if (confirmation !== 'HAPUS AKUN') {
      alert('Konfirmasi tidak sesuai. Akun tidak dihapus.');
      return;
    }

    try {
      // TODO: BACKEND - API untuk delete account
      // const response = await fetch('/api/umkm/settings/delete-account', {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      alert('⚠️ Fitur hapus akun (dummy - belum terintegrasi backend)');

    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Gagal menghapus akun');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat pengaturan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600 mt-1">Kelola akun dan preferensi Anda</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Settings Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-2 overflow-x-auto">
            {[
              { id: 'account', label: 'Akun', icon: <User size={18} /> },
              { id: 'security', label: 'Keamanan', icon: <Lock size={18} /> },
              { id: 'notifications', label: 'Notifikasi', icon: <Bell size={18} /> },
              { id: 'preferences', label: 'Preferensi', icon: <Globe size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <form onSubmit={handleUpdateAccount} className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Akun</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                    <input
                      type="text"
                      value={accountData.name}
                      onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telepon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          errors.phone ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className={`flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Save size={20} />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-2xl">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ubah Password</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password Lama</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.currentPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.currentPassword && <p className="text-red-600 text-sm mt-1">{errors.currentPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.newPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={`flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Lock size={20} />
                  <span>{isSaving ? 'Mengubah...' : 'Ubah Password'}</span>
                </button>
              </form>

              {/* Danger Zone */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Shield className="text-red-600" size={20} />
                  <span>Danger Zone</span>
                </h3>
                
                <div className="space-y-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-red-300 hover:text-red-600 transition w-full sm:w-auto"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition w-full sm:w-auto"
                  >
                    <Trash2 size={20} />
                    <span>Hapus Akun Permanen</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pengaturan Notifikasi</h3>

              {/* Email & Push Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-600" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Terima notifikasi via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => {
                        setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked });
                        handleUpdateNotifications();
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Bell className="text-gray-600" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-600">Terima notifikasi push</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => {
                        setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked });
                        handleUpdateNotifications();
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Activity Notifications */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Aktivitas</h4>
                <div className="space-y-3">
                  {[
                    { key: 'newInvestor', label: 'Investor baru', desc: 'Notifikasi saat ada investor baru' },
                    { key: 'newOrder', label: 'Pesanan baru', desc: 'Notifikasi saat ada pesanan masuk' },
                    { key: 'paymentReceived', label: 'Pembayaran diterima', desc: 'Notifikasi saat pembayaran berhasil' },
                    { key: 'contractSigned', label: 'Kontrak ditandatangani', desc: 'Notifikasi saat kontrak ditandatangani' },
                    { key: 'messageReceived', label: 'Pesan baru', desc: 'Notifikasi saat ada pesan masuk' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key]}
                          onChange={(e) => {
                            setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked });
                            handleUpdateNotifications();
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Notifications */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Laporan</h4>
                <div className="space-y-3">
                  {[
                    { key: 'weeklyReport', label: 'Laporan Mingguan', desc: 'Ringkasan aktivitas setiap minggu' },
                    { key: 'monthlyReport', label: 'Laporan Bulanan', desc: 'Ringkasan keuangan setiap bulan' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key]}
                          onChange={(e) => {
                            setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked });
                            handleUpdateNotifications();
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preferensi Aplikasi</h3>

              <div className="space-y-4">
                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bahasa</label>
                  <select
                    value={preferenceSettings.language}
                    onChange={(e) => {
                      setPreferenceSettings({ ...preferenceSettings, language: e.target.value });
                      handleUpdatePreferences();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Zona Waktu</label>
                  <select
                    value={preferenceSettings.timezone}
                    onChange={(e) => {
                      setPreferenceSettings({ ...preferenceSettings, timezone: e.target.value });
                      handleUpdatePreferences();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Asia/Jakarta">WIB (Jakarta)</option>
                    <option value="Asia/Makassar">WITA (Makassar)</option>
                    <option value="Asia/Jayapura">WIT (Jayapura)</option>
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mata Uang</label>
                  <select
                    value={preferenceSettings.currency}
                    onChange={(e) => {
                      setPreferenceSettings({ ...preferenceSettings, currency: e.target.value });
                      handleUpdatePreferences();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="IDR">IDR (Rupiah)</option>
                    <option value="USD">USD (Dollar)</option>
                  </select>
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tema</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPreferenceSettings({ ...preferenceSettings, theme: 'light' });
                        handleUpdatePreferences();
                      }}
                      className={`p-4 border-2 rounded-xl transition ${
                        preferenceSettings.theme === 'light'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-2"></div>
                      <p className="font-semibold text-gray-900">Light</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPreferenceSettings({ ...preferenceSettings, theme: 'dark' });
                        handleUpdatePreferences();
                      }}
                      className={`p-4 border-2 rounded-xl transition ${
                        preferenceSettings.theme === 'dark'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="w-12 h-12 bg-gray-900 border-2 border-gray-700 rounded-lg mx-auto mb-2"></div>
                      <p className="font-semibold text-gray-900">Dark</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}