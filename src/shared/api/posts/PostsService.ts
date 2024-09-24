import { Status, PostType, Visibility } from '../../services/postOptions';
import { api } from '../../services/axios';
import { IUserData } from '../users/UserServices';

export interface IPostData {
  admins: IUserData;
  content: string;
  created_at: Date;
  description: string;
  feature_image: string | null;
  id: string;
  published_at: Date;
  status: Status;
  tags: string[];
  subjects: string[];
  title: string;
  type: PostType;
  visibility: Visibility;
  updated_at: Date;
}

export interface IPostSave
  extends Omit<IPostData, 'id' | 'admins' | 'created_at' | 'published_at' | 'updated_at' | 'feature_image'> {}

const getAll = async (type: 'pilula' | 'texto', statusId?: string, authorId?: string): Promise<IPostData[] | Error> => {
  try {
    const urlRelativa = `/post?type=${type ?? ''}&statusId=${statusId ?? ''}&authorId=${authorId ?? ''}`;
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

const create = async (post: IPostSave): Promise<IPostData | Error> => {
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
    const { data } = await api.get<IPostData>(`/post/${postId}`);

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao buscar o registro';
    return new Error(errorMessage);
  }
};

const updateById = async (postId: string, post: IPostSave): Promise<void | Error> => {
  try {
    await api.put<IPostData>(`/post/${postId}`, post);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar o registro';
    return new Error(errorMessage);
  }
};

const uploadFeatureImage = async (postId: string, file: File): Promise<string | Error> => {
  try {
    const formData = new FormData();
    formData.append('images', file);

    const urlRelativa = `/post/images/feature-image/${postId}`;
    const { data } = await api.post<string>(urlRelativa, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data) {
      return data;
    }
    return new Error('Erro ao fazer upload da imagem');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao fazer upload da imagem';
    return new Error(errorMessage);
  }
};

const uploadImage = async (file: File): Promise<string | Error> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await api.post<string>('/post/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data) {
      return data;
    }
    return new Error('Erro ao fazer upload da imagem');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao fazer upload da imagem';
    return new Error(errorMessage);
  }
};

export const PostsService = {
  getAll,
  create,
  getById,
  updateById,
  uploadFeatureImage,
  uploadImage,
};
