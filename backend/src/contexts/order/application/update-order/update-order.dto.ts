import { Order } from "../../domain/entities/order"
import { OrderStatus } from "../../domain/enum/orderStatus.enum"
import { Product } from "src/contexts/products/domain/entities/product"

export class UpdateOrderDto {
  totalAmount?:    number
  status?:         OrderStatus
  paitAt?:        Date
  wompiChargeId?:   string
  orderId?: string
} 