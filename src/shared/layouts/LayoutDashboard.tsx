import { MenuLateral } from '../components/menu-lateral/MenuLateral';

interface ILayoutDashboardProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-48 h-screen fixed top-0 left-0 h-full hidden sm:block">
        <MenuLateral />
      </div>
      <main className="flex-grow p-2 md:p-6 md:ml-48 font-montserrat">
        <div className="container mx-auto h-full">{children}</div>
      </main>
    </div>
  );
};
