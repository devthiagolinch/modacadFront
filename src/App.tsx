import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './shared/contexts';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/index';
import { AuthDialogProvider } from './shared/contexts/AuthDialogContext';
import { DialogLogin } from './shared/components/dialog-login/DialogLogin';

import './index.css';

function App() {
  return (
    <UserProvider>
      <AuthDialogProvider>
        <BrowserRouter>
          <ToastContainer />
          <AppRoutes />
        </BrowserRouter>
        <DialogLogin />
      </AuthDialogProvider>
    </UserProvider>
  );
}

export default App;
