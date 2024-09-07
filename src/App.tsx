import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './shared/contexts';
import { AppRoutes } from "./routes/index";
import "./index.css"

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;