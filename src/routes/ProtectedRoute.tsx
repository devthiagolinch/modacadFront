import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../shared/contexts';

export type TRoleStaff = 'administrador' | 'editor' | 'curador' | 'autor';
const teamRoles: TRoleStaff[] = ['administrador', 'editor', 'curador', 'autor'];

interface IProtectedRouteProps {
  children: React.ReactNode;
  restrictToTeamRoles?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
  restrictToTeamRoles = false,
  redirectTo = '/',
}) => {
  const { user, loading } = useUser();

  // Se ainda estiver carregando, não faz nada (pode exibir um loading spinner)
  if (loading) {
    return null; // Ou um componente de loading, como <LoadingSpinner />
  }

  // Verifica se o usuário está autenticado
  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  // Verifica se o usuário tem um papel válido, se necessário
  if (restrictToTeamRoles && !teamRoles.includes(user.role as TRoleStaff)) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
