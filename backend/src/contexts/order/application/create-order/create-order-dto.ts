import { PrimitiveOrderItem } from "../../domain/entities/orderItem";
import { PrimitiveProduct } from "src/contexts/products/domain/entities/product";


export class CreateOrderDto {
    totalAmount: number
    items: PrimitiveOrderItem[]
    itemsFromDb: PrimitiveProduct[]
    customerId: string
}
