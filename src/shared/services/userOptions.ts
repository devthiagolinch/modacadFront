export type TUsersRole = 'administrador' | 'autor' | 'colaborador' | 'editor';
export type TUsersPlan = 'basic' | 'pro' | 'public';

export enum EUsersStatus {
  ACTIVE = 'dd37a07a-dc9c-46c1-ab0b-79707fe97216',
  INACTIVE = '180e645d-c5d5-42c4-8bef-61f225050e3a',
  BANISHED = '0c1cdc83-c8c6-40c2-8412-a5f4d1ce9436',
}

export const roles: Record<TUsersRole, { name: string }> = {
  administrador: {
    name: 'Administrador',
  },
  editor: {
    name: 'Editor',
  },
  autor: {
    name: 'Autor',
  },
  colaborador: {
    name: 'Colaborador',
  },
};
