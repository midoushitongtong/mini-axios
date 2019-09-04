import { AxiosRequestConfig } from '../types/axios-config'

export default (config: AxiosRequestConfig) => {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  // 设置请求方式，请求url，是否为异步
  request.open(method.toUpperCase(), url, true)

  request.send()
}
