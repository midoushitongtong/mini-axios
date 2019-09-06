import { isPlainObject } from '../util/type-check';

export const buildRequestData = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
};
