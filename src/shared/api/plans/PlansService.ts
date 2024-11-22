import { api } from '../../../shared/services/axios';

export interface IPlanData {
  id: number;
  title: string;
  price: string;
  description: string;
  topics: { id: number; value: string }[];
}

export interface IPlanDataNotFormatted {
  id: number;
  price: string;
  title: string;
  topics: string[];
}

const getAll = async (): Promise<IPlanData[] | Error> => {
  try {
    const { data } = await api.get<IPlanDataNotFormatted[]>('/plan/list');
    const plansWithIds = data.map((plan) => ({
      ...plan,
      description: 'Uma bela descrição',
      topics: plan.topics.map((topic, index) => ({ value: topic, id: index + 1 })),
    }));
    return plansWithIds as IPlanData[];
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

// /plan/create
const create = async (plan: Omit<IPlanData, 'id'>) => {
  try {
    const { data } = await api.post('/plan/create', plan);
    return data;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

// /update/:id
const updateById = async (id: number, plan: Omit<IPlanData, 'id'>) => {
  try {
    const { data } = await api.put(`/update/${id}`, plan);
    return data;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

// /view/:id
const getById = async (id: number) => {
  try {
    const { data } = await api.get<IPlanData>(`/view/${id}`);
    const planWithIds = {
      ...data,
      description: 'Uma bela descrição',
      topics: data.topics.map((topic, index) => ({ ...topic, id: index + 1 })),
    };
    return planWithIds;
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
