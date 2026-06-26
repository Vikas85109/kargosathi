import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import Home from '@/pages/Home';

const About = lazy(() => import('@/pages/About'));
const Transporters = lazy(() => import('@/pages/Transporters'));
const TransporterDetail = lazy(() => import('@/pages/TransporterDetail'));
const TruckOwners = lazy(() => import('@/pages/TruckOwners'));
const TruckOwnerDetail = lazy(() => import('@/pages/TruckOwnerDetail'));
const FareCalculator = lazy(() => import('@/pages/FareCalculator'));
const LiveTracking = lazy(() => import('@/pages/LiveTracking'));
const EnquiryPage = lazy(() => import('@/pages/Enquiry'));
const Invoices = lazy(() => import('@/pages/Invoices'));
const InvoiceDetail = lazy(() => import('@/pages/InvoiceDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/transporters', element: <Transporters /> },
      { path: '/transporters/:id', element: <TransporterDetail /> },
      { path: '/truck-owners', element: <TruckOwners /> },
      { path: '/truck-owners/:id', element: <TruckOwnerDetail /> },
      { path: '/fare-calculator', element: <FareCalculator /> },
      { path: '/tracking', element: <LiveTracking /> },
      { path: '/enquiry', element: <EnquiryPage /> },
      { path: '/invoices', element: <Invoices /> },
      { path: '/invoices/:id', element: <InvoiceDetail /> },
      { path: '/contact', element: <Contact /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
