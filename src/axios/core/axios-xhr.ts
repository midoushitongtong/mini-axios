import { AxiosRequest, AxiosResponse, AxiosResponsePromise } from '../types/axios-config';
import { parseResponseHeaders } from '../lib/axios-headers';
import { parseResponseData } from '../lib/axios-data';

const sendXMLHttpRequest = (config: AxiosRequest): AxiosResponsePromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, timeout, responseType } = config;

    const request = new XMLHttpRequest();

    // 设置响应类型
    if (responseType) {
      request.responseType = responseType;
    }

    // 设置请求超时时间
    if (timeout) {
      request.timeout = timeout;
    }

    // 设置请求方式，请求url，是否为异步
    request.open(method.toUpperCase(), url, true);

    // 设置请求头
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
      reject(new Error('Network Error'));
    };

    // 处理请求超时
    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout}ms exceed`));
    };

    // 处理正常响应
    request.onreadystatechange = () => {
      console.log(request.getAllResponseHeaders());
      if (request.readyState !== 4) {
        return;
      } else {
        // 解析响应头
        const responseHeaders = parseResponseHeaders(request.getAllResponseHeaders());
        // 解析响应数据
        const responseData = parseResponseData(responseType === 'text'
          ? request.responseText
          : request.response);
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        resolve(response);
      }
    };

    // 发送请求
    request.send(data);
  });
};

export default sendXMLHttpRequest;
