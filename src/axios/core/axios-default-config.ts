import { AxiosRequest } from '../types/axios-config';
import { buildRequestHeaders } from '../lib/axios-headers';
import { buildRequestData, parseResponseData } from '../lib/axios-data';

const defaultsConfig: AxiosRequest = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    (data: any, headers: any): any => {
      buildRequestHeaders(headers, data);
      return buildRequestData(data);
    }
  ],
  transformResponse: [
    (data: any): any => {
      return parseResponseData(data);
    }
  ]
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
