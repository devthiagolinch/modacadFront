import { TPostsStatus, TPostsType, TPostsVisibility } from '../../services/postOptions';
import { api } from '../../services/axios';
import { IUserData } from '../users/UserServices';
import { ITagData } from '../tags/TagsService';
import { ISubjectData } from '../subjects/SubjectsService';

export interface IPostData {
  id: string;
  post_id: string;
  title: string;
  description: string;
  feature_image: string | null;
  type: TPostsType;
  content: string;
  status: TPostsStatus;
  images: string[] | null; // TODO: Verificar se é necessário
  visibility: TPostsVisibility;
  created_at: string;
  updated_at: string;
  published_at: Date | null;
  meta_id: number | null; // TODO: Verificar a tipagem
  admins: IUserData[];
  editors: IUserData[],
  curadors: IUserData[],
  tags: ITagData[];
  subjects: ISubjectData[];
  meta: IMetaData | null;
  canonicalUrl: string;
}

export interface IPostDataRequest {
  title: string;
  description: string;
  feature_image: string | null;
  type: TPostsType;
  content: string;
  status: TPostsStatus;
  images: string | null;
  published_at: Date | null;
  visibility: TPostsVisibility;
  admins: IUserData[];
  editors: IUserData[],
  curadors: IUserData[],
  tags: ITagData[];
  subjects: ISubjectData[];
  og_image: string | null;
  og_title: string;
  og_description: string;
  twitter_image: string;
  twitter_title: string;
  twitter_description: string;
  meta_title: string;
  meta_description: string;
  email_subject: string;
  frontmatter: string;
  feature_image_alt: string;
  feature_image_caption: string;
  email_only: string;
  canonicalUrl: string;
}

interface IMetaData {
  id: string;
  post_id: string;
  og_image: string;
  og_title: string;
  og_description: string;
  twitter_image: string;
  twitter_title: string;
  twitter_description: string;
  meta_title: string;
  meta_description: string;
  email_subject: string;
  frontmatter: string;
  feature_image_alt: string | null;
  feature_image_caption: string | null;
  email_only: string;
}

interface IPostResponse {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  posts: IPostData[];
}

const getAll = async (
  type: TPostsType,
  statusId?: string,
  authorId?: string,
  limit = 20,
  page = 1
): Promise<IPostResponse | Error> => {
  try {
    const urlRelativa = `/post?type=${type ?? ''}&statusId=${statusId ?? ''}&authorId=${authorId ?? ''}&limit=${limit}&page=${page}`;
    const { data } = await api.get<IPostResponse>(urlRelativa);

    if (data) {
      return data;
    } else {
      return new Error('Erro ao listar os registros');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar os registros';
    return new Error(errorMessage);
  }
};

const create = async (post: IPostDataRequest): Promise<IPostData | Error> => {
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

const updateById = async (postId: string, post: IPostDataRequest): Promise<void | Error> => {
  try {
    await api.put<IPostData>(`/post/${postId}`, post);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar o registro';
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
  uploadImage,
};
