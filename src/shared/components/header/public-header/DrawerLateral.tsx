import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../../shared/contexts';

interface IDrawerLateralProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const DrawerLateral: FC<IDrawerLateralProps> = ({ isOpen, toggleDrawer }) => {
  const { user } = useUser();
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white w-full md:w-[600px] transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <div className="flex justify-end px-4 pt-4">
        <button className="p-2 border border-gray-950" onClick={toggleDrawer}>
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
      </div>
      <ul className="p-4 font-butler text-2xl">
        <li className="mb-2">
          <Link to="/posts" className="block p-2 highlight-link">
            Textos Publicados
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/posts/popular" className="block p-2 highlight-link">
            Textos Mais Lidos
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/pilulas" className="block p-2 highlight-link">
            Pílulas
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="block p-2 highlight-link">
            Moldes Modacad
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/" className="block p-2 highlight-link">
            Contatos
          </Link>
        </li>
      </ul>
      <div className="p-4 font-montserrat">
        {user ? (
          <div className="border border-gray-950 p-4">
            <p className="text-gray-950 font-light">Olá, {user.name}</p>
            <p>Não é você? Sair</p>
          </div>
        ) : (
          <div className="border border-gray-950 p-4">
            <p className="text-gray-950 font-light">Faça login para aproveitar ao máximo nosso site.</p>
            <button className="bg-primary px-4 py-2 border border-gray-950 mt-2">ENTRAR</button>
          </div>
        )}
      </div>
    </div>
  );
};
