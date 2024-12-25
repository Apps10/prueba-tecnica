import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { OrderStatus } from "src/contexts/order/domain/enum/orderStatus.enum"

export class updateOrderHttpDto  {
  @IsNumber()
  totalAmount:    number

  @IsEnum(OrderStatus)
  status:         OrderStatus

  @IsOptional()
  @IsDateString()
  paitAt?:        Date

  @IsOptional()
  @IsString()
  wompiChargeId?:   String
}

