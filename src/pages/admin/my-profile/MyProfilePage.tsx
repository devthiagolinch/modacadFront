import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { LayoutDashboard } from '../../../shared/layouts';
import { TProfile, UsersService } from '../../../shared/api/users/UserServices';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';

interface IFormMember {
  email: string;
  name: string;
  image: File | null;
}

const initialFormValues: IFormMember = {
  email: '',
  name: '',
  image: null,
};

const formMemberSchema: yup.ObjectSchema<IFormMember> = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  image: yup.mixed<File>().nullable().defined(),
});

export const MyProfilePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profile, setProfile] = useState<TProfile | null>(null);

  const { handleSubmit, register, setValue, control, reset } = useForm<IFormMember>({
    resolver: yupResolver(formMemberSchema),
    defaultValues: initialFormValues,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue('image', file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    maxSize: 50 * 1024 * 1024,
  });

  const fetchProfile = async () => {
    UsersService.getProfile().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      reset({
        ...initialFormValues,
        ...response,
      });
      setProfile(response);
    });
  }

  const onSubmit: SubmitHandler<IFormMember> = async (data) => {
    console.log(data);
    UsersService.updateProfile({ name: data.name, email: data.email });
    if(data.image) {
      UsersService.updateAvatar(data.image);
    }

    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <LayoutDashboard>
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
        <div className="mt-2">
          <label htmlFor="role-create" className="block mb-2 text-sm font-medium text-gray-900">
            papel
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50 cursor-not-allowed"
            id="role-create"
            required
            disabled
            value={profile?.role}
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">avatar</label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div>
                <div
                  {...getRootProps()}
                  className={`p-4 border-2 border-dashed rounded-md cursor-pointer min-h-[200px] flex items-center justify-between ${isDragActive ? 'border-primary' : 'border-gray-300'} hover:border-primary`}
                >
                  <input {...getInputProps()} />
                  {(imagePreview || profile?.avatar) ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={imagePreview || profile?.avatar || ''}
                        alt="Preview"
                        className="w-40 h-40 rounded-full object-cover"
                      />
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
        </div>
        <div className="mt-2">
          <button className="px-8 py-4 text-gray-950 border border-gray-950 hover:bg-primary">Salvar</button>
        </div>
      </form>
    </LayoutDashboard>
  );
};
