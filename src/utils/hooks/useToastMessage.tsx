import { useCallback, useEffect, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';
type ToastMessage = string | null | undefined;
type ToastState = {
  type: ToastType;
  message: ToastMessage;
};

type ToastStates = Record<string, ToastState>;

type UseToastOptions = {
  toastConfig?: ToastOptions;
  shouldToast?: boolean;
};

const defaultToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const useToastMessage = (initialStates: ToastStates = {}, options: UseToastOptions = {}) => {
  const { toastConfig = defaultToastConfig, shouldToast = true } = options;
  const [toastStates, setToastStates] = useState<ToastStates>(initialStates);

  useEffect(() => {
    if (!shouldToast) return;

    Object.entries(toastStates).forEach(([key, state]) => {
      if (state?.message) {
        const toastFn = toast[state.type] || toast.info;
        toastFn(state.message, {
          ...defaultToastConfig,
          ...toastConfig,
          toastId: `${state.type}-${key}`,
        });
      }
    });
  }, [toastStates, shouldToast, toastConfig]);

  const showToast = useCallback((key: string, type: ToastType, message: string) => {
    setToastStates((prev) => ({
      ...prev,
      [key]: { type, message: `${message} - [${key}]` },
    }));
  }, []);

  const clearToast = useCallback((key: string) => {
    setToastStates((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  }, []);

  const clearAllToasts = useCallback(() => {
    setToastStates({});
  }, []);

  return {
    toastStates,
    showSuccess: (key: string, message: string) => showToast(key, 'success', message),
    showError: (key: string, message: string) => showToast(key, 'error', message),
    showInfo: (key: string, message: string) => showToast(key, 'info', message),
    showWarning: (key: string, message: string) => showToast(key, 'warning', message),
    clearToast,
    clearAllToasts,
  };
};
