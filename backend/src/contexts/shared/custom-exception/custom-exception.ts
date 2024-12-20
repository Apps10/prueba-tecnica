export const createCustomException = (name: string) => {
  return class extends Error {
    constructor(message: string){
      super(message);
      this.name = name;
    }
  }
} 