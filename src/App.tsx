import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BrokerProvider } from './context/BrokerContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import router from './routes';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrokerProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </BrokerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
