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
  clearTag: () => void;
  selectedTag: ITagData | null;
}

const initialTag = {
  name: '',
  slug: '',
  meta_description: '',
  facebook_title: '',
  facebook_description: '',
};

type TMessage = { type: 'success' | 'danger'; text: string };

export const CreateTag: React.FC<ICreateTagProps> = ({ onCreated, clearTag, selectedTag }) => {
  const [imageFacebook, setImageFacebook] = useState<File | null>(null);
  const [message, setMessage] = useState<TMessage>({ type: 'success', text: '' });

  const { handleSubmit, register, reset, watch } = useForm<IFormCreateTag>({ resolver: yupResolver(createTagSchema) });

  const onSubmit: SubmitHandler<IFormCreateTag> = async (data) => {
    // Se houver tag selecionada, atualiza. Senão, cria uma nova
    if (selectedTag) {
      TagsService.updateById(selectedTag.id, data).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao atualizar a tag',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Tag atualizada com sucesso',
        });
        reset(initialTag);
        setImageFacebook(null);
        onCreated();
      });
    } else {
      TagsService.create(data).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao criar a tag',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Tag criada com sucesso',
        });
        reset(initialTag);
        setImageFacebook(null);
        onCreated();
      });
    }
  };

  // Atualiza o formulário com os dados da tag se estiver selecionada
  useEffect(() => {
    if (selectedTag) {
      reset(selectedTag);
    } else {
      reset(initialTag);
    }
  }, [selectedTag, reset]);

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

  // Limpar formulário
  const handleClear = () => {
    clearTag();
    reset(initialTag);
    setImageFacebook(null);
  };

  // Exclui a tag
  const handleDelete = () => {
    if (selectedTag) {
      TagsService.deleteById(selectedTag.id).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao excluir a tag',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Tag excluída com sucesso',
        });
        clearTag();
        onCreated();
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50 * 1024 * 1024,
  });

  // Exibir mensagem de sucesso ou erro
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
      <div className="flex justify-between flex-wrap gap-2">
        <h1 className="text-3xl">Criar tag</h1>
        <div className="flex flex-wrap gap-2">
          <button className="bg-bgBtn text-white font-medium px-4 py-2" type="submit">
            {selectedTag ? 'ATUALIZAR' : 'SALVAR'}
          </button>
          <button className="text-bgBtn border border-bgBtn font-medium px-4 py-2" type="button" onClick={handleClear}>
            LIMPAR
          </button>
          <button className="bg-red-500 text-white font-medium px-4 py-2" type="button" onClick={handleDelete}>
            EXCLUIR
          </button>
        </div>
      </div>
      {message.text && <Alert color={message.type}>{message.text}</Alert>}
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
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Meta descrição (até 500 caracteres)
          <span className="text-gray-500 ml-2">({watch('meta_description')?.length || 0}/500)</span>
        </label>
        <textarea
          {...register('meta_description')}
          id="meta_description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          rows={5}
          required
        />
      </div>
      <div className="my-4 border-t border-gray-300"></div>

      <div className="mt-2">
        <label htmlFor="title_facebook" className="block mb-2 text-sm font-medium text-gray-900">
          Título Facebook
        </label>
        <input
          {...register('facebook_title')}
          type="text"
          id="title_facebook"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mt-2">
        <label htmlFor="description_facebook" className="block mb-2 text-sm font-medium text-gray-900">
          Descrição Facebook (até 130 caracteres)
          <span className="text-gray-500 ml-2">({watch('facebook_description')?.length || 0}/130)</span>
        </label>
        <textarea
          {...register('facebook_description')}
          id="description_facebook"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          rows={4}
        />
      </div>
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
    </form>
  );
};
