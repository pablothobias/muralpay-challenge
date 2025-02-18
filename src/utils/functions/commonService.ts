import { AxiosRequestConfig } from 'axios';

export type CommonServiceType = {
  handleSignal: <RequestType>(params: RequestType, signal: AbortSignal) => AxiosRequestConfig;
};

const CommonService: CommonServiceType = {
  handleSignal: <RequestType>(params: RequestType, signal: AbortSignal) => {
    const config: AxiosRequestConfig = {
      params,
      ...(signal && { signal }),
    };

    return config;
  },
};

export default CommonService;
