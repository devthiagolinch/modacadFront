const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'ACCESS_TOKEN';
const LOCAL_STORAGE_USER_DATA = 'USER_DATA';

export interface IAdminData {
  id: string;
  name: string;
  role: string;
}
interface ILoginProps {
  token: string;
  admin: IAdminData;
}

const login = ({ token, admin }: ILoginProps) => {
  localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(token));

  localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(admin));
};

const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
};

export { login, logout, LOCAL_STORAGE_KEY__ACCESS_TOKEN, LOCAL_STORAGE_USER_DATA };
