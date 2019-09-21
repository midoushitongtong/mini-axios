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
  transformRequest?: AxiosTransform | AxiosTransform[];
  transformResponse?: AxiosTransform | AxiosTransform[];
  cancelToken?: CancelToken;
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onDownloadProgress?: (e: ProgressEvent) => void;
  onUploadProgress?: (e: ProgressEvent) => void;
  auth?: AxiosBasicCredentials;

  // 用于合并默认配置
  // 字符出索引签名
  [propName: string]: any;
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
  defaults: AxiosRequest;
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

// axios 拦截器
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

// axios 转换数据
export interface AxiosTransform {
  (data: any, headers: any): any;
}

// axios 实例
export interface AxiosStatic extends AxiosInstance {
  create: (config?: AxiosRequest) => AxiosInstance;

  CancelToken: CancelTokenStatic;
  Cancel: CancelStatic;
  isCancel: (value: any) => boolean;
}

// axios 取消请求
export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequest: () => void;
}

export interface CancelHandler {
  (message?: string): void;
}

export interface CancelExecutor {
  (cancel: CancelHandler): void;
}

export interface CancelTokenSource {
  // cancel token 对象
  token: CancelToken;
  // cancel 处理的方法
  cancel: CancelHandler;
}

// 类类型
export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken;

  source: () => CancelTokenSource;
}

export interface Cancel {
  message?: string;
}

export interface CancelStatic {
  new(message?: string): Cancel;
}

// auth
export interface AxiosBasicCredentials {
  username: string;
  password: string;
}
