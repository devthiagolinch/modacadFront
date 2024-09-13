import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { LayoutDashboard } from '../../shared/layouts/LayoutDashboard';
import { IPostData, PostsService } from '../../shared/services/api/posts/PostsService';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

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

  const handleDelete = (postId: string) => {
    console.log(postId + ' deleted');
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Publicações</h1>
          <button
            onClick={() => navigate('/posts/novo')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Adicionar post
          </button>
        </div>
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
                <td className="px-4 py-2 border-b">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Ações
                    </MenuButton>
                    <MenuItems className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(`/posts/${row.id}/editar`)}
                              className={`${active ? 'bg-gray-100' : ''} w-full text-left block px-4 py-2 text-sm text-gray-700`}
                            >
                              Editar
                            </button>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => handleDelete(row.id)}
                              className={`${active ? 'bg-gray-100' : ''} w-full text-left block px-4 py-2 text-sm text-gray-700`}
                            >
                              Excluir
                            </button>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(`/posts/${row.id}`)}
                              className={`${active ? 'bg-gray-100' : ''} w-full text-left block px-4 py-2 text-sm text-gray-700`}
                            >
                              Ver
                            </button>
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
