import { AxiosRequest } from '../types/axios-config';

const defaultsConfig: AxiosRequest = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
};

// 没有 data 的请求方式
const methodsNoData = [
  'post',
  'delete',
  'head',
  'options'
];

methodsNoData.forEach(method => {
  defaultsConfig.headers[method] = {};
});

// 有 data 的请求方式
const methodsWithData = [
  'post',
  'put',
  'patch'
];
methodsWithData.forEach(method => {
  defaultsConfig.headers[method] = {
    // 添加默认请求头
    'Content-Type': 'application/x-www-form-urlencoded'
  };
});

export default defaultsConfig;
