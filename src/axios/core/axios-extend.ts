import axiosDispatchRequest from './axios-dispatch-request';
import { AxiosRequest, AxiosResponsePromise, Method, AxiosExtendAPI } from '../types/axios-config';

// axios 函数扩展类
class AxiosExtend implements AxiosExtendAPI {
  request = (url: any, config?: any): AxiosResponsePromise => {
    // axios 核心函数的两种参数处理
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }
    return axiosDispatchRequest(config);
  };

  head = (url: string, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithoutData('head', url, config);
  };

  options = (url: string, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithoutData('options', url, config);
  };

  delete = (url: string, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithoutData('delete', url, config);
  };

  get = (url: string, params?: any, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithoutParams('get', url, params, config);
  };

  post = (url: string, data?: any, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithData('post', url, data, config);
  };

  put = (url: string, data?: any, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithData('put', url, data, config);
  };

  patch = (url: string, data?: any, config?: AxiosRequest): AxiosResponsePromise => {
    return this._requestWithData('patch', url, data, config);
  };

  _requestWithoutData = (method: Method, url: string, config?: AxiosRequest): AxiosResponsePromise => {
    console.log(config);
    return this.request(Object.assign(config || {}, {
      method,
      url
    }));
  };

  _requestWithoutParams = (method: Method, url: string, params?: any, config?: AxiosRequest): AxiosResponsePromise => {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      params
    }));
  };

  _requestWithData = (method: Method, url: string, data?: any, config?: AxiosRequest): AxiosResponsePromise => {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }));
  };
}

export default AxiosExtend;
