import { v4 as uuidv4 } from 'uuid'

export interface PrimitiveUser {
  id: string
  fullName: string
  address: string
  email: string
  password: string
}


export class User {
  constructor(private attributes: PrimitiveUser){}

  static create(createUser: {
    fullName: string
    address: string
    email: string
    password: string
  }) {
    return new User({
      id: uuidv4(),
      address: createUser.address,
      email: createUser.email,
      fullName: createUser.fullName,
      password: createUser.password,
    })
  }

  toJson(): PrimitiveUser {
    return {
      id: uuidv4(),
      address: this.attributes.address,
      email: this.attributes.email,
      fullName: this.attributes.fullName,
      password: this.attributes.password,
    }
  }
}