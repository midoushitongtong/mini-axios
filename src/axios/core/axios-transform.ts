import { AxiosTransform } from '..';

const transform = (data: any, headers: any, fns?: AxiosTransform | AxiosTransform[]): any => {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    // 便于后面进行遍历
    fns = [fns];
  }
  // 管道式调用
  fns.forEach((fn: AxiosTransform) => {
    data = fn(data, headers);
  });
  return data;
};

export default transform;
