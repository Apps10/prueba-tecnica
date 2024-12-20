export const createCustomException = (name: string, statusCode: number) => {
  return class extends Error {
    statusCode: number
    messageError: string

    constructor(message: string){
      super(name);
      this.messageError = message;
      this.statusCode = statusCode;
    }
  }
} 