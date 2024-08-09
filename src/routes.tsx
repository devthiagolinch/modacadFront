import {BrowserRouter, Route} from "react-router-dom"

import {Home} from './pages/Home';
import {PilulasMCD} from './pages/PilulasMCD';
import {TextosModacad} from './pages/TextosModacad';
import {PlanosMDC} from './pages/Planos';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { PublishText } from "./pages/TextosPublicados";
import { TextosMaisLidos } from "./pages/TextosMaisLidos";
import { PilulasPublicadas } from "./pages/PilulasPublicadas"
import { BlanckPage } from "./pages/blank";
import { AdminLoginPage } from "./pages/AdminLogin";
import MembersDashboard from "./pages/dashboard/MembersDash";
import { NewPost } from "./pages/dashboard/NewPost";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" element={<Home />} />
      <Route path="/maislidos" element={<TextosMaisLidos/>} />
      <Route path="/pilulas" element={<PilulasPublicadas/>} />
      <Route path="/pilulas/:id" element={<PilulasMCD />} />
      <Route path="/textosmodacad" element={<PublishText/>} />
      <Route path="/texto/:textId" element={<TextosModacad/>} />
      <Route path="/planos/" element={<PlanosMDC/>} />
      <Route path="/dashboard/" element={<Dashboard/>} />
      <Route path="/dashboard/members/" element={<MembersDashboard/>} />
      <Route path="/dashboard/new-post/" element={<NewPost/>}/>
      <Route path="/admin-login" element={<AdminLoginPage />} />
      
      <Route path="/blank" element={<BlanckPage/>} />
    </BrowserRouter>
  );
}

export default Routes