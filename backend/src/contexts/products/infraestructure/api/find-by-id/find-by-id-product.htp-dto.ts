import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { Transform } from "stream";

export class FindByIdProductHttpDto {
  @IsNumber()
  @Type(()=> Number)
  id: number
}