import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './shared/contexts';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/index';
import { AuthDialogProvider } from './shared/contexts/AuthDialogContext';
import { AuthDialogs } from './shared/components/auth-dialogs/AuthDialogs';

import './index.css';

function App() {
  return (
    <UserProvider>
      <AuthDialogProvider>
        <BrowserRouter>
          <ToastContainer />
          <AppRoutes />
        </BrowserRouter>
        <AuthDialogs />
      </AuthDialogProvider>
    </UserProvider>
  );
}

export default App;
