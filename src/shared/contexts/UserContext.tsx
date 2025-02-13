import { createContext, useContext, useEffect, useState } from 'react';
import { LOCAL_STORAGE_USER_DATA, login as authLogin, logout as authLogout } from '../services/auth';

interface IUserContextData {
  user: IUserLogin | null;
  loading: boolean;
  login: (token: string, userData: IUserLogin) => void;
  logout: () => void;
}

interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IUserLogin {
  subject: string;
  name: string;
  role: string;
}

const UserContext = createContext<IUserContextData | null>(null);

export const useUser = () => {
  return useContext(UserContext) as IUserContextData;
};

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUserLogin | null>(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    isLoading(true);
    const storedUserData = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
    isLoading(false);
  }, []);

  const handleLogin = (token: string, userData: IUserLogin) => {
    authLogin({ token, admin: userData });
    setUser(userData);
  };

  const handleLogout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
