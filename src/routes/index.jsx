// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';

// ========================================
// LAYOUTS
// ========================================
import PublicLayout from '../layouts/PublicLayout';
import UMKMLayout from '../layouts/UMKMLayout';
import InvestorLayout from '../layouts/InvestorLayout';
import SupplierLayout from '../layouts/SupplierLayout';
import DistributorLayout from '../layouts/DistributorLayout';
import AdminLayout from '../layouts/AdminLayout';

// ========================================
// PUBLIC PAGES
// ========================================
import LandingPage from '../pages/public/LandingPage';
import BrowseUMKM from '../pages/public/BrowseUMKM';
import UMKMDetail from '../pages/public/UMKMDetail';
import Forum from '../pages/public/Forum';
import About from '../pages/public/About';

// ========================================
// AUTH PAGES
// ========================================
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// ========================================
// ROLE-SPECIFIC REGISTER PAGES
// ========================================
import RegisterUMKM from '../pages/umkm/Register';
import RegisterInvestor from '../pages/investor/Register';
import RegisterSupplier from '../pages/supplier/Register';
import RegisterDistributor from '../pages/distributor/Register';

// ========================================
// UMKM PAGES (COMPLETE ✅)
// ========================================
import UMKMDashboard from '../pages/umkm/Dashboard';
import UMKMProfile from '../pages/umkm/Profile';
import UMKMFinance from '../pages/umkm/Finance';
import UMKMAnalytics from '../pages/umkm/Analytics';
import UMKMContracts from '../pages/umkm/Contracts';
import UMKMOrders from '../pages/umkm/Orders';
import UMKMChat from '../pages/umkm/Chat';
import UMKMSettings from '../pages/umkm/Settings';

// ========================================
// INVESTOR PAGES (3 CORE DONE ✅)
// ========================================
import InvestorDashboard from '../pages/investor/Dashboard';
import InvestorPortfolio from '../pages/investor/Portfolio';
import InvestorProfitSharing from '../pages/investor/ProfitSharing';
import InvestorAnalytics from '../pages/investor/Analytics';
// TODO: Tambahkan nanti
import InvestorBrowseUMKM from '../pages/investor/BrowseUMKM';
import InvestorUMKMDetail from '../pages/investor/UMKMDetail';
import InvestorContracts from '../pages/investor/Contracts';
import InvestorChat from '../pages/investor/Chat';
import InvestorSettings from '../pages/investor/Settings';

// ========================================
// SUPPLIER PAGES
// ========================================
import SupplierDashboard from '../pages/supplier/Dashboard';
// TODO: Tambahkan nanti
import SupplierOrders from '../pages/supplier/Orders';
import SupplierProducts from '../pages/supplier/Products';
import ProductForm from '../pages/supplier/ProductForm'; 
import SupplierContracts from '../pages/supplier/Contracts';
import SupplierChat from '../pages/supplier/Chat';
import SupplierForum from '../pages/supplier/Forum';
import SupplierSettings from '../pages/supplier/Settings';

// ========================================
// DISTRIBUTOR PAGES
// ========================================
import DistributorDashboard from '../pages/distributor/Dashboard';
// TODO: Tambahkan nanti
import DistributorOrders from '../pages/distributor/Orders';
import { DistributorTracking } from '../pages/distributor/Tracking';
import DistributorContracts from '../pages/distributor/Contracts';
import DistributorChat from '../pages/distributor/Chat';
import DistributorForum from '../pages/distributor/Forum';
import DistributorSettings from '../pages/distributor/Settings';

// ========================================
// ADMIN PAGES
// ========================================
import AdminDashboard from '../pages/admin/Dashboard';
// TODO: Tambahkan nanti
import AdminUsers from '../pages/admin/Users'; // Default Export - TETAP
// NAMED EXPORT (PERLU KURUNG KURAWAL {})
import { AdminUMKM } from '../pages/admin/UMKM'; 
import AdminVerification from '../pages/admin/Verification'; // Default Export - TETAP
// NAMED EXPORT (PERLU KURUNG KURAWAL {})
import { AdminTransactions } from '../pages/admin/Transactions';
import AdminForum from '../pages/admin/Forum';
// NAMED EXPORT (PERLU KURUNG KURAWAL {}) - INI SUMBER ERROR UTAMA
import { AdminAnalytics } from '../pages/admin/Analytics';
import AdminSettings from '../pages/admin/Settings';

