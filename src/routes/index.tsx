import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../pages/LoginPage';

// Broker
import BrokerDashboard from '../pages/broker/Dashboard';
import CreateLoad from '../pages/broker/CreateLoad';
import LoadList from '../pages/broker/LoadList';
import AssignTruck from '../pages/broker/AssignTruck';
import TripTracking from '../pages/broker/TripTracking';
import BrokerInvoices from '../pages/broker/Invoices';
import Reports from '../pages/broker/Reports';

// Shipper
import ShipperDashboard from '../pages/shipper/Dashboard';
import MyLoads from '../pages/shipper/MyLoads';
import TrackShipment from '../pages/shipper/TrackShipment';
import ShipperInvoices from '../pages/shipper/Invoices';

// Transporter
import FleetList from '../pages/transporter/FleetList';
import AddTruck from '../pages/transporter/AddTruck';
import LoadMarketplace from '../pages/transporter/LoadMarketplace';
import MyTrips from '../pages/transporter/MyTrips';
import Earnings from '../pages/transporter/Earnings';

// Driver
import DriverTripList from '../pages/driver/TripList';
import TripDetail from '../pages/driver/TripDetail';
import PodUpload from '../pages/driver/PodUpload';

// Admin
import AdminDashboard from '../pages/admin/Dashboard';
import UserApproval from '../pages/admin/UserApproval';
import KycReview from '../pages/admin/KycReview';
import DisputeList from '../pages/admin/DisputeList';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },

  // Broker
  {
    element: <DashboardLayout role="broker" />,
    children: [
      { path: '/broker', element: <BrokerDashboard /> },
      { path: '/broker/create-load', element: <CreateLoad /> },
      { path: '/broker/loads', element: <LoadList /> },
      { path: '/broker/assign-truck', element: <AssignTruck /> },
      { path: '/broker/tracking', element: <TripTracking /> },
      { path: '/broker/invoices', element: <BrokerInvoices /> },
      { path: '/broker/reports', element: <Reports /> },
    ],
  },

  // Shipper
  {
    element: <DashboardLayout role="shipper" />,
    children: [
      { path: '/shipper', element: <ShipperDashboard /> },
      { path: '/shipper/loads', element: <MyLoads /> },
      { path: '/shipper/track', element: <TrackShipment /> },
      { path: '/shipper/invoices', element: <ShipperInvoices /> },
    ],
  },

  // Transporter
  {
    element: <DashboardLayout role="transporter" />,
    children: [
      { path: '/transporter', element: <FleetList /> },
      { path: '/transporter/add-truck', element: <AddTruck /> },
      { path: '/transporter/marketplace', element: <LoadMarketplace /> },
      { path: '/transporter/trips', element: <MyTrips /> },
      { path: '/transporter/earnings', element: <Earnings /> },
    ],
  },

  // Driver
  {
    element: <DashboardLayout role="driver" />,
    children: [
      { path: '/driver', element: <DriverTripList /> },
      { path: '/driver/trip/:id', element: <TripDetail /> },
      { path: '/driver/pod-upload', element: <PodUpload /> },
    ],
  },

  // Admin
  {
    element: <DashboardLayout role="admin" />,
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/admin/users', element: <UserApproval /> },
      { path: '/admin/kyc', element: <KycReview /> },
      { path: '/admin/disputes', element: <DisputeList /> },
    ],
  },
]);

export default router;
