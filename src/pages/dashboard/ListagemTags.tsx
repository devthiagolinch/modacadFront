import { useEffect, useState } from 'react';
import { FaSearch, FaUpload } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import { ITagData, TagsService } from '../../shared/api/tags/TagsService';

export const ListagemTags = () => {
  const [tags, setTags] = useState<ITagData[]>([]);
  const [imageFacebook, setImageFacebook] = useState<File | null>(null);

  // Buscar tags da API
  useEffect(() => {
    TagsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setTags(response);
    });
  }, []);

  // Adicionar imagens
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFacebook(acceptedFiles[0]);
    }
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setImageFacebook(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
  });

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
          <label className="block mb-2 text-sm font-medium text-gray-900">Meta descrição (até 500 caracteres)</label>
          <input
            type="text"
            id="meta_description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Imagem Facebook</label>
          <div {...getRootProps()} className="flex items-center justify-center w-full">
            <input {...getInputProps()} className="hidden" />
            {imageFacebook ? (
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <img
                  src={URL.createObjectURL(imageFacebook)}
                  alt="Imagem do Facebook"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="size-8" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
              </div>
            )}
          </div>
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
