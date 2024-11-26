import { api } from '../../../shared/services/axios';
import { EUsersStatus, TUsersPlan, TUsersRole } from 'src/shared/services/userOptions';

export interface IUserData {
  avatar: string | null;
  cellphone: string;
  created_at: string;
  email: string;
  id: string;
  role: string;
  name: string;
}

type TGetAllResult = {
  users: IUserData[];
  totalPages: number;
  totalItems: number;
  totalAssinantes: number;
  totalMembros: number;
  totalExAssinantes: number;
  currentPage: number;
};
type TGetAllParams = {
  role?: TUsersRole;
  status?: EUsersStatus;
  plan?: TUsersPlan;
  page?: number;
};
const getAll = async ({ role, status, plan, page }: TGetAllParams): Promise<TGetAllResult | Error> => {
  try {
    const urlRelativa = `/admins/users?role=${role ?? ''}&status=${status ?? ''}&plan=${plan ?? ''}&page=${page ?? 1}`;
    const { data } = await api.get<TGetAllResult>(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar os registros';
    return new Error(errorMessage);
  }
};

const getAllStaff = async () => {
  try {
    const { data } = await api.get<IUserData[]>('/admins/staff');
    if (data && Array.isArray(data)) {
      return data;
    }
    return new Error('Erro ao listar os registros');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar os registros';
    return new Error(errorMessage);
  }
};

export const UsersService = {
  getAll,
  getAllStaff,
};
