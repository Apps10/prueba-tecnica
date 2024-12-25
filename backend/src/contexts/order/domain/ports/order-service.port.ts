import { Product } from 'src/contexts/products/domain/entities/product';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/orderItem';
import { OrderSoldDto } from './order-service.interface';

export abstract class OrderServicePort {
  abstract markOrderAsSold(
    orderSoldDto: OrderSoldDto,
  ): Promise<void>;
  abstract findOrder(
    orderId: string,
    customerId: string,
  ): Promise<Order>;

}
