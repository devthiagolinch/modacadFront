import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface ICadastroForm {
  email: string;
  password: string;
}

const cadastroSchema: yup.ObjectSchema<ICadastroForm> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface IDialogCadastroProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DialogCadastro: React.FC<IDialogCadastroProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICadastroForm>({
    resolver: yupResolver(cadastroSchema),
  });

  const onSubmit: SubmitHandler<ICadastroForm> = (data) => {
    console.log(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-center mb-4">Cadastro</h2>
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
        <button className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};
