import { ResolveFn, RejectFn } from '../types/axios-config';

// 拦截器
interface Interceptor<T> {
  resolveFn: ResolveFn<T>;
  rejectFn?: RejectFn;
}

// 拦截器管理类
class AxiosInterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>;

  constructor() {
    this.interceptors = [];
  }

  use = (resolveFn: ResolveFn<T>, rejectFn: RejectFn): number => {
    this.interceptors.push({
      resolveFn,
      rejectFn
    });
    return this.interceptors.length - 1;
  };

  eject = (id: number): void => {
    if (this.interceptors[id]) {
      // 删除对应的拦截器
      this.interceptors[id] = null;
    }
  };

  forEachInterceptor = (fn: (interceptor: Interceptor<T>) => void): void => {
    // 遍历拦截器
    this.interceptors.forEach(interceptor => {
      if (interceptor != null) {
        // 将每个拦截器执行一遍
        fn(interceptor);
      }
    });
  };
}

export default AxiosInterceptorManager;
