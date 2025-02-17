import { useState, useCallback, type DependencyList } from 'react';

export interface UseServiceType<RequestType, ResponseType> {
  error: Error | null;
  loading: boolean;
  execute: (data: RequestType) => Promise<ResponseType>;
}

export function useServices<RequestType, ResponseType>(
  callback: (data: RequestType) => Promise<ResponseType>,
  dependencies: DependencyList = [],
): UseServiceType<RequestType, ResponseType | null> {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (requestData: RequestType): Promise<ResponseType | null> => {
      setError(null);
      setLoading(true);

      try {
        return await callback(requestData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Unknown error occurred'),
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...(dependencies || [])],
  );

  return { error, loading, execute };
}
