import { createError, AxiosError } from '../../src/axios/lib/axios-error'
import { AxiosRequest, AxiosResponse } from '../../src/axios'

describe('src/lib/error', () => {
  test('should create Error Object to test property in Error Object', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequest = {
      method: 'post'
    }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: {
        foo: ' bar'
      }
    }
    const error = createError('Boom!', config, 'error code', request, response)

    expect(error instanceof AxiosError).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('error code')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
  })
})
