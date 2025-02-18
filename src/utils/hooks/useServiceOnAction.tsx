import { type DependencyList, useCallback, useState } from 'react';

export type UseServiceType<RequestType, ResponseType> = {
  execute: (params: RequestType) => Promise<ResponseType | undefined>;
  loading: boolean;
  error: Error | null;
};

type ServiceFunctionType<RequestType, ResponseType> = (
  params: RequestType,
) => Promise<ResponseType>;

export function useServiceOnAction<RequestType, ResponseType>(
  serviceFunction: ServiceFunctionType<RequestType, ResponseType>,
  dependencies: DependencyList = [],
): UseServiceType<RequestType, ResponseType> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params: RequestType): Promise<ResponseType | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const response = await serviceFunction(params);
        return response;
      } catch (err) {
        const errorInstance = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(errorInstance);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [serviceFunction, ...dependencies],
  );

  return { execute, loading, error };
}
