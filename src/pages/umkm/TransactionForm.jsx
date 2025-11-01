// src/pages/umkm/TransactionForm.jsx
import { useState } from 'react';
import {
  AlertCircle,
  X,
  Save,
  DollarSign,
  Calendar,
  FileText,
  Tag
} from 'lucide-react';

export default function TransactionForm({ 
  mode = 'create', // 'create' or 'edit'
  initialData = null,
  onSubmit,
  onCancel,
  isLoading = false
}) {
  const [formData, setFormData] = useState(initialData || {
    type: 'income',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Categories based on transaction type
  const categories = {
    income: [
      'Revenue',
      'Investment',
      'Loan',
      'Grant',
      'Other Income'
    ],
    expense: [
      'Bahan Baku',
      'Gaji',
      'Operasional',
      'Marketing',
      'Utilities',
      'Transportasi',
      'Lainnya'
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset category when type changes
    if (name === 'type') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        category: '' // Reset category
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.type) {
      errors.type = 'Tipe transaksi wajib dipilih';
    }

    if (!formData.description.trim()) {
      errors.description = 'Deskripsi wajib diisi';
    } else if (formData.description.length < 5) {
      errors.description = 'Deskripsi minimal 5 karakter';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Jumlah harus lebih dari 0';
    }

    if (!formData.date) {
      errors.date = 'Tanggal wajib diisi';
    }

    if (!formData.category) {
      errors.category = 'Kategori wajib dipilih';
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
    
    // Convert amount to number
    const dataToSubmit = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tipe Transaksi <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition ${
              formData.type === 'income'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <DollarSign className={`mx-auto mb-2 ${
                  formData.type === 'income' ? 'text-green-600' : 'text-gray-400'
                }`} size={32} />
                <span className={`font-semibold ${
                  formData.type === 'income' ? 'text-green-700' : 'text-gray-600'
                }`}>
                  Pemasukan
                </span>
              </div>
            </label>

            <label className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition ${
              formData.type === 'expense'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <DollarSign className={`mx-auto mb-2 ${
                  formData.type === 'expense' ? 'text-red-600' : 'text-gray-400'
                }`} size={32} />
                <span className={`font-semibold ${
                  formData.type === 'expense' ? 'text-red-700' : 'text-gray-600'
                }`}>
                  Pengeluaran
                </span>
              </div>
            </label>
          </div>
          {formErrors.type && (
            <p className="text-red-600 text-sm mt-2 flex items-center space-x-1">
              <AlertCircle size={14} />
              <span>{formErrors.type}</span>
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi Transaksi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                formErrors.description ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Contoh: Pembelian bahan baku untuk produksi"
            />
          </div>
          {formErrors.description && (
            <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
              <AlertCircle size={14} />
              <span>{formErrors.description}</span>
            </p>
          )}
        </div>

        {/* Amount & Date */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jumlah (Rp) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  formErrors.amount ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0"
                min="0"
                step="1000"
              />
            </div>
            {formErrors.amount && (
              <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                <AlertCircle size={14} />
                <span>{formErrors.amount}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  formErrors.date ? 'border-red-300' : 'border-gray-200'
                }`}
              />
            </div>
            {formErrors.date && (
              <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                <AlertCircle size={14} />
                <span>{formErrors.date}</span>
              </p>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                formErrors.category ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories[formData.type].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {formErrors.category && (
            <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
              <AlertCircle size={14} />
              <span>{formErrors.category}</span>
            </p>
          )}
        </div>

        {/* Notes (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catatan <span className="text-gray-500 text-xs">(Opsional)</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            placeholder="Tambahkan catatan tambahan jika diperlukan..."
          />
        </div>

        {/* Info Box */}
        <div className={`border-2 rounded-xl p-4 ${
          formData.type === 'income' 
            ? 'bg-green-50 border-green-200' 
            : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-start space-x-3">
            <AlertCircle className={`flex-shrink-0 mt-0.5 ${
              formData.type === 'income' ? 'text-green-600' : 'text-orange-600'
            }`} size={18} />
            <div className="text-xs text-gray-700">
              <p className="font-semibold mb-1">💡 Tips:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Pastikan jumlah dan tanggal transaksi sudah benar</li>
                <li>Pilih kategori yang sesuai untuk laporan yang akurat</li>
                <li>Tambahkan deskripsi yang jelas untuk tracking yang mudah</li>
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
          className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transform'
          }`}
        >
          <Save size={20} />
          <span>
            {isLoading ? 'Menyimpan...' : mode === 'create' ? 'Simpan Transaksi' : 'Update Transaksi'}
          </span>
        </button>
      </div>
    </div>
  );
}