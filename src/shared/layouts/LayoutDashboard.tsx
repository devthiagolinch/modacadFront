import { MenuLateral } from '../components/menu-lateral/MenuLateral';

interface ILayoutDashboardProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <MenuLateral />
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};
