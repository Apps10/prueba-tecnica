import { PrimitiveOrderItem } from "../../domain/entities/orderItem";
import { PrimitiveProduct } from "src/contexts/products/domain/entities/product";


export interface ICreateOrderDto {
    totalAmount: number
    items: PrimitiveOrderItem[]
    itemsFromDb: PrimitiveProduct[],
    customerId: String
}
