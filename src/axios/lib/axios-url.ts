import { isDate, isPlainObject } from '../util/type-check';

// 转义字符数组
const encode = (value: string): string => {
  return encodeURIComponent(value);
};

// 将参数拼接到 url 字符串
export const buildRequestURL = (url: string, params?: any): string => {
  if (!params) {
    return url;
  }

  // 处理后的参数 [a=1, b=2&c=3, q=2, ...]
  const parts: string[] = [];

  // 处理每个请求参数
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value == null || typeof value === 'undefined') {
      return;
    }

    // 请求的参数
    let valueList = [];
    if (Array.isArray(value)) {
      // 数组类型的请求参数
      valueList = value;
      key += '[]';
    } else {
      // 非数组类型的请求参数
      valueList = [value];
    }

    // 处理请求参数
    valueList.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString();
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value);
      }
      // 保存处理后的请求参数
      parts.push(`${encode(key)}=${encode(value)}`);
    });
  });

  // 将处理后的请求参数合并为字符串
  let serializedParams = parts.join('&');
  // username=1&password[]=1&password[]=2

  if (serializedParams) {
    // 去除 # 锚点
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += url.indexOf('?') === -1 ? '?' : '&';
    // 凭借请求参数
    url += serializedParams;
  }
  return url;
};
