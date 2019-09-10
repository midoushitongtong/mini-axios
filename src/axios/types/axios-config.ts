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
export interface AxiosResponse<T = any> {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequest;
  request: any;
}

// axios 响应 promise 对象
export interface AxiosResponsePromise<T = any> extends Promise<AxiosResponse<T>> {

}

// axios 扩展 api，主要用于简化操作
export interface AxiosExtendAPI {
  interceptors: {
    request: AxiosInterceptorManagerInterface<AxiosRequest>,
    response: AxiosInterceptorManagerInterface<AxiosResponse>
  };
  request: <T = any>(config?: AxiosRequest) => AxiosResponsePromise<T>;
  head: <T = any>(url: string, config?: AxiosRequest) => AxiosResponsePromise<T>;
  options: <T = any>(url: string, config?: AxiosRequest) => AxiosResponsePromise<T>;
  delete: <T = any>(url: string, config?: AxiosRequest) => AxiosResponsePromise<T>;
  get: <T = any>(url: string, params?: any, config?: AxiosRequest) => AxiosResponsePromise<T>;
  post: <T = any>(url: string, data?: any, config?: AxiosRequest) => AxiosResponsePromise<T>;
  put: <T = any>(url: string, data?: any, config?: AxiosRequest) => AxiosResponsePromise<T>;
  patch: <T = any>(url: string, data?: any, config?: AxiosRequest) => AxiosResponsePromise<T>;
}

// axios 接口
export interface AxiosInstance extends AxiosExtendAPI {
  <T = any>(config: AxiosRequest): AxiosResponsePromise<T>;

  <T = any>(url: string, config?: AxiosRequest): AxiosResponsePromise<T>;
}

// axios 错误对象
export interface AxiosError extends Error {
  isError: boolean;
  config: AxiosRequest;
  code?: string | null;
  request?: any;
  response: AxiosResponse;
}

// 拦截器
export interface AxiosInterceptorManagerInterface<T> {
  use: (resolveFn: ResolveFn<T>, rejectFn?: RejectFn) => void;

  eject: (id: number) => void;
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectFn {
  (error: any): any;
}
