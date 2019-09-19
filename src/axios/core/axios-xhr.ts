import { AxiosRequest, AxiosResponse, AxiosResponsePromise } from '../types/axios-config';
import { createError } from '../lib/axios-error';
import { isURLSameOrigin } from '../lib/axios-url';
import cookie from '../lib/axios-cookie';

// axios 发送请求方法
// 不对参数做任何处理，只管发送和响应
const axiosXhr = (config: AxiosRequest): AxiosResponsePromise => {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      timeout,
      responseType,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config;

    const request = new XMLHttpRequest();

    // 设置响应类型
    if (responseType) {
      request.responseType = responseType;
    }

    // 设置请求超时时间
    if (timeout) {
      request.timeout = timeout;
    }

    // 设置跨域 cookie
    if (withCredentials) {
      request.withCredentials = true;
    }

    // 设置请求方式，请求url，是否为异步
    request.open(method.toUpperCase(), url!, true);

    // 设置 csrf 请求头
    // 如果是允许携带跨域cookie 或者 同一域名下 并且 xsrf 参数有值
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName);
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue;
      }
    }

    Object.keys(headers).forEach(key => {
      // 没有 data 不设置 content-type，因为无意义
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key];
      } else {
        request.setRequestHeader(key, headers[key]);
      }
    });

    // 处理网络错误
    request.onerror = () => {
      reject(createError('Request failed with Network Error', config, null, request));
    };

    // 处理请求超时
    request.ontimeout = () => {
      reject(createError(`Request failed with Timeout of ${timeout}ms exceed`, config, 'ECONNABORTED', request));
    };

    // 处理正常响应
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      } else {
        const response: AxiosResponse = {
          data: responseType === 'text'
            ? request.responseText
            : request.response,
          status: request.status,
          statusText: request.statusText,
          headers: request.getAllResponseHeaders(),
          config,
          request
        };
        // 处理状态码
        // 注意: 这里需要延迟 1ms 让其他错误事件先处理[onerror, ontimeout]
        setTimeout(() => {
          if (response.status >= 200 && response.status < 300) {
            // 正常状态码
            resolve(response);
          } else {
            reject(createError(`Request failed with status code ${response.status}`, config, null, request, response));
          }
        }, 1);
      }
    };

    // 发送请求
    // 发送前判断
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        // 请求成功 abort 就无意义了
        request.abort();
        reject(reason);
      });
    }
    request.send(data);
  });
};

export default axiosXhr;
