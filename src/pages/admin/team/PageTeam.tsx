import { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../shared/layouts';
import { IUserData, UsersService } from '../../../shared/api/users/UserServices';
import { CreateMember, IUserPayload } from './components/CreateMember';
import { InviteNewMember } from './components/InviteNewMember';

export const PageTeam = () => {
  const [members, setMembers] = useState<IUserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserPayload | null>(null);

  const fetchUsers = () => {
    UsersService.getAllStaff().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setMembers(response.staffs);
    });
  };

  useEffect(() => {
    UsersService.getAllStaff().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setMembers(response.staffs);
    })
  }, []);

  const onCreated = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [onCreated]);

  return (
    <LayoutDashboard>
      <InviteNewMember />
      <hr className="border-black my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white">
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-2 border border-gray-300" onClick={() => setSelectedUser(member)}>
                      <span className="highlight-link">{member.name}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CreateMember user={selectedUser} onCreated={onCreated} />
      </div>
    </LayoutDashboard>
  );
};
