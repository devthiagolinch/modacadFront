import { LayoutDashboard } from '../../../shared/layouts';
import { CreateSubject } from './components/CreateSubject';
import { ListSubjects } from './components/ListSubjects';

export const PageSubjects = () => {
  const onCreated = () => {
    console.log('teste');
  };
  return (
    <LayoutDashboard>
      <div className="grid gap-6 md:grid-cols-2 h-full">
        <ListSubjects subjects={[]} />
        <CreateSubject onCreated={onCreated} />
      </div>
    </LayoutDashboard>
  );
};
