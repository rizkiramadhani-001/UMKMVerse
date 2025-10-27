// src/pages/public/About.jsx
import { useNavigate } from 'react-router-dom';
import {
  Users,
  TrendingUp,
  Shield,
  Target,
  Award,
  Heart,
  Zap,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="text-blue-600" size={32} />,
      title: "Kolaborasi Multi-Stakeholder",
      description: "Platform yang menghubungkan UMKM, Investor, Supplier, dan Distributor dalam satu ekosistem"
    },
    {
      icon: <Shield className="text-green-600" size={32} />,
      title: "Aman & Transparan",
      description: "Sistem e-contract legal dan smart contract untuk bagi hasil yang transparan"
    },
    {
      icon: <TrendingUp className="text-purple-600" size={32} />,
      title: "Real-time Analytics",
      description: "Dashboard keuangan dan analytics ROI yang update secara real-time"
    },
    {
      icon: <Zap className="text-orange-600" size={32} />,
      title: "AI-Powered",
      description: "Credit scoring alternatif dengan AI untuk akses pembiayaan lebih mudah"
    }
  ];

  const team = [
    {
      name: "Nama Team Member 1",
      role: "CEO & Founder",
      avatar: "👨‍💼",
      description: "10+ tahun pengalaman di fintech dan UMKM"
    },
    {
      name: "Nama Team Member 2",
      role: "CTO",
      avatar: "👨‍💻",
      description: "Expert dalam blockchain dan smart contract"
    },
    {
      name: "Nama Team Member 3",
      role: "Head of Product",
      avatar: "👩‍💼",
      description: "Background di product management startup unicorn"
    },
    {
      name: "Nama Team Member 4",
      role: "Head of Marketing",
      avatar: "👩‍💻",
      description: "Spesialis growth marketing untuk UMKM"
    }
  ];

  const stats = [
    { number: "1000+", label: "UMKM Terdaftar" },
    { number: "500+", label: "Investor Aktif" },
    { number: "Rp 50M+", label: "Dana Tersalurkan" },
    { number: "18.5%", label: "Average ROI" }
  ];

  const values = [
    {
      icon: <Heart className="text-red-500" size={28} />,
      title: "Empowerment",
      description: "Memberdayakan UMKM Indonesia untuk tumbuh dan berkembang"
    },
    {
      icon: <Shield className="text-blue-500" size={28} />,
      title: "Trust & Transparency",
      description: "Membangun kepercayaan melalui transparansi dan keamanan"
    },
    {
      icon: <Users className="text-green-500" size={28} />,
      title: "Collaboration",
      description: "Mendorong kolaborasi win-win antar stakeholder"
    },
    {
      icon: <Target className="text-purple-500" size={28} />,
      title: "Innovation",
      description: "Terus berinovasi untuk solusi terbaik bagi UMKM"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            🚀 Tentang UMKMVerse
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Platform Kolaborasi Digital untuk <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">UMKM Indonesia</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            UMKMVerse adalah platform yang menghubungkan UMKM dengan investor, supplier, dan distributor 
            dalam satu ekosistem digital yang aman, transparan, dan efisien.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Visi Kami</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Menjadi platform kolaborasi digital #1 di Indonesia yang memberdayakan UMKM 
                untuk berkembang dan bersaing di era digital melalui ekosistem yang terintegrasi.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Award size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Misi Kami</h2>
              <p className="text-green-100 text-lg leading-relaxed">
                Menyediakan tools dan infrastruktur digital yang memudahkan UMKM untuk mendapatkan 
                akses pembiayaan, partner bisnis, dan insights untuk pertumbuhan berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Impact Kami</h2>
            <p className="text-xl text-gray-600">Angka-angka yang berbicara tentang dampak kami</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa UMKMVerse?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform lengkap dengan fitur-fitur yang dirancang khusus untuk kebutuhan ekosistem UMKM
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Prinsip yang menjadi fondasi dalam setiap keputusan dan tindakan kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-50 rounded-2xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Didukung oleh tim berpengalaman di bidang teknologi, fintech, dan UMKM
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 text-center border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dibangun dengan teknologi modern dan terkini
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React.js', desc: 'Frontend Framework' },
              { name: 'Laravel', desc: 'Backend Framework' },
              { name: 'PostgreSQL', desc: 'Database' },
              { name: 'Laravel Reverb', desc: 'Real-time Communication' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'OpenSign', desc: 'E-Signature' },
              { name: 'Gemini AI', desc: 'AI Chatbot' },
              { name: 'AWS/GCP', desc: 'Cloud Infrastructure' }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Globe size={32} />
                </div>
                <p className="font-bold text-white mb-1">{tech.name}</p>
                <p className="text-sm text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
            <p className="text-xl text-gray-600">
              Ada pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">hello@umkmverse.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-green-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Telepon</h3>
              <p className="text-gray-600">+62 812-3456-7890</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-purple-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600">Jakarta, Indonesia</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center space-x-4">
            <a href="#" className="w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center transition">
              <Linkedin size={24} />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center transition">
              <Github size={24} />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 hover:bg-blue-400 hover:text-white rounded-full flex items-center justify-center transition">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Bergabung dengan UMKMVerse?
          </h2>
          <p className="text-blue-100 mb-10 text-xl">
            Daftar sekarang dan mulai kembangkan bisnis UMKM Anda bersama kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="px-10 py-4 bg-white text-blue-600 rounded-xl text-lg font-bold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition transform"
            >
              Daftar Gratis
            </button>
            <button
              onClick={() => navigate('/browse')}
              className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl text-lg font-bold hover:bg-white hover:text-blue-600 transition"
            >
              Lihat UMKM
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}