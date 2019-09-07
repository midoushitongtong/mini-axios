import { isPlainObject } from '../util/type-check';

// 构建请求数据
export const buildRequestData = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
};

// 解析响应数据
export const parseResponseData = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // 转换 JSON 对象失败，不做任何处理
    }
  }
  return data;
};
