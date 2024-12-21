import { IsNumber } from "class-validator";

export class FindProductByIdDto {
  @IsNumber()
  id: string
}