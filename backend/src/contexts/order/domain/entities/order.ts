// model Order {
//   id              String        @id @default(uuid())      
//   totalAmount     Float

import { date } from "joi"
import { OrderStatus } from "../enum/orderStatus.enum"
import { OrderItem } from "./orderItem"
import { OrderReceipt } from "./orderReceipt"

//   status          OrderStatus   @default(PENDING)
//   paitAt          DateTime?
//   wompiChargeId   String?

//   createdAt       DateTime      @default(now())
//   updatedAt       DateTime      @updatedAt
  
//   OrderItem       OrderItem[]

//   OrderReceipt    OrderReceipt?
// }

interface PrimitiveOrder{
  id:             string             
  totalAmount:    number
  status:         OrderStatus
  paitAt?:        Date,
  wompiChargeId?:   String,
  OrderItem:       OrderItem[]
  OrderReceipt?:    OrderReceipt,
  createdAt?:      Date,      
  updatedAt?:     Date,   
}

export class Order {
  private readonly id: string             
  private readonly totalAmount: number
  private readonly status: OrderStatus
  private readonly paitAt: Date
  private readonly wompiChargeId: String
  private readonly OrderItem: OrderItem[]
  private readonly OrderReceipt: OrderReceipt
  private readonly createdAt: Date      
  private readonly updatedAt: Date   

  constructor({
    id,
    totalAmount,
    status,
    paitAt,
    wompiChargeId,
    OrderItem,
    OrderReceipt,
    createdAt,
    updatedAt
  }: PrimitiveOrder){
    this.id = id,
    this.totalAmount = totalAmount,
    this.status = status,
    this.paitAt = paitAt,
    this.wompiChargeId = wompiChargeId,
    this.OrderItem = OrderItem,
    this.OrderReceipt = OrderReceipt,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }

  toApiJSON(){
    return {
      id: this.id,
      totalAmount: this.totalAmount,
      status: this.status,
      paitAt: this.paitAt,
      wompiChargeId: this.wompiChargeId,
      OrderItem: this.OrderItem,
      OrderReceipt: this.OrderReceipt,
    }
  }
}