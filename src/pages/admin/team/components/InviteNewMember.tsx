import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { DropdownMenu } from '../../../../shared/components/ui/dropdown-menu/DropdownMenu';
import { roles, TUsersRole } from '../../../../shared/services/userOptions';
import { Alert } from '../../../../shared/components/ui/alert/Alert';
import { UsersService } from '../../../../shared/api/users/UserServices';

interface IFormValue {
  email: string;
  role: string;
}

const inviteSchema: yup.ObjectSchema<IFormValue> = yup.object({
  email: yup.string().email().required(),
  role: yup.string().required(),
});

type TMessage = { type: 'success' | 'danger'; text: string };

export const InviteNewMember = () => {
  const [message, setMessage] = useState<TMessage>({ type: 'success', text: '' });

  const { handleSubmit, control, setValue, watch } = useForm<IFormValue>({
    resolver: yupResolver(inviteSchema),
  });

  const rolesOptions = Object.entries(roles)
  .filter(([key]) => ['administrador', 'autor', 'editor', 'curador'].includes(key))
  .map(([key, value]) => ({
    name: value.name,
    key: key as TUsersRole,
  }));

  const watchRole = watch('role');

  const handleRoleChange = (key: string) => {
    setValue('role', key as TUsersRole);
  };

  const onSubmit = (data: IFormValue) => {
    UsersService.inviteMember(data.email, data.role).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        setMessage({ type: 'danger', text: 'Erro ao convidar membro' });
        return;
      }
      setMessage({ type: 'success', text: 'Membro convidado com sucesso' });
    });
  };

  const onError = () => {
    setMessage({ type: 'danger', text: 'Erro ao convidar membro' });
  };

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
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <button className="bg-bgBtn py-2 px-4 mb-2 text-white">CONVIDAR</button>
      {message.text && <Alert color={message.type}>{message.text}</Alert>}
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field }) => (
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 mt-4">
              e-mail
            </label>
            <input
              {...field}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
            />
          </div>
        )}
      />
      <DropdownMenu textButton={watchRole ?? 'Cargo'} items={rolesOptions} onSelect={handleRoleChange} />
    </form>
  );
};
