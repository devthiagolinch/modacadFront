
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from "./pages/Home";
import { PilulasMCD } from "./pages/PilulasMCD";
import { PilulasPublicadas } from "./pages/PilulasPublicadas";
import { TextosMaisLidos } from "./pages/TextosMaisLidos";
import { TextosModacad } from "./pages/TextosModacad";
import { PublishText } from "./pages/TextosPublicados";
import { PlanosMDC } from "./pages/Planos";

import { AdminLoginPage } from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";

import { NewPost } from "./pages/Dashboard/NewPost";

import { BlanckPage } from "./pages/blank";
import MembersDashboard from "./pages/Dashboard/MembersDash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maislidos" element={<TextosMaisLidos/>} />
      <Route path="/pilulas" element={<PilulasPublicadas/>} />
      <Route path="/pilulas/:pilulaId" element={<PilulasMCD />} />
      <Route path="/textosmodacad" element={<PublishText/>} />
      <Route path="/texto/:textId" element={<TextosModacad/>} />
      <Route path="/planos/" element={<PlanosMDC/>} />
      <Route path="/dash" element={<Dashboard/>} />
      <Route path="/dash/members" element={<MembersDashboard />} />
      <Route path="/dash/new-post" element={<NewPost/>}/>
      <Route path="/admin-login" element={<AdminLoginPage />} />
      
      <Route path="/blank" element={<BlanckPage/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;