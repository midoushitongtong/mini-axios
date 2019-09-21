import { AxiosRequest, AxiosResponse, AxiosResponsePromise } from '../types/axios-config';
import { createError } from '../lib/axios-error';
import { isURLSameOrigin } from '../lib/axios-url';
import cookie from '../lib/axios-cookie';
import { isFormData } from '../util/type-check';

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
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config;

    const request = new XMLHttpRequest();

    // 配置请求参数
    const configRequest = (): void => {
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
    };

    // 添加事件处理
    const addEventHandler = (): void => {
      // 处理网络错误
      request.onerror = () => {
        reject(createError('Request failed with Network Error', config, null, request));
      };

      // 处理请求超时
      request.ontimeout = () => {
        reject(createError(`Request failed with Timeout of ${timeout}ms exceed`, config, 'ECONNABORTED', request));
      };

      // 处理上传事件
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }

      // 处理下载事件
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }

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
            // 如果没有 validateStatus 函数 或者通过 validateStatus 的验证
            if (!validateStatus || validateStatus(response.status)) {
              // 正常状态码
              resolve(response);
            } else {
              reject(createError(`Request failed with response status code ${response.status}`, config, null, request, response));
            }
          }, 1);
        }
      };
    };

    // 处理请求头
    const progressHeader = (): void => {
      if (isFormData(data)) {
        // 如果为 FormData 的数据，删除传入的 Content-Type 让浏览器自行设置
        delete headers['Content-Type'];
      }

      // 设置 csrf 请求头
      // 如果是允许携带跨域cookie 或者 同一域名下 并且 xsrf 参数有值
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }

      // 身份授权配置
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
      }

      Object.keys(headers).forEach(key => {
        // 没有 data 不设置 content-type，因为无意义
        if (data === null && key.toLowerCase() === 'content-type') {
          delete headers[key];
        } else {
          request.setRequestHeader(key, headers[key]);
        }
      });
    };

    // 处理取消请求
    const progressCancel = (): void => {
      // 发送前判断
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          // 请求成功 abort 就无意义了
          request.abort();
          reject(reason);
        });
      }
    };

    // 设置请求方式，请求url，是否为异步
    request.open(method.toUpperCase(), url!, true);

    configRequest();
    addEventHandler();
    progressHeader();
    progressCancel();

    // 发送请求
    request.send(data);
  });
};

export default axiosXhr;
