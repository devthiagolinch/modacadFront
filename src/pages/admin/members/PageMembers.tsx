import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { IUserData, UsersService } from '../../../shared/api/users/UserServices';
import { getRoleClass } from '../../../shared/hook/getRoleClass';

export const PageMembers = () => {
  const [members, setMembers] = useState<IUserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMembers = async (page: number) => {
    UsersService.getAll({ page }).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setMembers(response.users);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    });
  };

  useEffect(() => {
    fetchMembers(1);
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) fetchMembers(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchMembers(currentPage + 1);
  };

  return (
    <LayoutDashboard>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <button className="bg-bgBtn text-white font-medium px-4 py-2">EXPORTAR</button>
          <button className="bg-gray-950 px-4 py-2 text-white">filtro 1</button>
          <button className="bg-gray-950 px-4 py-2 text-white">filtro 2</button>
        </div>
        <div className="flex gap-2">
          <table>
            <thead>
              <tr>
                <td></td>
                <td className="text-medium">inscritos</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-2">membros</td>
                <td className="bg-white text-center">10</td>
              </tr>
              <tr>
                <td className="pr-2">assinantes</td>
                <td className="bg-white text-center">10</td>
              </tr>
              <tr>
                <td className="pr-2">ex assinantes</td>
                <td className="bg-white text-center">10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white mt-4 border border-gray-300 font-montserrat font-medium overflow-y-auto">
        <ul>
          {members.map((member) => (
            <li
              key={member.id}
              className="border-b border-gray-300 p-4 last:border-0 flex justify-between items-center"
            >
              <p className="highlight-link">{member.email}</p>
              <p className={`rounded-full px-4 py-1 ${getRoleClass(member.role)}`}>{member.role}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center border-t border-gray-300 p-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-bgBtn text-white'}`}
          >
            Anterior
          </button>
          <p className="text-sm">
            Página {currentPage} de {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-bgBtn text-white'}`}
          >
            Próximo
          </button>
        </div>
      </div>
    </LayoutDashboard>
  );
};
