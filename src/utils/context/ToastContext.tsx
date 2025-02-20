import { createContext, PropsWithChildren, useContext } from 'react';
import { useToastMessage } from '@/utils/hooks/useToastMessage';

type ToastContextType = {
  showSuccess: (key: string, message: string) => void;
  showError: (key: string, message: string) => void;
  showInfo: (key: string, message: string) => void;
  showWarning: (key: string, message: string) => void;
  clearToast: (key: string) => void;
  clearAllToasts: () => void;
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
        clearAllToasts: toast.clearAllToasts,
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
