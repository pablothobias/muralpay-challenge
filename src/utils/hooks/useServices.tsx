import { useState, useCallback, type DependencyList } from 'react';

export interface UseServiceType<RequestType, ResponseType> {
  data: ResponseType | null;
  error: Error | null;
  loading: boolean;
  execute: (data: RequestType) => Promise<void>;
}

export function useServices<RequestType, ResponseType>(
  callback: (data: RequestType) => Promise<ResponseType>,
  dependencies: DependencyList = [],
): UseServiceType<RequestType, ResponseType> {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (requestData: RequestType): Promise<void> => {
      if (!callback) throw new Error('Callback function is required');

      setLoading(true);
      setError(null);

      try {
        const response = await callback(requestData);
        setData(response);
      } catch (err) {
        const errorInstance =
          err instanceof Error ? err : new Error('Unknown error occurred');
        setError(errorInstance);
        setData(null);
        throw errorInstance;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, ...(dependencies || [])],
  );

  return { data, error, loading, execute };
}
