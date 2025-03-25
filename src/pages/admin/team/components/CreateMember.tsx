import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UsersService } from '../../../../shared/api/users/UserServices';
import * as yup from 'yup';

interface IFormCreateMember {
  email: string;
  name: string;
  image: File | null;
}

export interface IUserPayload {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  role: string;
}
interface ICreateMemberProps {
  user: IUserPayload | null;
  onCreated: () => void;
}

const initialFormValues: IFormCreateMember = {
  email: '',
  name: '',
  image: null,
};

export const CreateMember: React.FC<ICreateMemberProps> = ({ user, onCreated }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createMemberSchema: yup.ObjectSchema<IFormCreateMember> = yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    image: yup.mixed<File>().nullable().defined(),
  });

  const { handleSubmit, register, reset } = useForm<IFormCreateMember>({
    resolver: yupResolver(createMemberSchema),
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<IFormCreateMember> = async (data) => {
    try {
      if (user) {
        const response = await UsersService.updateStaffById(user.id, { name: data.name, email: data.email });
        if (response instanceof Error) {
          console.error(response);
          return;
        }
  
        if (data.image) {
          const avatarResponse = await UsersService.updateAvatar(data.image);
          if (avatarResponse instanceof Error) {
            console.error(avatarResponse);
            return;
          }
        }
  
        onCreated();
        reset(initialFormValues);
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Erro ao atualizar o membro:', error);
    }
  };

  const handleDelete = async () => {
    if (user) {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este membro?');
      if (!confirmDelete) return;

      try {
        const response = await UsersService.deleteById(user.id);
        if (response instanceof Error) {
          console.error(response);
          return;
        }
        onCreated();
      } catch (error) {
        console.error('Erro ao excluir o membro:', error);
      }
    }
  };

  {/*const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue('image', file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    maxSize: 50 * 1024 * 1024,
  }); */}

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        image: null,
      });

      if (user.avatar) {
        setImagePreview(user.avatar);
      } else {
        setImagePreview(null);
      }	
    }
  }, [reset, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <label htmlFor="email-create" className="block mb-2 text-sm font-medium text-gray-900">
          e-mail
        </label>
        <input
          {...register('email')}
          type="text"
          id="email-create"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mt-2">
        <label htmlFor="name-create" className="block mb-2 text-sm font-medium text-gray-900">
          nome
        </label>
        <input
          {...register('name')}
          type="text"
          id="name-create"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/*<div className="mt-2">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <div>
              <div
                {...getRootProps()}
                aria-label="Área para upload de imagem"
                className={`p-4 border-2 border-dashed rounded-md cursor-pointer min-h-[200px] flex items-center justify-between ${isDragActive ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500`}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <div className="flex items-center gap-2">
                    <img src={imagePreview} alt="Preview" className="w-40 h-40 rounded-full object-cover" />
                  </div>
                ) : (
                  <p className="text-gray-500">Arraste uma imagem aqui ou clique para selecionar</p>
                )}
              </div>
              <div>
                {field.value && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue('image', null);
                      setImagePreview(null);
                    }}
                    className="text-red-500 mt-2"
                  >
                    Remover imagem
                  </button>
                )}
              </div>
            </div>
          )}
        />
      </div>*/}
      <div className="flex items-center gap-2 mt-4">
        <img src={imagePreview || ''} alt="Sem imagem de perfil" className="w-40 h-40 rounded-full object-cover" />
      </div>
      {user && (
        <div className="mt-4 flex gap-2">
          <button className="py-2 px-4 bg-bgBtn text-white text-1xl" type="submit">
            Atualizar
          </button>
          <button
            className="py-2 px-4 border border-rose-500 text-rose-500 text-1xl hover:bg-rose-500 hover:text-white"
            type="button"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>
      )}
    </form>
  );
};