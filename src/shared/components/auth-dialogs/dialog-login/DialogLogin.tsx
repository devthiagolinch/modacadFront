import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAuthDialog } from '../../../contexts/AuthDialogContext';
import { AuthService } from '../../../api/auth/AuthService';
import { useUser } from '../../../contexts';
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
  const { isOpen, closeDialog, openDialog } = useAuthDialog();

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
      <div
        className="bg-[#f1ece8] p-8 w-[80%] max-w-[500px] justify-self-center items-center shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border border-slate-900 flex flex-col justify-center items-center p-4">
          <h2 className="font-butler text-4xl w-full text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 w-full space-y-4 font-montserrat">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full bg-transparent border-b border-slate-900 shadow-sm placeholder-[#202020] text-center focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Senha</label>
              <input
                {...register('password')}
                type="password"
                className="w-full bg-transparent border-b border-slate-900 shadow-sm placeholder-[#202020] text-center focus:outline-none"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full px-8 py-4 border border-slate-900 text-xl highlight-link">
              Entrar
            </button>
          </form>
          <div className="w-full mt-4 font-montserrat">
            <p className="text-sm text-gray-500 text-center">Não tem conta?</p>
            <div className="flex items-center justify-center">
              <button className="text-sm text-blue-600 hover:text-blue-800" onClick={() => openDialog('cadastro')}>
                Criar uma conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
