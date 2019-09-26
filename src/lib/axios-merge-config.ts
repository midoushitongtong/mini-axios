import { AxiosRequest } from '../types/axios-config';
import { isPlainObject } from '../util/type-check';
import { deepMerge } from '../util/deep-merge';

// 已有对应策略的配置属性
const strategyKeyList = Object.create(null);

// 默认策略
const defaultStrategy = (val1: any, val2: any): any => {
  return typeof val2 !== 'undefined' ? val2 : val1;
};

// val2 优先策略
const fromVal2Strategy = (val1: any, val2: any): any => {
  if (typeof val2 !== 'undefined') {
    return val2;
  }
};

// 深度合并策略
const deepMergeStrategy = (val1: any, val2: any): any => {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 === 'undefined') {
    return val1;
  }
};

// 深度策略的配置属性
const strategyKeysDeepMerge = ['headers', 'auth'];
// 将深度策略的配置属性，存入策略列表
strategyKeysDeepMerge.forEach(key => {
  strategyKeyList[key] = deepMergeStrategy;
});

// 优先 val2 策略的配置属性
const strategyKeysFromVal2 = ['url', 'params', 'data'];
// 将优先 val2 策略的配置属性，存入策略列表
strategyKeysFromVal2.forEach(key => {
  strategyKeyList[key] = fromVal2Strategy;
});

const mergeConfig = (config1: AxiosRequest, config2?: AxiosRequest): AxiosRequest => {
  if (!config2) {
    config2 = {};
  }

  const config = Object.create(null);

  // 合并配置属性函数
  const mergeField = (key: string): void => {
    // 根据配置属性获取不同策略
    const strategy = strategyKeyList[key] || defaultStrategy;
    config[key] = strategy(config1[key], config2![key]);
  };

  // 合并配置属性
  for (let key in config2) {
    mergeField(key);
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  return config;
};

export default mergeConfig;
