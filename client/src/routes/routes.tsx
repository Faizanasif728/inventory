import { createBrowserRouter } from 'react-router-dom';
import ProtectRoute from '../components/layout/ProtectRoute';
import Sidebar from '../components/layout/Sidebar';
import CreateProduct from '../pages/CreateProduct';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage';
import SaleHistoryPage from '../pages/SaleHistoryPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProductManagePage from '../pages/managements/ProductManagePage';
import PurchaseManagementPage from '../pages/managements/PurchaseManagementPage';
import SaleManagementPage from '../pages/managements/SaleManagementPage';
import SellerManagementPage from '../pages/managements/SellerManagementPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import EditProfilePage from '../pages/EditProfilePage';
import CategoryManagementPage from '../pages/managements/CategoryManagementPage';
import BrandManagementPage from '../pages/managements/BrandManagementPage';
import AddLoanDetails from '../pages/AddLoanDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Support from '../pages/Support';
import Guideline from '../pages/Guideline';
import LoanManagementPage from '../pages/LoanManagementPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Sidebar />,
    children: [
      {
        path: '/',
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        ),
      },
      {
        path: '/create-product',
        element: (
          <ProtectRoute>
            <CreateProduct />
          </ProtectRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
      },
      {
        path: '/products',
        element: (
          <ProtectRoute>
            <ProductManagePage />
          </ProtectRoute>
        ),
      },
      {
        path: '/sales',
        element: (
          <ProtectRoute>
            <SaleManagementPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/sellers',
        element: (
          <ProtectRoute>
            <SellerManagementPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/purchases',
        element: (
          <ProtectRoute>
            <PurchaseManagementPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/categories',
        element: (
          <ProtectRoute>
            <CategoryManagementPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/brands',
        element: (
          <ProtectRoute>
            <BrandManagementPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/about',
        element: (
          <ProtectRoute>
            <About />
          </ProtectRoute>
        ),
      },
      {
        path: '/contact',
        element: (
          <ProtectRoute>
            <Contact />
          </ProtectRoute>
        ),
      },
      {
        path: '/support',
        element: (
          <ProtectRoute>
            <Support />
          </ProtectRoute>
        ),
      },
      {
        path: '/guideline',
        element: (
          <ProtectRoute>
            <Guideline />
          </ProtectRoute>
        ),
      },
      {
        path: '/sales-history',
        element: (
          <ProtectRoute>
            <SaleHistoryPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/edit-profile',
        element: (
          <ProtectRoute>
            <EditProfilePage />
          </ProtectRoute>
        ),
      },
      {
        path: '/change-password',
        element: (
          <ProtectRoute>
            <ChangePasswordPage />
          </ProtectRoute>
        ),
      },
      {
        path: '/add-loan',
        element: (
          <ProtectRoute>
            <AddLoanDetails />
          </ProtectRoute>
        ),
      },
      {
        path: '/loans',
        element: (
          <ProtectRoute>
            <LoanManagementPage />
          </ProtectRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <NotFound /> },
]);
