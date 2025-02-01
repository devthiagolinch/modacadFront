import { createContext, useContext, useState } from 'react';

interface IAuthDialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const AuthDialogContext = createContext<IAuthDialogContextType | undefined>(undefined);

interface IAuthDialogProviderProps {
  children?: React.ReactNode;
}

export const AuthDialogProvider: React.FC<IAuthDialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <AuthDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>{children}</AuthDialogContext.Provider>
  );
};

export const useAuthDialog = () => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error('useAuthDialog must be used within an AuthDialogProvider');
  }
  return context;
};
