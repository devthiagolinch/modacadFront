import {BrowserRouter, Route} from "react-router-dom"

import {Home} from './pages/Home';
import {PilulasMCD} from './pages/PilulasMCD';
import {TextosModacad} from './pages/TextosModacad';
import {PlanosMDC} from './pages/Planos';
import Dashboard from "./pages/Dashboard";
import { PublishText } from "./pages/TextosPublicados";
import { TextosMaisLidos } from "./pages/TextosMaisLidos";
import { PilulasPublicadas } from "./pages/PilulasPublicadas"
import { BlanckPage } from "./pages/blank";
import { AdminProfile } from "./pages/AdminProfile";
import { AdminLoginPage } from "./pages/AdminLogin";

function Routes() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default Routes