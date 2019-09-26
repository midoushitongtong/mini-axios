import {
  isDate,
  isObject,
  isPlainObject,
  isFormData,
  isURLSearchParams
} from '../../src/util/type-check';
import { extend } from '../../src/util/extend';
import { deepMerge } from '../../src/util/deep-merge';

describe('src/util/*', () => {
  describe('isXXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy();
      expect(isDate(Date.now())).toBeFalsy();
    });

    test('should validate Object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject([])).toBeTruthy();
      expect(isObject(null)).toBeFalsy();
    });

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy();
      expect(isPlainObject(new Date())).toBeFalsy();
    });

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy();
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy();
    });
  });

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null);
      const b = { foo: 123 };

      extend(a, b);
      expect(a.foo).toBe(123);
    });

    test('should extend properties', () => {
      const a = { foo: 123, bar: 456 };
      const b = { bar: 789 };
      const c = extend(a, b);
      expect(c.foo).toBe(123);
      expect(c.bar).toBe(789);
    });
  });

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null);
      const b: any = { foo: 123 };
      const c: any = { bar: 456 };

      const d = deepMerge(a, b, c);

      // to be 用于对比基本数据类型
      expect(typeof a.foo).toBe('undefined');
      expect(typeof a.bar).toBe('undefined');
      expect(typeof b.bar).toBe('undefined');
      expect(typeof c.foo).toBe('undefined');
      expect(typeof d.bar).toBe('number');
    });

    // 不改变原值
    test('should deepMerge properties', () => {
      const a = { foo: 123 };
      const b = { bar: 456 };
      const c = { foo: 789 };

      const d = deepMerge(a, b, c);

      expect(d.foo).toBe(789);
      expect(d.bar).toBe(456);
    });

    // 递归调用 deepMerge
    test('should deepMerge recursively', () => {
      const a = { foo: { bar: 123 } };
      const b = { foo: { baz: 456 }, bar: { qux: 789 } };

      const c = deepMerge(a, b);

      // toEqual 用于对比对象数据类型
      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      });
    });

    // c.foo 和 a.foo 不是同一个引用
    test('should remove all references from nested object', () => {
      const a = { foo: { bar: 123 } };
      const b = {};
      const c = deepMerge(a, b);

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      });

      expect(c.foo).not.toBe(a.foo);
    });

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({});
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 });
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 });

      expect(deepMerge(null, null)).toEqual({});
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 });
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 });
    });
  });
});
