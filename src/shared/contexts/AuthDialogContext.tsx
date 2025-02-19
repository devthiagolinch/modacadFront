import { createContext, useContext, useState } from 'react';

type TType = 'login' | 'cadastro';

interface IAuthDialogContextType {
  isOpen: boolean;
  type: 'login' | 'cadastro';
  openDialog: (type: TType) => void;
  closeDialog: () => void;
}

const AuthDialogContext = createContext<IAuthDialogContextType | undefined>(undefined);

interface IAuthDialogProviderProps {
  children?: React.ReactNode;
}

export const AuthDialogProvider: React.FC<IAuthDialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<TType>('login');

  const openDialog = (dialogType: TType) => {
    setType(dialogType);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <AuthDialogContext.Provider value={{ isOpen, type, openDialog, closeDialog }}>
      {children}
    </AuthDialogContext.Provider>
  );
};

export const useAuthDialog = () => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error('useAuthDialog must be used within an AuthDialogProvider');
  }
  return context;
};
