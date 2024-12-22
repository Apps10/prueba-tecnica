import { Product } from "src/contexts/products/domain/entities/product"
import { Order } from "./order"

export interface PrimitiveOrderItem {
  id?: string  
  productId: number,
  quantity: number
  price: number
  order?: Order
}

export class OrderItem {
  private readonly id: string              
  private readonly productId: number;
  private readonly quantity: number
  private readonly price: number
  private readonly order: Order
  
  constructor({
    id,
    order,
    price,
    productId,
    quantity
  }: OrderItem) {
    this.id=id
    this.price=price
    this.productId=productId
    this.quantity = quantity
    this.order=order
  }
  
  toApiJSON(){
    return {
      id: this.id,
      price: this.price,
      productId: this.productId,
      order: this.order,
      quantity: this.quantity
    }
  }

  
}