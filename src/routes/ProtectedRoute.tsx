import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../shared/contexts';

type TRole = 'administrador' | 'editor' | 'curador' | 'autor';
const teamRoles: TRole[] = ['administrador', 'editor', 'curador', 'autor'];

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
  const { user } = useUser();

  // Verifica se o usuário está autenticado
  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  // Verifica se o usuário tem um papel válido, se necessário
  if (restrictToTeamRoles && !teamRoles.includes(user.role as TRole)) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
