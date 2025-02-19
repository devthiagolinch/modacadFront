import { api } from '../../../shared/services/axios';

interface ILoginResponse {
  admin: {
    name: string;
    subject: string;
    role: string;
  };
  token: string;
}

const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post<ILoginResponse>('/admin-session/sessions', { email, password });
    if (data.admin && data.token) {
      return data;
    }
    return new Error('Erro ao fazer login');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao fazer login');
  }
};

export interface ICadastroForm {
  name: string;
  email: string;
  password: string;
}

const cadastro = async ({ name, email, password }: ICadastroForm): Promise<void | Error> => {
  try {
    await api.post('/admins', { name, email, password });
  } catch (error) {
    console.error(error);
    return new Error('Erro ao fazer login');
  }
};

export const AuthService = {
  login,
  cadastro,
};
