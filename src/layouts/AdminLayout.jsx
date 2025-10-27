import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardTopbar from '../components/layout/DashboardTopbar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />
      <DashboardTopbar />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}