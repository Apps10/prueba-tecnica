import { Order } from "./order"

interface PrimitiveOrderItem {
  id: string  
  productId: number
  quantity: number
  price: number
  orderId: string
  Order: Order
}

export class OrderItem {
  private readonly id: string              
  private readonly productId: number
  private readonly quantity: number
  private readonly price: number
  private readonly orderId: string
  private readonly Order: Order
  
  constructor({
    Order,
    id,
    orderId,
    price,
    productId,
    quantity
  }: PrimitiveOrderItem) {
    this.id=id
    this.orderId=orderId
    this.price=price
    this.productId=productId
    this.Order=Order
    this.quantity = quantity
  }
  
  toApiJSON(){
    return {
      id: this.id,
      orderId: this.orderId,
      price: this.price,
      productId: this.productId,
      Order: this.Order,
      quantity: this.quantity
    }
  }
}