import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IDrawerLateralProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const DrawerLateral: FC<IDrawerLateralProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:hidden z-50`}
    >
      <button className="absolute top-4 right-4 p-2 bg-gray-700 rounded-md" onClick={toggleDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul className="p-4">
        <li className="mb-2">
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded-md">
            Início
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/posts/popular" className="block hover:bg-gray-700 p-2 rounded-md">
            Populares
          </Link>
        </li>
      </ul>
    </div>
  );
};
