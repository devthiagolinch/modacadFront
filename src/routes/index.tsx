import { Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom';

import { useUser } from '../shared/contexts/UserContext';

import { Home } from '../pages/home/Home';
import { Plans } from '../pages/posts/Plans';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { BlankPage } from '../pages/blank';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { PopularPosts } from '../pages/posts/textos/PopularPosts';
import { PublishedPills } from '../pages/posts/pilula/PublishedPills';
import { PillDetails } from '../pages/posts/pilula/PillDetails';
import { PostDetails } from '../pages/posts/textos/PostDetails';
import { PageTags } from '../pages/admin/tags/PageTags';
import { PageMembers } from '../pages/admin/members/PageMembers';
import { PageSubjects } from '../pages/admin/subjects/PageSubjects';
import { PostEditor } from '../pages/dashboard/post-editor/PostEditor';
import { PagePlans } from '../pages/admin/plans/PagePlans';
import { PageTeam } from '../pages/admin/team/PageTeam';
import { PageCategoryPost } from '../pages/posts/page-category-post/PageCategoryPost';
import { PublishedPosts } from '../pages/posts/textos/PublishedPosts';

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

      <Route path="/categorias/:categoryId" element={<PageCategoryPost />} />

      <Route path="/pilulas" element={<PublishedPills />} />
      <Route path="/pilulas/:postId" element={<PillDetails />} />

      {/* Rotas para postagens */}
      <Route path="/posts" element={<PublishedPosts />} />
      <Route path="/posts/popular" element={<PopularPosts />} />
      <Route path="/posts/:postId" element={<PostDetails />} />

      {/* Rotas Protegidas (Privadas) */}
      <Route path="/dashboard/:type" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/posts/novo" element={<PrivateRoute element={<PostEditor />} />} />
      <Route path="/posts/:postId/editar" element={<PrivateRoute element={<PostEditor />} />} />

      {/* Login Admin */}
      <Route path="/admin" element={<PrivateRoute element={<Outlet />} />}>
        <Route index element={<Navigate to="membros" />} />
        <Route path="membros" element={<PageMembers />} />
        <Route path="tags" element={<PageTags />} />
        <Route path="assuntos" element={<PageSubjects />} />
        <Route path="planos" element={<PagePlans />} />
        <Route path="equipe" element={<PageTeam />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Página em Branco (Para teste ou outro propósito) */}
      <Route path="/blank" element={<BlankPage />} />
    </Routes>
  );
};
