import { ICreateOrderDto } from '../../application/create-order/create-order-interface';
import { IFindOrderByIdDto } from '../../application/find-by-id/find-order-by-id.interface';
import { IUpdateOrderDto } from '../../application/update-order/update-order.interface';
import { Order } from '../entities/order';

export abstract class OrderRepository {
  abstract create(createOrderDto: ICreateOrderDto); //:
  abstract findOne(orderPaginationDto: IFindOrderByIdDto); // : Promise<Order|null>

  abstract updateOrder(updateOrderStatusDto: IUpdateOrderDto); // : Promise<Order>
}
