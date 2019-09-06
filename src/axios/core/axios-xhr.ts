import { AxiosRequestConfig } from '../types/axios-config';

const sendXMLHttpRequest = (config: AxiosRequestConfig) => {
  const { data = null, url, method = 'get', headers } = config;

  const request = new XMLHttpRequest();

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

  request.send(data);
};

export default sendXMLHttpRequest;
