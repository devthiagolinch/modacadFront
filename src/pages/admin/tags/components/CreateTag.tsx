import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ITagData, TagsService } from '../../../../shared/api/tags/TagsService';
import { Alert } from '../../../../shared/components/ui/alert/Alert';

interface IFormCreateTag
  extends Pick<ITagData, 'name' | 'slug' | 'meta_description' | 'facebook_title' | 'facebook_description'> {}

const createTagSchema: yup.ObjectSchema<IFormCreateTag> = yup.object({
  name: yup.string().required(),
  slug: yup.string().required(),
  meta_description: yup.string().nullable(),
  facebook_title: yup.string().nullable(),
  facebook_description: yup.string().nullable(),
});

interface ICreateTagProps {
  onCreated: () => void;
}

type TMessage = { type: 'success' | 'danger'; text: string };

export const CreateTag: React.FC<ICreateTagProps> = ({ onCreated }) => {
  const [imageFacebook, setImageFacebook] = useState<File | null>(null);
  const [message, setMessage] = useState<TMessage>({ type: 'success', text: '' });

  const { handleSubmit, register, reset } = useForm<IFormCreateTag>({ resolver: yupResolver(createTagSchema) });

  const onSubmit: SubmitHandler<IFormCreateTag> = async (data) => {
    try {
      await TagsService.create(data);
      onCreated();
      reset();
      setImageFacebook(null);
      setMessage({
        type: 'success',
        text: 'Tag criada com sucesso',
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'danger',
        text: 'Erro ao criar a tag',
      });
    }
  };

  // Adicionar imagens
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFacebook(acceptedFiles[0]);
      // TO DO - Implementar upload de imagem
    }
  };

  // Remover imagem
  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImageFacebook(null);
    // TO DO - Implementar remoção de imagem
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50 * 1024 * 1024,
  });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: 'success', text: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <h1 className="text-3xl">Criar tag</h1>
        <button className="bg-bgBtn text-white font-medium px-4 py-2" type="submit">
          SALVAR
        </button>
      </div>
      {message.text && <Alert color={message.type} message={message.text} />}
      <div className="mt-2">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Nome
        </label>
        <input
          {...register('name')}
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
          {...register('slug')}
          type="text"
          id="slug"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Meta descrição (até 500 caracteres)</label>
        <input
          {...register('meta_description')}
          type="text"
          id="meta_description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="my-4 border-t border-gray-300"></div>
      <div className="mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Imagem Facebook</label>
        <div
          {...getRootProps()}
          className={`flex items-center justify-center rounded-lg w-full overflow-hidden ${isDragActive ? 'bg-gray-100' : 'bg-gray-50'}`}
        >
          <input {...getInputProps()} className="hidden" />
          {imageFacebook ? (
            <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer">
              <img
                src={URL.createObjectURL(imageFacebook)}
                alt="Imagem do Facebook"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                onClick={handleRemoveImage}
              >
                <FaTimes className="size-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="size-8 text-gray-600" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 mt-2 text-center font-regular">
                  <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte aqui.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, HEIC ou PNG</p>
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
          {...register('facebook_title')}
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
          {...register('facebook_description')}
          type="text"
          id="description_facebook"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
    </form>
  );
};
