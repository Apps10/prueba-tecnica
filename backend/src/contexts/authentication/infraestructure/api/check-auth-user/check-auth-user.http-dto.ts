import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CheckUserAuthHttpDto {
  @IsNotEmpty()
  @IsString()
  token: string
  
}