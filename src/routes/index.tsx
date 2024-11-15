import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

import { useUser } from '../shared/contexts/UserContext';

import { Home } from '../pages/home/Home';
import { Plans } from '../pages/posts/Plans';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { BlankPage } from '../pages/blank';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { PopularPosts } from '../pages/posts/PopularPosts';
import { PublishedPills } from '../pages/posts/PublishedPills';
import { PillDetails } from '../pages/posts/PillDetails';
import { PostDetails } from '../pages/posts/PostDetails';
import { PostEditor } from '../pages/dashboard/PostEditor';
import { PageTags } from '../pages/admin/tags/PageTags';

type TPrivateRouteProps = RouteProps & {
  element: React.ReactNode;
};

export const AppRoutes = () => {
  const { user, loading } = useUser();

  const PrivateRoute: React.FC<TPrivateRouteProps> = ({ element }) => {
    if (loading) {
      return <div>Carregando...</div>;
    }

    const isAuthenticated = !!user;

    return isAuthenticated ? element : <Navigate to="/admin/login" />;
  };

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/planos" element={<Plans />} />

      <Route path="/pilulas" element={<PublishedPills />} />
      <Route path="/pilulas/:postId" element={<PillDetails />} />

      {/* Rotas para postagens */}
      <Route path="/posts/popular" element={<PopularPosts />} />
      <Route path="/posts/:postId" element={<PostDetails />} />

      {/* Rotas Protegidas (Privadas) */}
      <Route path="/dashboard/:type" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/posts/novo" element={<PrivateRoute element={<PostEditor />} />} />
      <Route path="/posts/:postId/editar" element={<PrivateRoute element={<PostEditor />} />} />

      {/* Login Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/tags" element={<PrivateRoute element={<PageTags />} />} />

      {/* Página em Branco (Para teste ou outro propósito) */}
      <Route path="/blank" element={<BlankPage />} />
    </Routes>
  );
};
