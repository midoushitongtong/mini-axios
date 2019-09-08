export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH';

// axios 请求参数对象
export interface AxiosRequest {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
}

// axios 响应参数对象
export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequest;
  request: any;
}

// axios 响应 promise 对象
export interface AxiosResponsePromise extends Promise<AxiosResponse> {

}

// axios 错误对象
export interface AxiosError extends Error {
  isError: boolean;
  config: AxiosRequest;
  code?: string | null;
  request?: any;
  response: AxiosResponse;
}

// axios 扩展 api，主要用于简化操作
export interface AxiosExtendAPI {
  request: (config?: AxiosRequest) => AxiosResponsePromise;
  head: (url: string, config?: AxiosRequest) => AxiosResponsePromise;
  options: (url: string, config?: AxiosRequest) => AxiosResponsePromise;
  delete: (url: string, config?: AxiosRequest) => AxiosResponsePromise;
  get: (url: string, params?: any, config?: AxiosRequest) => AxiosResponsePromise;
  post: (url: string, data?: any, config?: AxiosRequest) => AxiosResponsePromise;
  put: (url: string, data?: any, config?: AxiosRequest) => AxiosResponsePromise;
  patch: (url: string, data?: any, config?: AxiosRequest) => AxiosResponsePromise;
}

// axios 接口
export interface AxiosInstance extends AxiosExtendAPI {
  (config: AxiosRequest): AxiosResponsePromise;

  (url: string, config?: AxiosRequest): AxiosResponsePromise;
}
