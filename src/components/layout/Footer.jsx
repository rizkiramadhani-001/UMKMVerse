import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
              <h3 className="text-2xl font-bold">UMKMVerse</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Platform Kolaborasi Digital untuk UMKM Indonesia
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#features" className="hover:text-white transition">Fitur</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition">Cara Kerja</a></li>
              <li><a href="/#" className="hover:text-white transition">Harga</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition">Tentang Kami</Link></li>
              <li><a href="/#" className="hover:text-white transition">Kontak</a></li>
              <li><a href="/#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 UMKMVerse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/#" className="text-gray-400 hover:text-white transition">Privasi</a>
            <a href="/#" className="text-gray-400 hover:text-white transition">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}