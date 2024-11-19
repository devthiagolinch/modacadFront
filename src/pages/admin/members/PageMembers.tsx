import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { IUserData, UsersService } from '../../../shared/api/users/UserServices';
import { getRoleClass } from '../../../shared/hook/getRoleClass';

export const PageMembers = () => {
  const [members, setMembers] = useState<IUserData[]>([]);

  useEffect(() => {
    UsersService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setMembers(response.users);
    });
  }, []);

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
      </div>
    </LayoutDashboard>
  );
};
