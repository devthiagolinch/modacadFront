import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAuthDialog } from '../../../shared/contexts/AuthDialogContext';
import { AuthService } from '../../../shared/api/auth/AuthService';
import { useUser } from '../../../shared/contexts';
import { useEffect } from 'react';

interface ILoginForm {
  email: string;
  password: string;
}

const loginSchema: yup.ObjectSchema<ILoginForm> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialFormValues: ILoginForm = {
  email: '',
  password: '',
};

export const DialogLogin = () => {
  const { isOpen, closeDialog } = useAuthDialog();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { login } = useUser();

  const onSubmit = (data: ILoginForm) => {
    AuthService.login(data.email, data.password).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      login(response.token, response.admin);
      reset(initialFormValues);
      closeDialog();
    });
  };

  useEffect(() => {
    if (isOpen) {
      reset(initialFormValues);
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeDialog}>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              {...register('password')}
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Entrar
          </button>
        </form>
        <button onClick={closeDialog} className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700">
          Fechar
        </button>
      </div>
    </div>
  );
};
