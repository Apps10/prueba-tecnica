import { Order } from "./order"

export interface PrimitiveOrderReceipt {
  id: string,
  order: Order,
  orderId: string,
  receiptUrl:string,
  createdAt?: Date,
  updatedAt?: Date
}

export class OrderReceipt {
  private readonly id: string
  private readonly order: Order
  private readonly orderId: string
  private readonly receiptUrl:string
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor({
    id,
    order,
    orderId,
    receiptUrl,
    createdAt,
    updatedAt
  }: OrderReceipt) {
    this.id = id,
    this.order = order,
    this.orderId = orderId,
    this.receiptUrl = receiptUrl,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }

  toApiJSON(){
    return {
      id: this.id,
      order: this.order,
      orderId: this.orderId,
      receiptUrl: this.receiptUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}