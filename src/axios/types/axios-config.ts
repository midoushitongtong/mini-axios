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
  url: string;
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
