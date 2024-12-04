import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { IUserData, UsersService } from '../../../shared/api/users/UserServices';
import { CreateMember } from './components/CreateMember';
import { InviteNewMember } from './components/InviteNewMember';

export const PageTeam = () => {
  const [members, setMembers] = useState<IUserData[]>([]);

  useEffect(() => {
    UsersService.getAllStaff().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setMembers(response.staffs);
    });
  }, []);

  return (
    <LayoutDashboard>
      <InviteNewMember />
      <hr className="border-black my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <button className="border border-gray-300 text-bgBtn py-2 px-4 bg-white hover:bg-bgBtn hover:text-white">
            EDITAR
          </button>
          <div className="flex my-4">
            <p className="bg-black text-white py-2 px-4 ">autores</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white">
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-2 border border-gray-300">{member.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CreateMember />
      </div>
    </LayoutDashboard>
  );
};
