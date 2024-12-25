import { OrderStatus } from "../../domain/enum/orderStatus.enum"

export interface IUpdateOrderDto {
  orderId?: string
  totalAmount?:    number
  status?:         OrderStatus
  paitAt?:        Date
  wompiChargeId?:   string
} 