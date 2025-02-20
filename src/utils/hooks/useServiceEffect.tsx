import { type DependencyList, useEffect, useState } from 'react';

export type UseServiceType<ResponseType> = {
  loading: boolean;
  error: Error | null;
  data: ResponseType | null;
};
type ServiceFunctionType<RequestType, ResponseType> = (
  params?: RequestType,
  signal?: AbortSignal,
) => Promise<ResponseType | null>;

export function useServiceEffect<RequestType, ResponseType>(
  data: RequestType,
  serviceFunction: ServiceFunctionType<RequestType, ResponseType>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any,
  dependencies: DependencyList = [],
): UseServiceType<ResponseType> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    async function execute() {
      const response = await serviceFunction(data, signal);
      setResponse(response);
      callback(response);
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
