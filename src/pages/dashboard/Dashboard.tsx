import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { LayoutDashboard } from '../../shared/layouts/LayoutDashboard';
import { IPostData, PostsService } from '../../shared/services/api/posts/PostsService';

export const Dashboard: React.FC = () => {
  const [rows, setRows] = useState<IPostData[]>([]);

  useEffect(() => {
    PostsService.getAll('texto').then((data) => {
      if (data instanceof Error) {
        console.error(data.message);
      } else {
        setRows(data);
      }
    });
  }, []);

  return (
    <LayoutDashboard>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Publicações</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Título</th>
              <th className="px-4 py-2 border-b">Autor</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border-b">{row.title}</td>
                <td className="px-4 py-2 border-b">{row.admin}</td>
                <td className="px-4 py-2 border-b">{row.status}</td>
                <td className="px-4 py-2 border-b">
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Ações
                    </MenuButton>
                    <MenuItems className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                            >
                              Editar
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                            >
                              Excluir
                            </a>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutDashboard>
  );
};
