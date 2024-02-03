import axios, { CreateAxiosDefaults } from 'axios';
import axiosRetry, { exponentialDelay } from 'axios-retry';

export function createCommonAxiosInstance(config?: CreateAxiosDefaults<unknown>) {
  const instance = axios.create(config);
  axiosRetry(instance, {
    retryDelay: exponentialDelay,
    retryCondition: (error) => Boolean(error.code) && error.status! >= 410,
  });
  return instance;
}
