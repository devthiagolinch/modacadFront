import React, { useEffect } from 'react';

interface IDialogProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Dialog: React.FC<IDialogProps> = ({ children, isOpen, onClose }) => {
  const handleCloseDialog = () => {
    if (onClose) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleCloseDialog}
    >
      <div
        className="bg-[#f1ece8] p-8 w-[80%] max-w-[500px] max-h-[90vh] overflow-y-auto justify-self-center items-center shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
