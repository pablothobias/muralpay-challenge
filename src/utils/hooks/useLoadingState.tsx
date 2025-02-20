import { useEffect, useState } from 'react';

type LoadingState = boolean | undefined;
type LoadingStates = Record<string, LoadingState | (() => LoadingState)>;
type LoadingStateSubscriber = (state: boolean) => void;
type LoadingStateSubscription = {
  key: string;
  callback: LoadingStateSubscriber;
};

export const useLoadingState = (states: LoadingStates) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [subscriptions] = useState<Set<LoadingStateSubscription>>(new Set());

  useEffect(() => {
    const initialStates = Object.entries(states).reduce<Record<string, boolean>>(
      (acc, [key, value]) => {
        const resolvedValue = typeof value === 'function' ? value() : value;
        acc[key] = resolvedValue === true;
        return acc;
      },
      {},
    );
    setLoadingStates(initialStates);

    Object.entries(states).forEach(([key, value]) => {
      if (typeof value === 'function') {
        const subscription: LoadingStateSubscription = {
          key,
          callback: (newState) => {
            setLoadingStates((prev) => ({
              ...prev,
              [key]: newState,
            }));
          },
        };
        subscriptions.add(subscription);
      }
    });

    return () => {
      subscriptions.clear();
    };
  }, [states, subscriptions]);

  const isLoading = Object.values(loadingStates).some((state) => state === true);

  return {
    isLoading,
    loadingStates,
  };
};