const router = createBrowserRouter([
  // ========================================
  // PUBLIC ROUTES ✅ COMPLETE
  // ========================================
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'browse',
        element: <BrowseUMKM />
      },
      {
        path: 'umkm/:id',
        element: <UMKMDetail />
      },
      {
        path: 'forum',
        element: <Forum />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },

  // ========================================
  // AUTH ROUTES ✅ COMPLETE
  // ========================================
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },

  // ========================================
  // ROLE-SPECIFIC REGISTRATION ✅ COMPLETE
  // ========================================
  {
    path: '/register-umkm',
    element: <RegisterUMKM />
  },
  {
    path: '/register-investor',
    element: <RegisterInvestor />
  },
  {
    path: '/register-supplier',
    element: <RegisterSupplier />
  },
  {
    path: '/register-distributor',
    element: <RegisterDistributor />
  },

  // ========================================
  // UMKM DASHBOARD ROUTES ✅ COMPLETE
  // ========================================
  {
    path: '/umkm-dashboard',
    element: <UMKMLayout />,
    children: [
      {
        index: true,
        element: <UMKMDashboard />
      },
      {
        path: 'profile',
        element: <UMKMProfile />
      },
      {
        path: 'finance',
        element: <UMKMFinance />
      },
      {
        path: 'analytics',
        element: <UMKMAnalytics />
      },
      {
        path: 'contracts',
        element: <UMKMContracts />
      },
      {
        path: 'orders',
        element: <UMKMOrders />
      },
      {
        path: 'chat',
        element: <UMKMChat />
      },
      {
        path: 'settings',
        element: <UMKMSettings />
      }
    ]
  },

  // ========================================
  // INVESTOR DASHBOARD ROUTES (3 Core Pages ✅)
  // ========================================
  {
    path: '/investor-dashboard',
    element: <InvestorLayout />,
    children: [
      {
        index: true,
        element: <InvestorDashboard />
      },
      {
        path: 'portfolio',
        element: <InvestorPortfolio />
      },
      {
        path: 'profit-sharing',
        element: <InvestorProfitSharing />
      },
      {
        path: 'analytics',
        element: <InvestorAnalytics />
      },
      // TODO: Uncomment ketika pages sudah dibuat
      {
        path: 'browse',
        element: <InvestorBrowseUMKM />
      },
      {
        path: 'umkm/:id',
        element: <InvestorUMKMDetail />
      },
      {
        path: 'contracts',
        element: <InvestorContracts />
      },
      {
        path: 'chat',
        element: <InvestorChat />
      },
      {
        path: 'settings',
        element: <InvestorSettings />
      }
    ]
  },

  // ========================================
  // SUPPLIER DASHBOARD ROUTES
  // ========================================
  {
    path: '/supplier-dashboard',
    element: <SupplierLayout />,
    children: [
      {
        index: true,
        element: <SupplierDashboard />
      },
      // TODO: Uncomment ketika pages sudah dibuat
      {
        path: 'orders',
        element: <SupplierOrders />
      },
      {
        path: 'products',
        element: <SupplierProducts />
      },
      {
        path: 'contracts',
        element: <SupplierContracts />
      },
      {
        path: 'chat',
        element: <SupplierChat />
      },
      {
        path: 'product-form',
        element: <ProductForm />
      },
      {
        path: 'forum',
        element: <SupplierForum />
      },
      {
        path: 'settings',
        element: <SupplierSettings />
      }
    ]
  },

  // ========================================
  // DISTRIBUTOR DASHBOARD ROUTES
  // ========================================
  {
    path: '/distributor-dashboard',
    element: <DistributorLayout />,
    children: [
      {
        index: true,
        element: <DistributorDashboard />
      },
      // TODO: Uncomment ketika pages sudah dibuat
      {
        path: 'orders',
        element: <DistributorOrders />
      },
      {
        path: 'tracking',
        element: <DistributorTracking />
      },
      {
        path: 'contracts',
        element: <DistributorContracts />
      },
      {
        path: 'chat',
        element: <DistributorChat />
      },
      {
        path: 'forum',
        element: <DistributorForum />
      },
      {
        path: 'settings',
        element: <DistributorSettings />
      }
    ]
  },

  // ========================================
  // ADMIN DASHBOARD ROUTES
  // ========================================
  {
    path: '/admin-dashboard',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      // TODO: Uncomment ketika pages sudah dibuat
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: 'umkm',
        element: <AdminUMKM />
      },
      {
        path: 'verification',
        element: <AdminVerification />
      },
      {
        path: 'transactions',
        element: <AdminTransactions />
      },
      {
        path: 'forum',
        element: <AdminForum />
      },
      {
        path: 'analytics',
        element: <AdminAnalytics />
      },
      {
        path: 'settings',
        element: <AdminSettings />
      }
    ]
  }
]);

export default router;