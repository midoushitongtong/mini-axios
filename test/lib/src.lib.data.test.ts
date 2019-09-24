import { buildRequestData, parseResponseData } from '../../src/axios/lib/axios-data'

describe('src/lib/data', () => {
  describe('buildRequestData', () => {
    test('should transform request data to string if data is a plain object', () => {
      const a = {
        a: 1
      }
      expect(buildRequestData(a)).toBe('{"a":1}')
    })

    test('should do nothing if data is not a plain object', () => {
      const a = new URLSearchParams('a=b')
      expect(buildRequestData(a)).toBe(a)
    })
  })

  describe('parseResponseData', () => {
    test('should transform response data to object if data is a json string', () => {
      const a = '{"a": 1}'
      expect(parseResponseData(a)).toEqual({
        a: 1
      })
    })

    test('should do nothing if data is string but not a json string', () => {
      const a = '{a: 1}'
      expect(parseResponseData(a)).toBe('{a: 1}')
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 1 }
      expect(parseResponseData(a)).toBe(a)
    })
  })
})
