import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { IUserData, UsersService } from '../../../shared/api/users/UserServices';
import { CreateMember } from './components/CreateMember';

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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <button className="bg-bgBtn py-2 px-4 text-white">CONVIDAR</button>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 mt-4">
            e-mail
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 bg-white">
            <tbody>
              <tr>
                <td className="px-6 py-2 border border-gray-300">administrador</td>
              </tr>
              <tr>
                <td className="px-6 py-2 border border-gray-300">editor</td>
              </tr>
              <tr>
                <td className="px-6 py-2 border border-gray-300">autor</td>
              </tr>
              <tr>
                <td className="px-6 py-2 border border-gray-300">curador</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
