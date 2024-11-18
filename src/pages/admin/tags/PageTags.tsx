import { LayoutDashboard } from '../../../shared/layouts';
import { CreateTag } from './components/CreateTag';
import { ListTags } from './components/ListTags';

export const PageTags = () => {
  return (
    <LayoutDashboard>
      <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 h-full">
        <CreateTag />
        <ListTags />
      </div>
    </LayoutDashboard>
  );
};
