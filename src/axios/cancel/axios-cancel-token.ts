import { CancelExecutor, CancelHandler, CancelTokenSource } from '../types/axios-config';

import AxiosCancel from './axios-cancel';

interface ResolvePromise {
  (reason: AxiosCancel): void;
}

class AxiosCancelToken {
  promise: Promise<AxiosCancel>;
  reason?: AxiosCancel;

  constructor(cancelExecutor: CancelExecutor) {
    let resolvePromise: ResolvePromise;
    this.promise = new Promise<AxiosCancel>(resolve => {
      // 保存 resolve 函数
      resolvePromise = resolve;
    });
    cancelExecutor((message) => {
      if (this.reason) {
        return;
      }
      this.reason = new AxiosCancel(message);
      resolvePromise(this.reason!);
    });
  }

  // 创建取消请求对象
  static source = (): CancelTokenSource => {
    let cancelHandler!: CancelHandler;
    // 实例化取消对象
    const cancelToken = new AxiosCancelToken((c: CancelHandler) => {
      cancelHandler = c;
    });
    return {
      token: cancelToken,
      cancel: cancelHandler
    };
  };

  throwIfRequest = () => {
    if (this.reason) {
      throw this.reason;
    }
  };
}

export default AxiosCancelToken;
