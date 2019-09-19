import { isDate, isPlainObject } from '../util/type-check';

interface URLOrigin {
  protocol: string;
  host: string;
}

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

// 根据 url 参数解析端口以及主机地址
const URLParseNode = document.createElement('a');
const resolveUrl = (url: string): URLOrigin => {
  URLParseNode.setAttribute('href', url);
  const { protocol, host } = URLParseNode;
  return {
    protocol,
    host
  };
};

// 当前页面的 url
const currentOrigin = resolveUrl(window.location.href);

// 根据 url 参数判断是否属于一个域名下
export const isURLSameOrigin = (requestURL: string): boolean => {
  const parsedOrigin = resolveUrl(requestURL);
  return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host);
};
