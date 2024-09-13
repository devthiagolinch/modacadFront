import { Status, Type, Visibility } from '../../services/postOptions';
import { api } from '../../services/axios';

export interface IPostData {
  id: string;
  title: string;
  description: string;
  type: Type;
  content: string;
  admin: string;
  tags: string[] | string | null;
  subjects: string[] | string | null;
  status: Status;
  visibility: Visibility;
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

const create = async (post: Omit<IPostData, 'id' | 'admin'>): Promise<IPostData | Error> => {
  try {
    const { data } = await api.post<IPostData>('/post', post);

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar o registro';
    return new Error(errorMessage);
  }
};

const getById = async (postId: string): Promise<IPostData | Error> => {
  try {
    const { data } = await api.get<IPostData>(`/admins/texto/${postId}`);

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao buscar o registro';
    return new Error(errorMessage);
  }
};

const updateById = async (postId: string, post: Omit<IPostData, 'id' | 'admin'>): Promise<void | Error> => {
  try {
    await api.put<IPostData>(`/post/${postId}`, post);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar o registro';
    return new Error(errorMessage);
  }
};

export const PostsService = {
  getAll,
  create,
  getById,
  updateById,
};
