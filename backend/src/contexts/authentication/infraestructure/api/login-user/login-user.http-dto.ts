import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserHttpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string
  
  @IsNotEmpty()
  @IsString()
  password: string
}