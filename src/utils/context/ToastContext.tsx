import { createContext, PropsWithChildren, useContext } from 'react';

import { useToastMessage } from '@/utils/hooks/useToastMessage';

type ToastContextType = {
  showSuccess: (_key: string, _message: string) => void;
  showError: (_key: string, _message: string) => void;
  showInfo: (_key: string, _message: string) => void;
  showWarning: (_key: string, _message: string) => void;
  clearToast: (_key: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const toast = useToastMessage();

  return (
    <ToastContext.Provider
      value={{
        showSuccess: toast.showSuccess,
        showError: toast.showError,
        showInfo: toast.showInfo,
        showWarning: toast.showWarning,
        clearToast: toast.clearToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
