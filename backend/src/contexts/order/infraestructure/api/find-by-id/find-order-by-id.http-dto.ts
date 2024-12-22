import { IsNumber, IsString, IsUUID } from "class-validator";

export class FindOrderByIdHttpDto  {
  @IsString()
  @IsUUID()
  id: string
}