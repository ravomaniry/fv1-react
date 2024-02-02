import { AxiosResponse } from 'axios';

export type AxiosRequest<T> = () => Promise<AxiosResponse<T>>;
