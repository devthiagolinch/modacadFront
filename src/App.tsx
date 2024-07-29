
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminLoginPage } from "./pages/AdminLogin";
import { Home } from "./pages/Home";
import { AdminProfile } from "./pages/AdminProfile";
import { BlanckPage } from "./pages/blank";
import Dashboard from "./pages/Dashboard";
import { PilulasMCD } from "./pages/PilulasMCD";
import { PilulasPublicadas } from "./pages/PilulasPublicadas";
import { PlanosMDC } from "./pages/Planos";
import { TextosMaisLidos } from "./pages/TextosMaisLidos";
import { TextosModacad } from "./pages/TextosModacad";
import { PublishText } from "./pages/TextosPublicados";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pilulas/:pilulaId" element={<PilulasMCD />} />
      <Route path="/textomodacad/:textId" element={<TextosModacad/>} />
      <Route path="/planos/" element={<PlanosMDC/>} />
      <Route path="/dash/" element={<Dashboard/>} />
      <Route path="/textospublicados" element={<PublishText/>} />
      <Route path="/maislidos" element={<TextosMaisLidos/>} />
      <Route path="/pilulas" element={<PilulasPublicadas/>} />
      <Route path="/blank" element={<BlanckPage/>} />

      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/adminprofile/:id" element={<AdminProfile/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;