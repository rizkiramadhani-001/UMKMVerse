import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import FloatingForumButton from '../components/common/FloatingForumButton';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <Outlet />
      <Footer />
      <FloatingForumButton /> {/* Tambahkan di sini */}
    </div>
  );
}