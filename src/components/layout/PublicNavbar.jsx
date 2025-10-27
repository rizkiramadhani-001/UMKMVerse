import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                UMKMVerse
              </h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Telusuri UMKM
            </Link>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 transition font-medium">
              Fitur
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-blue-600 transition font-medium">
              Cara Kerja
            </button>
            <Link to="/login" className="px-5 py-2 text-blue-600 hover:text-blue-700 font-medium transition">
              Masuk
            </Link>
            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition transform">
              Daftar Gratis
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 transition">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => scrollToSection('browse')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition font-medium">
              Telusuri UMKM
            </button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition font-medium">
              Fitur
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition font-medium">
              Cara Kerja
            </button>
            <Link to="/login" className="block w-full mt-2 px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition text-center">
              Masuk
            </Link>
            <Link to="/register" className="block w-full mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition text-center">
              Daftar Gratis
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}