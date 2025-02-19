import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AuthService, ICadastroForm } from '../../../../shared/api/auth/AuthService';
import { useAuthDialog } from '../../../contexts/AuthDialogContext';
import { useUser } from '../../../../shared/contexts';

const cadastroSchema: yup.ObjectSchema<ICadastroForm> = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialFormValues: ICadastroForm = {
  name: '',
  email: '',
  password: '',
};

export const DialogCadastro = () => {
  const { isOpen, closeDialog, openDialog } = useAuthDialog();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICadastroForm>({
    resolver: yupResolver(cadastroSchema),
  });

  const onSubmit: SubmitHandler<ICadastroForm> = async (data) => {
    try {
      const cadastroResponse = await AuthService.cadastro(data);

      if (cadastroResponse instanceof Error) {
        console.error(cadastroResponse);
        return;
      }

      const loginResponse = await AuthService.login(data.email, data.password);

      if (loginResponse instanceof Error) {
        console.error(loginResponse);
        return;
      }

      login(loginResponse.token, loginResponse.admin);
      reset(initialFormValues);
      closeDialog();
    } catch (error) {
      console.error('Erro inesperado', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeDialog}>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-center mb-4">Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
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
        <div className="flex gap-2 items-center justify-center mt-4">
          <p className="text-sm text-gray-500">Já tem uma conta?</p>
          <button className="text-sm text-blue-600 hover:text-blue-800" onClick={() => openDialog('login')}>
            Fazer login
          </button>
        </div>
      </div>
    </div>
  );
};
