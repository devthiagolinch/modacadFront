import { Link } from 'react-router-dom';

import logo from '../../../assets/svg/icon_rounded_bg_red.svg';
import { useUser } from '../../../shared/contexts';
import { TRoleStaff } from 'src/routes/ProtectedRoute';

const rolePermissions: Record<TRoleStaff, string[]> = {
  autor: ['posts', 'pílulas', 'ver site', 'meu perfil'],
  curador: [],
  editor: [],
  administrador: ['tags', 'assuntos', 'membros', 'planos', 'equipe'],
};

const getAccumulatedPermissions = (role: TRoleStaff): string[] => {
  const rolesOrder: TRoleStaff[] = ['autor', 'curador', 'editor', 'administrador']; // Ordem crescente de permissões
  const roleIndex = rolesOrder.indexOf(role);

  return rolesOrder.slice(0, roleIndex + 1).flatMap((r) => rolePermissions[r]);
};

interface ILink {
  name: string;
  path: string;
  disabled?: boolean;
}

const primaryLinks: ILink[] = [
  { name: 'posts', path: '/dashboard/texto' },
  { name: 'pílulas', path: '/dashboard/pilula' },
  { name: 'tags', path: '/admin/tags' },
  { name: 'assuntos', path: '/admin/assuntos' },
];

const secondaryLinks: ILink[] = [
  { name: 'meu perfil', path: '/admin/meu-perfil' },
  { name: 'membros', path: '/admin/membros' },
  { name: 'planos', path: '/admin/planos' },
  { name: 'equipe', path: '/admin/equipe' },
  { name: 'ver site', path: '/' },
];

export const MenuLateral = () => {
  const { user } = useUser();

  const role = user?.role as TRoleStaff;

  const accumulatedPermissions = getAccumulatedPermissions(role);

  const isLinkAllowed = (linkName: string) => {
    return accumulatedPermissions.includes(linkName);
  };

  const mappedPrimaryLinks = primaryLinks.map((link) => ({
    ...link,
    disabled: !isLinkAllowed(link.name),
  }));

  const mappedSecondaryLinks = secondaryLinks.map((link) => ({
    ...link,
    disabled: !isLinkAllowed(link.name),
  }));

  return (
    <div className="h-full w-full flex flex-col border-r border-gray-950 font-montserrat text-2xl p-4 justify-between">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="text-center">
          <p className="font-butler font-medium text-5xl">dash</p>
          <hr className="border-t-2 border-gray-950 w-full mt-2" />
        </div>
      </div>
      {/* Primary Links */}
      <nav>
        {mappedPrimaryLinks.map((link) => (
          <Link
            key={link.name}
            to={link.disabled ? '#' : link.path}
            className={`flex items-center mt-4 ${link.disabled ? 'opacity-30 cursor-not-allowed' : 'highlight-link'}`}
            onClick={(e) => link.disabled && e.preventDefault()}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {/* Secondary Links */}
      <nav>
        {mappedSecondaryLinks.map((link) => (
          <Link
            key={link.name}
            to={link.disabled ? '#' : link.path}
            className={`flex items-center mt-4 ${link.disabled ? 'opacity-30 cursor-not-allowed' : 'highlight-link'}`}
            onClick={(e) => link.disabled && e.preventDefault()}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {/* Footer */}
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="w-16" />
      </div>
    </div>
  );
};
