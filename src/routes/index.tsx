import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Home } from '../pages/home/Home';
import { PlansPage } from '../pages/plans/PlansPage';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { BlankPage } from '../pages/blank';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { PopularPosts } from '../pages/posts/textos/PopularPosts';
import { PublishedPills } from '../pages/posts/pilula/PublishedPills';
import { PageTags } from '../pages/admin/tags/PageTags';
import { PageMembers } from '../pages/admin/members/PageMembers';
import { PageSubjects } from '../pages/admin/subjects/PageSubjects';
import { PostEditor } from '../pages/dashboard/post-editor/PostEditor';
import { PagePlans } from '../pages/admin/plans/PagePlans';
import { PageTeam } from '../pages/admin/team/PageTeam';
import { PageCategoryPost } from '../pages/posts/page-category-post/PageCategoryPost';
import { PublishedPosts } from '../pages/posts/textos/PublishedPosts';
import { PostDetails } from '../pages/posts/post-details/PostDetails';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/planos" element={<PlansPage />} />

      <Route path="/categorias/:categoryId" element={<PageCategoryPost />} />

      <Route path="/pilulas" element={<PublishedPills />} />
      <Route path="/pilulas/:postId" element={<PostDetails />} />

      {/* Rotas para postagens */}
      <Route path="/posts" element={<PublishedPosts />} />
      <Route path="/posts/popular" element={<PopularPosts />} />
      <Route path="/posts/:postId" element={<PostDetails />} />

      {/* Rotas Protegidas (Privadas) */}
      <Route
        path="/dashboard/:type"
        element={
          <ProtectedRoute restrictToTeamRoles>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/novo"
        element={
          <ProtectedRoute restrictToTeamRoles>
            <PostEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/:postId/editar"
        element={
          <ProtectedRoute restrictToTeamRoles>
            <PostEditor />
          </ProtectedRoute>
        }
      />

      {/* Login Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute restrictToTeamRoles>
            <Outlet />
          </ProtectedRoute>
        }
      >
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
