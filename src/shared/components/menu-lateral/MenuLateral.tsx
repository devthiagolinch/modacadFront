import { Link } from 'react-router-dom';

import logo from '../../../assets/svg/icon_rounded_bg_red.svg';

const primaryLinks = [
  { name: 'posts', path: '/dashboard/posts', disabled: false },
  { name: 'pílulas', path: '/dashboard/pilulas', disabled: false },
  { name: 'tags', path: '/admin/tags', disabled: false },
  { name: 'assuntos', path: '/admin/assuntos', disabled: true },
  { name: 'footer', path: '/admin/footer', disabled: true },
];

const secondaryLinks = [
  { name: 'membros', path: '/admin/membros', disabled: true },
  { name: 'planos', path: '/admin/planos', disabled: true },
  { name: 'autores', path: '/admin/autores', disabled: true },
  { name: 'equipe', path: '/admin/equipes', disabled: true },
  { name: 'chat', path: '/admin/chat', disabled: true },
  { name: 'live', path: '/admin/live', disabled: true },
  { name: 'reunião', path: '/admin/reuniao', disabled: true },
];

export const MenuLateral = () => {
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
        {primaryLinks.map((link) => (
          <Link
            key={link.name}
            to={link.disabled ? '#' : link.path}
            className={`flex items-center highlight-link mt-4 ${link.disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
            onClick={(e) => link.disabled && e.preventDefault()}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {/* Secondary Links */}
      <nav>
        {secondaryLinks.map((link) => (
          <Link
            key={link.name}
            to={link.disabled ? '#' : link.path}
            className={`flex items-center highlight-link mt-4 ${link.disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
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