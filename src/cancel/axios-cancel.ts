class AxiosCancel {
  message?: string;

  constructor(message?: string) {
    this.message = message;
  }
}

export const isCancel = (value: any): boolean => {
  return value instanceof AxiosCancel;
};

export default AxiosCancel;
