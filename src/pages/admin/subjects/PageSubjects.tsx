import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { CreateSubject } from './components/CreateSubject';
import { ListSubjects } from './components/ListSubjects';
import { ISubjectData, SubjectsService } from '../../../shared/api/subjects/SubjectsService';

export const PageSubjects = () => {
  const [subjects, setSubjects] = useState<ISubjectData[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<ISubjectData | null>(null);

  // Buscar assuntos
  const fetchSubjects = () => {
    SubjectsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setSubjects(response);
    });
  };

  // Atualizar a lista de assuntos ao criar um novo
  const onCreated = () => {
    fetchSubjects();
    setSelectedSubject(null);
  };

  // Solicitar assuntos ao carregar a página
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <LayoutDashboard>
      <div className="grid gap-6 md:grid-cols-2 h-full">
        <ListSubjects subjects={subjects} onSelectSubject={setSelectedSubject} />
        <CreateSubject
          onCreated={onCreated}
          selectedSubject={selectedSubject}
          clearTag={() => setSelectedSubject(null)}
        />
      </div>
    </LayoutDashboard>
  );
};
