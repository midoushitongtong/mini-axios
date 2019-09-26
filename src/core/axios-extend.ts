import axiosDispatchRequest from './axios-dispatch-request';
import {
  AxiosRequest,
  AxiosResponsePromise,
  Method,
  AxiosResponse, ResolveFn, RejectFn
} from '../types/axios-config';
import AxiosInterceptorManager from './axios-interceptor-manager';
import mergeConfig from '../lib/axios-merge-config';

interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequest>;
  response: AxiosInterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
  resolveFn: ResolveFn<T | ((config: AxiosRequest) => AxiosResponsePromise)>;
  rejectFn?: RejectFn;
}

// axios 函数扩展类
class AxiosExtend {
  // 默认配置
  defaults: AxiosRequest;

  // 拦截器
  interceptors: Interceptors;

  constructor(axiosDefaultConfig: AxiosRequest) {
    // 初始化
    this.defaults = axiosDefaultConfig;
    this.interceptors = {
      request: new AxiosInterceptorManager<AxiosRequest>(),
      response: new AxiosInterceptorManager<AxiosResponse>()
    };
  }

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

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain<any>[] = [{
      resolveFn: axiosDispatchRequest,
      rejectFn: undefined
    }];

    // 获取拦截器，请求的先执行
    this.interceptors.request.forEachInterceptor(interceptor => {
      chain.unshift(interceptor);
    });

    // 获取拦截器，响应的后执行
    this.interceptors.response.forEachInterceptor(interceptor => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolveFn, rejectFn } = chain.shift()!;
      promise = promise.then(resolveFn, rejectFn);
    }

    // promise 链式调用机制
    return promise;
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
