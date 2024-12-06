import { api } from '../../../shared/services/axios';
import { TPostsVisibility } from '../../../../src/shared/services/postOptions';

export interface ITagData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  feature_image: string | null;
  parent_id: string | null;
  visibility: TPostsVisibility;
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  code_injection_head: string | null;
  code_injection_foot: string | null;
  cannonical_url: string | null;
  accent_color: string | null;
  created_at: string;
  updated_at: string;
}

const getAll = async () => {
  try {
    const { data } = await api.get<ITagData[]>('/tags');

    if (Array.isArray(data)) {
      return data;
    }

    return new Error('Erro ao buscar os registros');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar os registros';
    return new Error(errorMessage);
  }
};

const create = async (body: Partial<ITagData>) => {
  try {
    const { data } = await api.post<ITagData>('/tags', body);
    if (data) return data;
    return new Error('Erro ao criar o registro');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar o registro';
    return new Error(errorMessage);
  }
};

const updateById = async (id: string, body: Partial<ITagData>): Promise<void | Error> => {
  try {
    await api.patch<ITagData>(`/tags/${id}`, body);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar o registro';
    return new Error(errorMessage);
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await api.delete<ITagData>(`/tags/${id}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao deletar o registro';
    return new Error(errorMessage);
  }
};

export const TagsService = {
  getAll,
  create,
  updateById,
  deleteById,
};
