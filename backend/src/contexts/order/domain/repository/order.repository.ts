import { CreateOrderDto } from "../../application/create-order/create-order-dto";
import { IFindOrderByIdDto } from "../../application/find-by-id/find-order-by-id.interface";
import { IUpdateOrderStatusDto } from "../../application/update-status/update-order-status.interface";
import { Order } from "../entities/order";

export abstract class  orderRepository {
  
  abstract create(createOrderDto: CreateOrderDto): Promise<Order>

  abstract findOne(orderPaginationDto: IFindOrderByIdDto) : Promise<Order|null>

  abstract changeOrderStatus( updateOrderStatusDto: IUpdateOrderStatusDto) : Promise<Order>

}