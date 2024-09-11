import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { LayoutDashboard } from '../../shared/layouts/LayoutDashboard';

const posts = [
  {
    id: 1,
    title: 'Postagem 1',
    author: 'Autor 1',
    updatedAt: '2023-10-01',
    status: 'Publicado',
  },
  {
    id: 2,
    title: 'Postagem 2',
    author: 'Autor 2',
    updatedAt: '2023-10-02',
    status: 'Rascunho',
  },
];

export const Dashboard: React.FC = () => {
  return (
    <LayoutDashboard>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Publicações</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Título</th>
              <th className="px-4 py-2 border-b">Autor</th>
              <th className="px-4 py-2 border-b">Data de Atualização</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-2 border-b">{post.title}</td>
                <td className="px-4 py-2 border-b">{post.author}</td>
                <td className="px-4 py-2 border-b">{post.updatedAt}</td>
                <td className="px-4 py-2 border-b">{post.status}</td>
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
