import { HeaderDashboard } from '../components/header/HeaderDashboard';

interface ILayoutDashboardProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children }) => {
  return (
    <div className="layout-dashboard">
      <HeaderDashboard />
      <div className="layout-dashboard__content">{children}</div>
    </div>
  );
};
