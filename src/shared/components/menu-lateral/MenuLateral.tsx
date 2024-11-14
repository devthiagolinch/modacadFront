import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

const primaryLinks = [
  { name: 'Home', path: '/', icon: <HomeIcon className="h-6 w-6" /> },
  { name: 'Profile', path: '/profile', icon: <UserIcon className="h-6 w-6" /> },
];

const secondaryLinks = [{ name: 'Settings', path: '/settings', icon: <HomeIcon className="h-6 w-6" /> }];

export const MenuLateral = () => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-12 w-12" />
      </div>

      {/* Primary Links */}
      <div className="flex-grow">
        <nav className="mt-4">
          {primaryLinks.map((link) => (
            <Link key={link.name} to={link.path} className="flex items-center p-4 hover:bg-gray-700">
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Secondary Links */}
        <nav className="mt-4">
          {secondaryLinks.map((link) => (
            <Link key={link.name} to={link.path} className="flex items-center p-4 hover:bg-gray-700">
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Icon at the Bottom */}
      <div className="p-4">
        <button className="flex items-center w-full p-4 hover:bg-gray-700">
          <HomeIcon className="h-6 w-6" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};
