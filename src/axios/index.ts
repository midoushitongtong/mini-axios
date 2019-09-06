import { AxiosRequestConfig } from './types/axios-config';
import sendXMLHttpRequest from './core/axios-xhr';
import { buildRequestURL } from './lib/axios-url';
import { buildRequestData } from './lib/axios-data';
import { buildRequestHeaders } from './lib/axios-headers';

// 将 params 参数转换到 url 上
const transformRequestURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config;
  return buildRequestURL(url, params);
};

// 配置 headers 参数
const transformRequestHeaders = (config: AxiosRequestConfig) => {
  const { headers = {}, data } = config;
  return buildRequestHeaders(headers, data);
};

// 构建 data 参数
const transformRequestData = (config: AxiosRequestConfig) => {
  const { data } = config;
  return buildRequestData(data);
};

// 处理请求配置参数
const processConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.url = transformRequestURL(config);
  config.headers = transformRequestHeaders(config);
  config.data = transformRequestData(config);
  return config;
};

// axios 核心对象
const axios = (config: AxiosRequestConfig): void => {
  config = processConfig(config);
  // 发送异步请求
  sendXMLHttpRequest(config);
};

export default axios;
