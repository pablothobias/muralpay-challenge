import { useCallback, useState } from 'react';

export type UseServiceType<RequestType, ResponseType> = {
  execute: (params: RequestType) => Promise<ResponseType | undefined>;
  loading: boolean;
  error: Error | null;
};

type ServiceFunctionType<RequestType, ResponseType> = (
  params: RequestType,
  signal?: AbortSignal,
) => Promise<ResponseType | undefined>;

export function useServiceOnAction<RequestType, ResponseType>(
  serviceFunction: ServiceFunctionType<RequestType, ResponseType>,
): UseServiceType<RequestType, ResponseType> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params: RequestType): Promise<ResponseType | undefined> => {
      const controller = new AbortController();
      const { signal } = controller;

      try {
        setLoading(true);
        setError(null);
        const response = await serviceFunction(params, signal);
        return response;
      } catch (err) {
        if (signal.aborted) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [serviceFunction],
  );

  return { execute, loading, error };
}
