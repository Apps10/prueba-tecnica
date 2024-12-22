import { OrderStatus } from "../../domain/enum/orderStatus.enum"

export interface IUpdateOrderStatusDto {
  wompiPaymentId: string
  orderId: string
  receiptUrl: string
  orderStatus: OrderStatus
  
} 