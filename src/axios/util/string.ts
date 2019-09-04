const toString = Object.prototype.toString;

// 判断参数是否为日期类型，返回类型保护
export const isDate = (value: any): value is Date => {
  return toString.call(value) === '[object Date]';
};

// 判断参数是否为对象，返回类型保护
export const isObject = (value: any): value is object => {
  return typeof value === 'object' && value !== null;
};
