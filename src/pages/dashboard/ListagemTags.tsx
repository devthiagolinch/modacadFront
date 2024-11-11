import { useEffect, useState } from 'react';
import { ITagData, TagsService } from '../../shared/api/tags/TagsService';
import { FaSearch } from 'react-icons/fa';

export const ListagemTags = () => {
  const [tags, setTags] = useState<ITagData[]>([]);

  useEffect(() => {
    TagsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setTags(response);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 grid gap-6 mb-6 md:grid-cols-2">
      {/* Criar tag */}
      <div>
        <h1 className="font-butler text-3xl">Criar tag</h1>
        <div className="mt-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="meta_description" className="block mb-2 text-sm font-medium text-gray-900">
            Meta descrição (até 500 caracteres)
          </label>
          <input
            type="text"
            id="meta_description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="image_facebook" className="block mb-2 text-sm font-medium text-gray-900">
            Imagem Facebook
          </label>
          <input
            type="file"
            id="image_facebook"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="title_facebook" className="block mb-2 text-sm font-medium text-gray-900">
            Título Facebook
          </label>
          <input
            type="text"
            id="title_facebook"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="description_facebook" className="block mb-2 text-sm font-medium text-gray-900">
            Descrição Facebook (até 500 caracteres)
          </label>
          <input
            type="text"
            id="description_facebook"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>
      {/* Buscar tags */}
      <div>
        <div>
          <label htmlFor="search_tags">Buscar tags</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="size-4" />
              <input type="text" id="search_tags" />
            </div>
            <div>
              <ul>
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <span>{tag.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
