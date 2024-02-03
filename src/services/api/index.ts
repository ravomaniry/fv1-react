import { AudioApiFactory, ProgressApiFactory, TeachingApiFactory } from '../../clients/fv1';
import { AuthService } from './authService';
import { createCommonAxiosInstance } from './axios';

export interface ApiClient {
  progress: ReturnType<typeof ProgressApiFactory>;
  teaching: ReturnType<typeof TeachingApiFactory>;
  audio: ReturnType<typeof AudioApiFactory>;
}

export function createApiClient(authService: AuthService, baseURL: string): ApiClient {
  const axios = createCommonAxiosInstance({ baseURL });
  axios.interceptors.request.use(async (config) => {
    const token = await authService.getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return {
    progress: ProgressApiFactory(undefined, undefined, axios),
    teaching: TeachingApiFactory(undefined, undefined, axios),
    audio: AudioApiFactory(undefined, undefined, axios),
  };
}
