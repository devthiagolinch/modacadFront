export type TPostsStatus = 'published' | 'draft' | 'pending';
export type TPostsVisibility = 'public' | 'basic' | 'pro';
export type TPostsType = 'pilula' | 'texto';

// Configuração de Status com nome, cor de fundo e cor do texto
export const statuses: Record<TPostsStatus, { name: string; bgColor: string; textColor: string }> = {
  published: {
    name: 'Publicado',
    bgColor: 'bg-gray-300',
    textColor: 'text-black',
  },
  pending: {
    name: 'Pendente',
    bgColor: 'bg-gray-300',
    textColor: 'text-black',
  },
  draft: {
    name: 'Rascunho',
    bgColor: 'bg-gray-300',
    textColor: 'text-red-500',
  },
};

// Configuração de Visibility com nome, cor de fundo e cor do texto
export const visibilities: Record<TPostsVisibility, { name: string; bgColor: string; textColor: string }> = {
  public: {
    name: 'Público',
    bgColor: 'bg-gray-950',
    textColor: 'text-white',
  },
  basic: {
    name: 'Básico',
    bgColor: 'bg-gray-950',
    textColor: 'text-white',
  },
  pro: {
    name: 'Pro',
    bgColor: 'bg-gray-950',
    textColor: 'text-white',
  },
};

export const types: Record<TPostsType, string> = {
  pilula: 'Pílula',
  texto: 'Texto',
};
