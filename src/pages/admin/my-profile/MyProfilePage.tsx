import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ImageDropzone, TImageFile } from '../../../shared/components/image-dropzone/ImageDropzone';
import { UsersService } from '../../../shared/api/users/UserServices';
import { LayoutDashboard } from '../../../shared/layouts';

interface IFormMember {
  email: string;
  name: string;
  image: TImageFile;
}

const initialFormValues: IFormMember = {
  email: '',
  name: '',
  image: null,
};

const formMemberSchema: yup.ObjectSchema<IFormMember> = yup.object().shape({
  email: yup.string().email('Informe um e-mail válido').required('E-mail é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  image: yup
    .mixed()
    .test('is-valid-type', 'Apenas imagens são permitidas (JPEG, PNG, GIF)', (value) => {
      if (!value) return true; // campo não obrigatório

      // Verifica se é um objeto com propriedade file (nosso TImageFile)
      if (typeof value === 'object' && value !== null && 'file' in value) {
        return (
          typeof value.file === 'object' &&
          value.file !== null &&
          'type' in value.file &&
          ['image/jpeg', 'image/png', 'image/gif'].includes((value.file as File).type)
        );
      }

      // Ou se é diretamente um File (caso não esteja usando nosso tipo)
      if (value instanceof File) {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }

      return false;
    })
    .test('is-valid-size', 'Imagem muito grande (máx. 5MB)', (value) => {
      if (!value) return true;

      if (typeof value === 'object' && value !== null && 'file' in value && 'size' in value) {
        return (value.file as File).size <= 5 * 1024 * 1024; // 5MB
      }

      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }

      return false;
    })
    .nullable()
    .default(null),
}) as yup.ObjectSchema<IFormMember>;

export const MyProfilePage = () => {
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFormMember>({
    resolver: yupResolver(formMemberSchema),
    defaultValues: initialFormValues,
    mode: 'onBlur',
  });

  const handleImageChange = (fileInfo: TImageFile) => {
    setValue('image', fileInfo, { shouldValidate: true });
  };

  const currentImage = watch('image');

  const onSubmit: SubmitHandler<IFormMember> = async (data) => {
    console.log(data);
    // UsersService.updateProfile(data);
  };

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const response = await UsersService.getProfile();
        if (response instanceof Error) {
          console.error(response);
          return;
        }

        reset({
          email: response.email || '',
          name: response.name || '',
          image: response.avatar
            ? {
                preview: response.avatar,
                file: null as unknown as File,
              }
            : null,
        });

        setUserRole(response.role);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            value={userRole}
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">avatar</label>
          <ImageDropzone
            onChange={handleImageChange}
            value={currentImage}
            error={errors.image?.message ? { message: errors.image.message } : undefined}
            className="mt-1"
          />
        </div>
        <div className="mt-2">
          <button className="px-8 py-4 text-gray-950 border border-gray-950 hover:bg-primary">Salvar</button>
        </div>
      </form>
    </LayoutDashboard>
  );
};
