import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { CreateSubject } from './components/CreateSubject';
import { ListSubjects } from './components/ListSubjects';
import { ISubjectData, SubjectsService } from '../../../shared/api/subjects/SubjectsService';

export const PageSubjects = () => {
  const [subjects, setSubjects] = useState<ISubjectData[]>([]);

  const fetchSubjects = () => {
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setSubjects(response);
    });
  };

  const onCreated = () => {
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <LayoutDashboard>
      <div className="grid gap-6 md:grid-cols-2 h-full">
        <ListSubjects subjects={subjects} />
        <CreateSubject onCreated={onCreated} />
      </div>
    </LayoutDashboard>
  );
};
