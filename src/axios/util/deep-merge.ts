import { isPlainObject } from './type-check';

const deepMerge = (...objs: any[]): any => {
  const result = Object.create(null);
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            // 如果对象以及存在，再次深度拷贝
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
};

export default deepMerge;
