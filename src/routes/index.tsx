import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import BrokerLayout from '../layouts/BrokerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public
import SplashPage from '../pages/SplashPage';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Onboarding
import OnboardingPage from '../features/onboarding/OnboardingPage';

// Broker
import DashboardPage from '../features/broker/DashboardPage';
import StatusPage from '../features/broker/StatusPage';
import ProfilePage from '../features/broker/ProfilePage';
import LoadsPage from '../features/broker/LoadsPage';
import TrucksPage from '../features/broker/TrucksPage';
import PaymentsPage from '../features/broker/PaymentsPage';

// Admin
import AdminLoginPage from '../features/admin/AdminLoginPage';
import AdminDashboardPage from '../features/admin/AdminDashboardPage';
import ApplicationsPage from '../features/admin/ApplicationsPage';
import BrokerDetailPage from '../features/admin/BrokerDetailPage';

const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/welcome', element: <WelcomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/onboarding',
    element: <ProtectedRoute role="broker"><OnboardingPage /></ProtectedRoute>,
  },

  // Broker area
  {
    element: <ProtectedRoute role="broker"><BrokerLayout /></ProtectedRoute>,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/status', element: <StatusPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/loads', element: <LoadsPage /> },
      { path: '/trucks', element: <TrucksPage /> },
      { path: '/payments', element: <PaymentsPage /> },
    ],
  },

  // Admin area
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    element: <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '/admin/dashboard', element: <AdminDashboardPage /> },
      { path: '/admin/applications', element: <ApplicationsPage /> },
      { path: '/admin/broker/:id', element: <BrokerDetailPage /> },
    ],
  },
]);

export default router;
