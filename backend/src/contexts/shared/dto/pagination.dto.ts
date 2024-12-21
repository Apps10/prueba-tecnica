import { Transform } from "class-transformer"
import { IsNumber, IsOptional, Max, Min } from "class-validator"

export class PaginationDto {

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(0)
  start: number = 0


  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @Max(30)
  offset: number = 30
  
}