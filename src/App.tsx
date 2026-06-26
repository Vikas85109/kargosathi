import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastProvider } from '@/context/ToastContext';
import router from '@/routes';

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Provider>
  );
}
