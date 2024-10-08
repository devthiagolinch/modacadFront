export type TPostsStatus = 'published' | 'draft' | 'deleted' | 'pending';
export type TPostsVisibility = 'public' | 'basic' | 'pro';
export type TPostsType = 'pilula' | 'texto';

// Configuração de Status com nome, cor de fundo e cor do texto
export const statuses: Record<TPostsStatus, { name: string; bgColor: string; textColor: string }> = {
  published: {
    name: 'Publicado',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
  },
  draft: {
    name: 'Rascunho',
    bgColor: 'bg-yellow-500',
    textColor: 'text-black',
  },
  deleted: {
    name: 'Deletado',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
  },
  pending: {
    name: 'Pendente',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
  },
};

// Configuração de Visibility com nome, cor de fundo e cor do texto
export const visibilities: Record<TPostsVisibility, { name: string; bgColor: string; textColor: string }> = {
  public: {
    name: 'Público',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
  basic: {
    name: 'Básico',
    bgColor: 'bg-gray-500',
    textColor: 'text-white',
  },
  pro: {
    name: 'Pro',
    bgColor: 'bg-purple-500',
    textColor: 'text-white',
  },
};

export const types: Record<TPostsType, string> = {
  pilula: 'Pílula',
  texto: 'Texto',
};
