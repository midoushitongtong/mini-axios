import { AxiosRequest, AxiosStatic } from '../types/axios-config';
import AxiosExtend from './axios-extend';
import axiosDefaultConfig from './axios-default-config';
import { extend } from '../util/extend';
import mergeConfig from '../lib/axios-merge-config';
import AxiosCancelToken from '../cancel/axios-cancel-token';
import AxiosCancel, { isCancel } from '../cancel/axios-cancel';

const createInstance = (axiosDefaultConfig: AxiosRequest): AxiosStatic  => {
  // axios 核心函数扩展类, 包含扩展的方法
  // 传入默认配置
  const context = new AxiosExtend(axiosDefaultConfig);

  // axios 核心的函数
  const instance = context.request;

  // 构建 axios 混合对象
  extend(instance, context);

  return instance as AxiosStatic;
};

const axios = createInstance(axiosDefaultConfig);

// 添加实例方法
axios.create = (config?: AxiosRequest) => {
  return createInstance(mergeConfig(axiosDefaultConfig, config));
};
axios.CancelToken = AxiosCancelToken;
axios.Cancel = AxiosCancel;
axios.isCancel = isCancel;

// 返回 axios 混合对象，包含核心方法以及扩展方法
export default axios;
