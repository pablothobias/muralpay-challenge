import { useState, useCallback, useEffect, DependencyList } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';

export interface AxiosRequestArgs<RequestType> {
  url: string;
  method?: Method;
  data?: RequestType;
  params?: Record<string, unknown>;
  config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>;
}

export interface UseAxiosOptions<RequestType>
  extends AxiosRequestArgs<RequestType> {
  autoExecute?: boolean;
}

export interface UseAxiosResult<ResponseType> {
  data: ResponseType | null;
  error: Error | null;
  loading: boolean;
  execute: <T = unknown>(
    args: AxiosRequestArgs<T>,
  ) => Promise<ResponseType | void>;
}

export function useAxios<ResponseType = unknown, RequestType = unknown>(
  options?: UseAxiosOptions<RequestType>,
  dependencies?: DependencyList,
): UseAxiosResult<ResponseType> {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async <T = unknown,>(
      args: AxiosRequestArgs<T>,
    ): Promise<ResponseType | void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.request<ResponseType>({
          url: args.url,
          method: args.method ?? 'GET',
          data: args.data,
          params: args.params,
          ...args.config,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!options) return;

    const { autoExecute = false, ...axiosOptions } = options;

    if (autoExecute) {
      execute(axiosOptions as AxiosRequestArgs<RequestType>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(dependencies || [])]);

  return { data, error, loading, execute };
}
