import React from 'react';
import { Dialog } from '../ui/dialog/Dialog';

export type TActionTypePost = 'publish' | 'unpublish' | 'delete';

interface IConfirmationModalProps {
  isOpen: boolean;
  postTitle: string;
  actionType: TActionTypePost | null;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  actionType,
  isOpen,
  onConfirm,
  postTitle,
  onClose,
}) => {
  if (!isOpen) return null;

  const getActionMessage = () => {
    switch (actionType) {
      case 'delete':
        return `Tem certeza que deseja excluir a publicação "${postTitle}"? Esta ação não pode ser desfeita.`;
      case 'publish':
        return `Tem certeza que deseja publicar a publicação "${postTitle}"?`;
      case 'unpublish':
        return `Tem certeza que deseja retirar a publicação "${postTitle}" do ar?`;
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Confirmação</h2>
        <p className="font-light">{getActionMessage()}</p>
        <div className="flex justify-center mt-8">
          <button className="text-black border border-primary px-4 py-2 mr-4" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-primary text-black px-4 py-2" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </Dialog>
  );
};
