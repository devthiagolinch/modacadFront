import { api } from '../../services/axios';

export interface ISubjectData {
  id: string;
  name: string;
  sort: number;
}

const getAll = async (): Promise<ISubjectData[] | Error> => {
  try {
    const urlRelativa = `/subjects`;
    const { data } = await api.get<ISubjectData[]>(urlRelativa);

    if (Array.isArray(data)) {
      return data;
    } else {
      return new Error('Erro ao listar os registros');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar os registros';
    return new Error(errorMessage);
  }
};

const create = async (post: Omit<ISubjectData, 'id'>): Promise<ISubjectData | Error> => {
  try {
    const { data } = await api.post<ISubjectData>('/subjects', post);

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar o registro';
    return new Error(errorMessage);
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await api.delete(`/subjects/${id}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao deletar o registro';
    return new Error(errorMessage);
  }
};

const updateById = async (id: string, post: Omit<ISubjectData, 'id'>): Promise<void | Error> => {
  try {
    await api.put<ISubjectData>(`/subjects/${id}`, post);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao editar o registro';
    return new Error(errorMessage);
  }
};

export const SubjectsService = {
  getAll,
  create,
  deleteById,
  updateById,
};
