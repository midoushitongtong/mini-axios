import { isPlainObject } from '../util/type-check';

// 将请求头的 key 标准化
const normalizeHeaderName = (headers: any, normalizeHeaderName: string): void => {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach(key => {
    if (key !== normalizeHeaderName && key.toUpperCase() === normalizeHeaderName.toUpperCase()) {
      // content-type CONTENT-TYPE，这种情况就会进入
      // 请求头名称标准化
      headers[normalizeHeaderName] = headers[key];
      delete headers[key];
    }
  });
};

export const buildRequestHeaders = (headers: any, data: any): any => {
  // 标准化 Content-Type
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // 默认的 Content-Type
      headers['Content-Type'] = 'application/json';
    }
  }
  return headers;
};
