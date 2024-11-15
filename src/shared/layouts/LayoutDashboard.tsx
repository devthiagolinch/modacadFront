import { MenuLateral } from '../components/menu-lateral/MenuLateral';

interface ILayoutDashboardProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-48 h-screen fixed top-0 left-0">
        <MenuLateral />
      </div>
      <main className="flex-grow p-6 ml-48 font-montserrat">{children}</main>
    </div>
  );
};
