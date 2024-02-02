import axios from 'axios';
import { AuthApiFactory } from '../../clients/fv1';
import axiosRetry, { exponentialDelay } from 'axios-retry';

const instance = axios.create();
axiosRetry(instance, {
  retryDelay: exponentialDelay,
  retryCondition: (error) => Boolean(error.code) && error.status! >= 410,
});

export const authClient = AuthApiFactory();
export type AuthClient = typeof authClient;
