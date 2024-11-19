import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './shared/contexts';
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/index";
import "./index.css"

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;