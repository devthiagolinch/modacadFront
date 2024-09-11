import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

import { useUser } from '../shared/contexts/UserContext';

import { Home } from '../pages/home/Home';
import { Plans } from '../pages/posts/Plans';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { NewPost } from '../pages/dashboard/NewPost';
import { BlankPage } from '../pages/blank';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { UpdatePost } from '../pages/dashboard/AtualizarPost';
import { PopularPosts } from '../pages/posts/PopularPosts';
import { PublishedPills } from '../pages/posts/PublishedPills';
import { PillDetails } from '../pages/posts/PillDetails';
import { Posts } from '../pages/posts/Posts';
import { PostDetails } from '../pages/posts/PostDetails';

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
      <Route path="/posts/popular" element={<PopularPosts />} />
      <Route path="/posts/pills" element={<PublishedPills />} />
      <Route path="/posts/pills/:pillId" element={<PillDetails />} />
      <Route path="/posts/news" element={<Posts />} />
      <Route path="/posts/:postId" element={<PostDetails />} />
      <Route path="/plans" element={<Plans />} />

      {/* Rotas Protegidas (Privadas) */}
      <Route path="/dashboard/new-post" element={<PrivateRoute element={<NewPost />} />} />
      <Route path="/dashboard/edit-post/:postId" element={<PrivateRoute element={<UpdatePost />} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Login Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Página em Branco (Para teste ou outro propósito) */}
      <Route path="/blank" element={<BlankPage />} />
    </Routes>
  );
};
