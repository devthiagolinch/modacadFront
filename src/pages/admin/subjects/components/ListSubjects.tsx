import React from 'react';
import { ISubjectData } from '../../../../shared/api/subjects/SubjectsService';

interface IListSubjectsProps {
  subjects: ISubjectData[];
}
export const ListSubjects: React.FC<IListSubjectsProps> = ({ subjects }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h1 className="text-2xl text-center">Assuntos</h1>
      {/* Listagem de tags */}
      <div className="flex-grow md:h-4 bg-white mt-4 border border-gray-300 rounded-lg font-montserrat font-medium overflow-y-auto">
        <ul>
          {subjects.map((subject, index) => (
            <li key={subject.id} className="border-b border-gray-300 p-4 last:border-0 flex gap-2">
              <span>{subject.priority ?? index}</span>
              <p>{subject.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
