import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateUserHttpDto {

  @IsUUID()
  id: string

  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsNotEmpty()
  @IsString()
  address: string


  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}