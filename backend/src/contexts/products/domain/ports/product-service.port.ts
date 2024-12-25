import { OrderItem } from "src/contexts/order/domain/entities/orderItem";
import { Product } from "../entities/product";

export abstract class ProductServicePort {
  abstract updateStockProductSold(productId:number, stock:number): Promise<void>
  abstract findProductById(productId:number): Promise<Product | null>
  abstract verifyStockProducts(orderItems: OrderItem[])
}