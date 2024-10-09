import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { LayoutDashboard } from '../../shared/layouts/LayoutDashboard';
import { IPostData, PostsService } from '../../shared/api/posts/PostsService';
import { statuses, TPostsStatus, TPostsType } from '../../shared/services/postOptions';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: TPostsType }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [rows, setRows] = useState<IPostData[]>([]);

  useEffect(() => {
    const status = searchParams.get('status') || '';
    const authorId = searchParams.get('authorId') || '';
    const typePost = type || 'texto';

    PostsService.getAll(typePost, status, authorId).then((data) => {
      if (data instanceof Error) {
        console.error(data.message);
      } else {
        setRows(data.posts);
      }
    });
  }, [type, searchParams]);

  const handleDelete = (postId: string) => {
    console.log(postId + ' deleted');
  };

  const updateStatusParam = (status: TPostsStatus) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('status', status);
    setSearchParams(newSearchParams);
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Publicações</h1>
          <div className="flex space-x-4">
            <div className="flex space-x-2">
              {Object.entries(statuses).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => updateStatusParam(key as TPostsStatus)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${searchParams.get('status') === key ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {value.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate('/posts/novo')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Adicionar post
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Título</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border-b">{row.title}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statuses[row.status] ? statuses[row.status].bgColor : ''} ${statuses[row.status] ? statuses[row.status].textColor : ''}`}
                  >
                    {statuses[row.status] ? statuses[row.status].name : row.status}
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
