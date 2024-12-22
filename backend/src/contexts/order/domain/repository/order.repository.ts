import { ICreateOrderDto } from "../../application/create-order/create-order-interface";
import { IFindOrderByIdDto } from "../../application/find-by-id/find-order-by-id.interface";
import { IUpdateOrderStatusDto } from "../../application/update-status/update-order-status.interface";
import { Order } from "../entities/order";

export abstract class OrderRepository {
  
  abstract create(createOrderDto: ICreateOrderDto)//: 
  abstract findOne(orderPaginationDto: IFindOrderByIdDto)// : Promise<Order|null>

  abstract changeOrderStatus( updateOrderStatusDto: IUpdateOrderStatusDto)// : Promise<Order>
}