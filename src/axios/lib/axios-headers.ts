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

// 构建请求头
export const buildRequestHeaders = (headers: any, data: any): any => {
  // 标准化 Content-Type
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // 如果有 data 对象，设置默认的 Content-Type
      headers['Content-Type'] = 'application/json';
    }
  }
  return headers;
};

// 解析响应头
export const parseResponseHeaders = (headers: string): any => {
  let parseHeaders = Object.create(null);
  if (!headers) {
    return parseHeaders;
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':');
    if (key) {
      key = key.trim().toLowerCase();
    }
    if (!key) {
      return;
    }
    if (value) {
      value = value.trim();
    }
    parseHeaders[key] = value;
  });
  return parseHeaders;
};
