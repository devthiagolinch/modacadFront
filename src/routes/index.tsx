import { Navigate, Route, RouteProps, Routes } from "react-router-dom"

import { LOCAL_STORAGE_KEY__ACCESS_TOKEN } from "../lib/auth";

import { Home } from "../pages/Home";
import { PilulasMCD } from "../pages/PilulasMCD";
import { PilulasPublicadas } from "../pages/PilulasPublicadas";
import { TextosMaisLidos } from "../pages/TextosMaisLidos";
import { TextosModacad } from "../pages/TextosModacad";
import { PublishText } from "../pages/TextosPublicados";
import { PlanosMDC } from "../pages/Planos";
import { AdminLoginPage } from "../pages/AdminLogin";
import { NewPost } from "../pages/dashboard/NewPost";
import { BlanckPage } from "../pages/blank";
import {Dashboard} from "../pages/dashboard/Dashboard";
import { UpdatePost } from "../pages/dashboard/AtualizarPost";

type TPrivateRouteProps = RouteProps & {
    element: React.ReactNode;
  };
  
  const PrivateRoute: React.FC<TPrivateRouteProps> = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
  
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/admin-login" />
    )
  }

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maislidos" element={<TextosMaisLidos/>} />
            <Route path="/pilulas" element={<PilulasPublicadas/>} />
            <Route path="/pilulas/:pilulaId" element={<PilulasMCD />} />
            <Route path="/textosmodacad" element={<PublishText/>} />
            <Route path="/texto/:textId" element={<TextosModacad/>} />
            <Route path="/planos" element={<PlanosMDC/>} />
            
            <Route path="/dashboard/new-post" element={<PrivateRoute element={<NewPost/>} />} />
            <Route path="dashboard/profile/post-editor/:id" element={<PrivateRoute element={<UpdatePost/>} />} />
            <Route path="/dashboard/profile" element={<PrivateRoute element={<Dashboard/>} />} />
            
            <Route path="/admin-login" element={<AdminLoginPage />} />
            
            <Route path="/blank" element={<BlanckPage/>} />
        </Routes>
    )
}