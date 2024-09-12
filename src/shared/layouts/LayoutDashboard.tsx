import { HeaderDashboard } from '../components/header/HeaderDashboard';

interface ILayoutDashboardProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children }) => {
  return (
    <div className="layout-dashboard">
      <HeaderDashboard />
      <main className="flex flex-col gap-2 justify-center p-5">{children}</main>
    </div>
  );
};
