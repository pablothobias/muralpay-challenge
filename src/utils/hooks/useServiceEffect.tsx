import { type DependencyList, useEffect, useState } from 'react';

export type UseServiceType<ResponseType> = {
  loading: boolean;
  error: Error | null;
  data: ResponseType | null;
};
type ServiceFunctionType<RequestType, ResponseType> = (
  params?: RequestType,
) => Promise<ResponseType | null>;

export function useServiceEffect<RequestType, ResponseType>(
  data: RequestType,
  serviceFunction: ServiceFunctionType<RequestType, ResponseType>,
  dependencies: DependencyList = [],
): UseServiceType<ResponseType> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<ResponseType | null>(null);

  useEffect(() => {
    async function execute() {
      const response = await serviceFunction(data);
      setResponse(response);
    }

    try {
      setLoading(true);
      setError(null);
      execute();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [...dependencies]);

  return { loading, error, data: response };
}
