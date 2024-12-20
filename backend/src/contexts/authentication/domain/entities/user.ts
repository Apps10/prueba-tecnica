export interface PrimitiveUser extends UserToJSON {}
export interface UserToJSON extends UserToApiJSON {
  password: string
}

export interface UserToApiJSON  {
  id: string
  fullName: string
  address: string
  email: string
}


export class User {
  public readonly id: string
  public readonly fullName: string
  public readonly address: string
  public readonly email: string
  public readonly password: string

  
  constructor({
    id,
    fullName,
    address,
    email,
    password
  }: PrimitiveUser){
    this.id = id
    this.fullName = fullName
    this.address = address
    this.email = email
    this.password = password
  }


  toJson(): UserToJSON {
    return {
      id: this.id,
      address: this.address,
      email: this.email,
      fullName: this.fullName,
      password: this.password,
    }
  }

  toApiJson(): UserToApiJSON {
    return {
      id: this.id,
      address: this.address,
      email: this.email,
      fullName: this.fullName,
    }
  }
}