import { createContext, PropsWithChildren, useContext, useState, useCallback } from 'react';

type LoadingState = boolean | undefined;
type LoadingStates = Record<string, LoadingState>;

type LoadingContextType = {
  isLoading: boolean;
  loadingStates: LoadingStates;
  setLoadingState: (key: string, isLoading: boolean) => void;
  clearLoadingState: (key: string) => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});

  const isLoading = Object.values(loadingStates).some(state => state === true);

  const setLoadingState = useCallback((_key: string, _isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [_key]: _isLoading,
    }));
  }, []);

  const clearLoadingState = useCallback((_key: string) => {
    setLoadingStates(prev => {
      const newState = { ...prev };
      delete newState[_key];
      return newState;
    });
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingStates,
        setLoadingState,
        clearLoadingState,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
