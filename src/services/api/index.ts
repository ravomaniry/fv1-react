import { AxiosPromise } from 'axios';
import {
  AudioApiFactory,
  Configuration,
  NewTeachingRespDto,
  ProgressApiFactory,
  TeachingApiFactory,
} from '../../clients/fv1';
import { AuthService } from './authService';
import { createCommonAxiosInstance } from './axios';

export interface ApiClient {
  progress: ReturnType<typeof ProgressApiFactory>;
  teaching: ReturnType<typeof TeachingApiFactory>;
  audio: ReturnType<typeof AudioApiFactory>;
  getSampleTeaching: () => AxiosPromise<NewTeachingRespDto[]>;
}

export function createApiClient(authService: AuthService, baseURL: string): ApiClient {
  const axios = createCommonAxiosInstance({ baseURL });
  const config = new Configuration({
    basePath: baseURL,
    accessToken: () => authService.getAccessToken(),
  });
  const anonymousConfig = new Configuration({ basePath: baseURL });
  return {
    progress: ProgressApiFactory(config, undefined, axios),
    teaching: TeachingApiFactory(config, undefined, axios),
    audio: AudioApiFactory(config, undefined, axios),
    getSampleTeaching: () => TeachingApiFactory(anonymousConfig, undefined, axios).getSample(),
  };
}
