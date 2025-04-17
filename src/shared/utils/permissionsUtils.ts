import { IUserLogin } from '../contexts';
import { TPostsVisibility } from '../services/postOptions';

type TUserRole = 'unauthenticated' | 'member' | 'subscriber' | 'staff';
export type TAccessResult = 'full' | 'restricted' | 'login' | 'upgrade' | 'exclusive';

export const checkPostAccess = (user: IUserLogin | null, postVisibility: TPostsVisibility): TAccessResult => {
  // Determina o papel do usuário
  const userRole: TUserRole = determineUserRole(user);

  // Staff tem acesso total a tudo
  if (userRole === 'staff') return 'full';

  // Conteúdo público é acessível a todos
  if (postVisibility === 'public') return 'full';

  // Conteúdo básico requer pelo menos autenticação
  if (postVisibility === 'basic') {
    return userRole !== 'unauthenticated' ? 'full' : 'login';
  }

  // Conteúdo pro requer assinante ativo
  if (postVisibility === 'pro') {
    if (userRole === 'unauthenticated') return 'exclusive';
    return userRole === 'subscriber' ? 'full' : 'upgrade';
  }

  return 'restricted';
};

const determineUserRole = (user: IUserLogin | null): TUserRole => {
  if (!user) return 'unauthenticated';

  // Verifica se é staff (equipe)
  const teamRoles = ['administrador', 'editor', 'curador', 'autor'];
  if (teamRoles.includes(user.role)) return 'staff';

  switch (user.role) {
    case 'assinante':
      return 'subscriber';
    default:
      return 'member';
  }
};
