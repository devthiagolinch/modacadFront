import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';

const primaryLinks = [
  { name: 'posts', path: '/dashboard/posts', disabled: false },
  { name: 'pílulas', path: '/dashboard/pilulas', icon: <UserIcon className="h-6 w-6" />, disabled: false },
  { name: 'tags', path: '/admin/tags', icon: <UserIcon className="h-6 w-6" />, disabled: false },
  { name: 'assuntos', path: '/admin/assuntos', icon: <UserIcon className="h-6 w-6" />, disabled: false },
  { name: 'footer', path: '/admin/footer', icon: <UserIcon className="h-6 w-6" />, disabled: false },
];

const secondaryLinks = [
  { name: 'membros', path: '/admin/membros', disabled: false },
  { name: 'planos', path: '/admin/planos', disabled: false },
  { name: 'autores', path: '/admin/autores', disabled: false },
  { name: 'equipe', path: '/admin/equipes', disabled: true },
  { name: 'chat', path: '/admin/chat', disabled: true },
  { name: 'live', path: '/admin/live', disabled: true },
  { name: 'reunião', path: '/admin/reuniao', disabled: true },
];

export const MenuLateral = () => {
  return (
    <div className="h-full w-48 flex flex-col border-r border-gray-950 font-montserrat text-2xl">
      {/* Primary Links */}
      <div className="flex-grow p-4">
        <nav className="mt-4">
          {primaryLinks.map((link) => (
            <Link key={link.name} to={link.path} className="flex items-center highlight-link mt-4">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Secondary Links */}
        <nav className="mt-4">
          {secondaryLinks.map((link) => (
            <Link key={link.name} to={link.path} className="flex items-center highlight-link mt-4">
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
