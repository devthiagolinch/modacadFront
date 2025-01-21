import { api } from '../../../shared/services/axios';

export interface IPlanData {
  id: string;
  title: string;
  description: string;
  price: number;
  frequency: number;
  topics: string[];
  sort: number;
  mp_url: string;
}

export interface IPlanDataCreate {
  price: number;
  title: string;
  description: string;
  topics: string[];
  sort: number;
  frequency: number;
  frequency_type: string;
  currency_id: 'BRL';
  isRecurrence: true;
}

const getAll = async (): Promise<IPlanData[] | Error> => {
  try {
    const { data } = await api.get<IPlanData[]>('/plan/list');
    return data ?? new Error('Erro ao buscar os planos');
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const create = async (plan: IPlanDataCreate): Promise<void | Error> => {
  try {
    await api.post('/plan', plan);
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const updateById = async (id: string, plan: IPlanDataCreate): Promise<void | Error> => {
  try {
    await api.patch(`/plan/update/${id}`, plan);
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const getById = async (id: string) => {
  try {
    const { data } = await api.get<IPlanData>(`/view/${id}`);
    return data ?? new Error('Erro ao buscar o plano');
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

export const PlansService = {
  getAll,
  create,
  updateById,
  getById,
};
