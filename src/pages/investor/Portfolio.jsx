// src/pages/investor/Portfolio.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Eye,
  Plus,
  Calendar
} from 'lucide-react';
import axios from 'axios';

export default function InvestorPortfolio() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioUMKM, setPortfolioUMKM] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

useEffect(() => {
  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);

      // Fetch from backend
      const response = await axios.get('http://127.0.0.1:8000/api/signed-umkm', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      });

      const data = response.data;

      // Map the API response to your frontend structure
      const result = data.contracts.map((contract, index) => {
        // Find the UMKM associated with this contract (optional)
        const umkm = data.umkms.find(u => u.id === contract.user_id);

        return {
          id: contract.id,
          name: umkm?.namaUmkm || contract.partner_name,
          image: umkm?.logo || 'https://via.placeholder.com/200',
          category: umkm?.bidangUsaha || 'Unknown',
          investmentAmount: Number(contract.amount),
          investmentDate: contract.created_at,
          currentValue: Number(contract.amount) * 1.2, // example: +20% ROI
          roi: 20, // example ROI, you can calculate dynamically if available
          status: contract.status,
          profitReceived: Number(contract.amount) * 0.2, // example profit
          nextProfitDate: new Date(new Date(contract.created_at).getTime() + 30*24*60*60*1000).toISOString().split('T')[0] // example next month
        };
      });

      setPortfolioUMKM(result);

      const totalValue = result.reduce((sum, umkm) => sum + umkm.currentValue, 0);
      setTotalPortfolioValue(totalValue);

    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPortfolioData();
}, []);


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getStatusBadge = (status) => (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      {status === 'active' ? 'Active' : status}
    </span>
  );

  const handleViewUMKM = (umkmId) => {
    navigate(`/investor-dashboard/umkm/${umkmId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Investments</h1>
          <p className="text-gray-600 mt-1">Daftar investasi UMKM yang sedang berjalan</p>
        </div>
        <button 
          onClick={() => navigate('/investor-dashboard/browse')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>Investasi Baru</span>
        </button>
      </div>

      {/* Active Investments */}
      <div className="grid md:grid-cols-2 gap-4">
        {portfolioUMKM.map((umkm) => (
          <div key={umkm.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition">
            <div className="flex items-start space-x-4">
              <img
                src={umkm.image}
                alt={umkm.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{umkm.name}</h3>
                    <p className="text-xs text-gray-500">{umkm.category}</p>
                  </div>
                  {getStatusBadge(umkm.status)}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Investment</p>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(umkm.investmentAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Value</p>
                    <p className="text-sm font-bold text-green-600">{formatCurrency(umkm.currentValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="text-sm font-bold text-blue-600">{umkm.roi}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Profit Received</p>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(umkm.profitReceived)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>Next: {formatDate(umkm.nextProfitDate)}</span>
                  </div>
                  <button
                    onClick={() => handleViewUMKM(umkm.id)}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Eye size={16} />
                    <span>Detail</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-2">Total Portfolio Value</p>
            <p className="text-3xl font-bold">{formatCurrency(totalPortfolioValue)}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-2">Total Profit Received</p>
            <p className="text-3xl font-bold">
              {formatCurrency(portfolioUMKM.reduce((sum, umkm) => sum + umkm.profitReceived, 0))}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-2">Next Profit Payout</p>
            <div className="flex items-center space-x-2">
              <Calendar size={20} />
              <p className="text-xl font-bold">
                {portfolioUMKM.length > 0 ? formatDate(portfolioUMKM[0].nextProfitDate) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
