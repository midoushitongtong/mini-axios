import { AxiosRequestConfig } from './types/axios-config'
import xhr from './core/xhr'
import { buildURL } from './util/url'

// 解析 url 参数
const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理请求的配置信息
const processConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.url = transformURL(config)
  return config
}

// axios 核心对象
const axios = (config: AxiosRequestConfig): void => {
  config = processConfig(config)
  // 发送异步请求
  xhr(config)
}

export default axios
