import { AxiosRequest, AxiosResponse } from '../types/axios-config';

export class AxiosError extends Error {
  isError: boolean;
  config: AxiosRequest;
  code?: string | null;
  request?: any;
  response?: AxiosResponse;

  constructor(
    message: string,
    config: AxiosRequest,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message);
    this.isError = true;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export const createError = (
  message: string,
  config: AxiosRequest,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) => {
  return new AxiosError(message, config, code, request, response);
};
