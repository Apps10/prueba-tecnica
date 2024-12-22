import { OrderItem, OrderStatus } from "@prisma/client";

export class CreateOrderDto {
    totalAmount: number
    status: OrderStatus
    OrderItem: OrderItem[]
}
