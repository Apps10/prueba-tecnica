import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterUserHttpDto {

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