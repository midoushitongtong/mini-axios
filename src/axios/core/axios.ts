import { AxiosInstance } from '../types/axios-config';
import AxiosExtend from '../core/axios-extend';
import { extend } from '../util/extend';

const createInstance = (): AxiosInstance => {
  // axios 函数扩展类, 包含扩展的方法
  const context = new AxiosExtend();

  // axios 核心的函数
  const instance = context.request;

  // 构建 axios 混合对象
  extend(instance, context);

  return instance as AxiosInstance;
};

const axios = createInstance();

// 返回 axios 混合对象，包含核心方法以及扩展方法
export default axios;
