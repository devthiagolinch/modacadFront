import { api } from '../../../shared/services/axios';

export interface IPlanData {
  id: string;
  title: string;
  description: string;
  price: string;
  frequency: number;
  topics: { id: number; value: string }[];
  sort: number;
  mp_url: string;
}

export interface IPlanDataReceived extends Omit<IPlanData, 'topics'> {
  topics: string[];
}

export interface IPlanDataCreate {
  price: string;
  title: string;
  description: string;
  topics: { id: number; value: string }[];
  sort: number;
  frequency: number;
  frequency_type: string;
  currency_id: string;
  isRecurrence: boolean;
}

const getAll = async (): Promise<IPlanData[] | Error> => {
  try {
    const { data } = await api.get<IPlanDataReceived[]>('/plan/list');

    // Antes de retornar, preciso transformar o elemento 'topics' de string[] para { id: number, value: string }[]
    const dataWithTopics = data.map((plan) => ({
      ...plan,
      topics: plan.topics.map((topic, index) => ({ id: index, value: topic })),
    }));

    return dataWithTopics ?? new Error('Erro ao buscar os planos');
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const create = async (plan: IPlanDataCreate): Promise<void | Error> => {
  try {
    // Antes de salvar, preciso transformar o elemento 'topics' de { id: number, value: string }[] para string[]
    const newPlan = { ...plan, topics: plan.topics.map((topic) => topic.value) };

    await api.post('/plan', newPlan);
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const updateById = async (id: string, plan: IPlanDataCreate): Promise<void | Error> => {
  try {
    // Antes de salvar, preciso transformar o elemento 'topics' de { id: number, value: string }[] para string[]
    const newPlan = { ...plan, topics: plan.topics.map((topic) => topic.value) };
    console.log(newPlan);
    await api.patch(`/plan/update/${id}`, newPlan);
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const getById = async (id: string) => {
  try {
    const { data } = await api.get<IPlanDataReceived>(`/view/${id}`);

    // Antes de retornar, preciso transformar o elemento 'topics' de string[] para { id: number, value: string }[]
    const dataWithTopics = {
      ...data,
      topics: data.topics.map((topic, index) => ({ id: index, value: topic })),
    };

    return dataWithTopics ?? new Error('Erro ao buscar o plano');
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await api.delete(`/plan/delete/${id}`);
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

const generatePaymentLink = async (planId: string) => {
  try {
    const { data } = await api.post<{ url: string }>('/payment/create', { plan_id: planId });

    if (data.url) {
      return data.url;
    }

    return new Error('Erro ao gerar o link de pagamento');
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
  deleteById,
  generatePaymentLink,
};
