export const createCustomException = (name: string, statusCode: number, defaultMessage: string = '') => {
  return class extends Error {
    statusCode: number
    messageError: string

    constructor(message: string = ''){
      super(name);
      this.messageError = message || defaultMessage;
      this.statusCode = statusCode;
    }
  }
} 