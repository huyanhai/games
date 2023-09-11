import axios from 'axios';
import { useNProgress } from './nprogress';

export const createAxios = (base_url: string) => {
  const request = axios.create({
    baseURL: base_url,
    timeout: 300000
  });

  const setupAxios = () => {
    const { NProgressStart, NProgressDone } = useNProgress();
    request.interceptors.request.use((config: any) => {
      NProgressStart();
      return {
        ...config,
        headers: {
          ...config.headers
        },
        params: {
          ...config.params,
          _t: Date.now()
        }
      };
    });

    request.interceptors.response.use(
      (rawResponse) => {
        NProgressDone();
        const { data } = rawResponse;
        return Promise.resolve(data);
      },
      (rawError) => {
        NProgressDone();
        const { data } = rawError.response || {};
        return Promise.reject(data);
      }
    );
  };

  return { request, setupAxios };
};
