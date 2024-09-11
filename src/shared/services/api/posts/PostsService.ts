import { api } from '../lib/axios';

export interface IPostData {
  id: string;
  title: string;
  description: string;
  type: string;
  content: string;
  admin: string;
  tags: string[];
  subjects: string[];
  status: string;
  visibility: string;
}

const getAll = async (type: 'pilula' | 'texto', statusId?: string, authorId?: string): Promise<IPostData[] | Error> => {
  try {
    const urlRelativa = `/post?type=${type}&statusId=${statusId}&authorId=${authorId}`;
    const { data } = await api.get<IPostData[]>(urlRelativa);

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

export const PostsService = {
  getAll,
};
