import { IsEnum, IsString, IsUrl, IsUUID } from "class-validator"
import { OrderStatus } from "../../domain/enum/orderStatus.enum"

export class UpdateOrderStatusDto {
  @IsString()
  wompiPaymentId: string
  
  @IsString()
  @IsUUID()
  orderId: string

  @IsString()
  @IsUrl()
  receiptUrl: string
  
  @IsString()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus

} 