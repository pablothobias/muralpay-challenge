import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from 'axios';

interface ApiClientConfig extends InternalAxiosRequestConfig {
  baseURL: string;
  timeout?: number;
  transferKey?: string;
  apiKey?: string;
}

type ErrorHandler = (error: AxiosError) => Promise<never>;

const DEFAULT_HEADERS = new AxiosHeaders({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
});

const createErrorHandler =
  (context: string): ErrorHandler =>
  async (error: AxiosError) => {
    console.error(`API Error [${context}]:`, {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    throw error;
  };

const createRequestInterceptor = () => {
  return async (reqConfig: InternalAxiosRequestConfig) => {
    const url = reqConfig.url?.toLowerCase() || '';

    const apiKey = url.includes('transfer')
      ? process.env.NEXT_PUBLIC_TRANSFER_KEY
      : process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key not found');
    }

    reqConfig.headers.Authorization = `Bearer ${apiKey}`;
    return reqConfig;
  };
};

export const createApiClient = (config: ApiClientConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 10000,
    headers: new AxiosHeaders({
      ...DEFAULT_HEADERS,
      ...(config.headers || {}),
    }),
  });

  instance.interceptors.request.use(
    createRequestInterceptor(),
    createErrorHandler('request'),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    createErrorHandler('response'),
  );

  return instance;
};

const apiClient = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
  timeout: 10000,
  headers: new AxiosHeaders({ ...DEFAULT_HEADERS }),
});

export default apiClient;
