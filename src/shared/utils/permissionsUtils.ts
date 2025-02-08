import { IUserLogin } from '../contexts';
import { TPostsVisibility } from '../services/postOptions';

/**
 * PAPÉIS ADMINISTRATIVOS
 * administrador
 * editor
 * curador
 * autor
 *
 * PAPÉIS DE ACESSO
 * membro
 * assinante
 * ex-assinante
 */

/**
 * VISIBILIDADES
 * public
 * pro
 * basic
 */

const teamRoles = ['administrador', 'editor', 'curador', 'autor'];

export const checkPostAccess = (user: IUserLogin | null, postVisibility: TPostsVisibility) => {
  // Se o usuário não estiver logado
  if (!user) {
    if (postVisibility === 'public') return 'full';
    else return 'login';
  }

  // Se o usuário for membro da equipe
  if (teamRoles.includes(user.role)) return 'full';

  // Se o usuário for membro
  if (user.role === 'membro' || user.role === 'ex-assinante') {
    if (postVisibility !== 'pro') return 'full';
    else return 'upgrade';
  }

  // Se o usuário for assinante
  if (user.role === 'assinante') return 'full';

  return 'restricted';
};
