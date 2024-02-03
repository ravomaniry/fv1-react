import { AuthApiFactory } from '../../clients/fv1';
import { createCommonAxiosInstance } from './axios';

export function createAuthClient(baseURL: string) {
  const axios = createCommonAxiosInstance({ baseURL });
  return AuthApiFactory(undefined, undefined, axios);
}

export type AuthClient = ReturnType<typeof AuthApiFactory>;
