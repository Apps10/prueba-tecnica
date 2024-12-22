import { IsNumber, IsString, IsUUID } from "class-validator";

export class FindOrderByIdDto  {
  @IsString()
  @IsUUID()
  id: string
}