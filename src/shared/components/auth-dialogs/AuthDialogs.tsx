import { useAuthDialog } from '../../../shared/contexts/AuthDialogContext';
import { DialogLogin } from './dialog-login/DialogLogin';
import { DialogCadastro } from './dialog-cadastro/DialogCadastro';

export const AuthDialogs = () => {
  const { type } = useAuthDialog();

  return type === 'login' ? <DialogLogin /> : <DialogCadastro />;
};
