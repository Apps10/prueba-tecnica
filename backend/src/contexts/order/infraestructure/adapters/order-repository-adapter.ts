// src/orders/infrastructure/adapters/order-repository.adapter.ts
import { Injectable } from '@nestjs/common';
import { OrderServicePort } from '../../domain/ports/order-service.port';
import { Order, PrimitiveOrder } from '../../domain/entities/order';
import { FindOrderByIdUseCase } from '../../application/find-by-id/find-order-by-id-use-case';
import { UpdateOrderUseCase } from '../../application/update-order/update-order-use-case';
import { UpdateOrderDto } from '../../application/update-order/update-order.dto';
import { OrderStatus } from '../../domain/enum/orderStatus.enum';
import { ProductServicePort } from 'src/contexts/products/domain/ports/product-service.port';
import { OrderItem } from '../../domain/entities/orderItem';
import { OrderSoldDto } from '../../domain/ports/order-service.interface';

@Injectable()
export class OrderRepositoryAdapter implements OrderServicePort {
  constructor(
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly productManager: ProductServicePort,
  ) {}

  async markOrderAsSold(orderSoldDto: OrderSoldDto): Promise<void> {
    const { order, productsDB } = orderSoldDto;
    const OrderItems = order.toJSON().OrderItem;

    for (let i = 0; i < OrderItems.length; i++) {
      const orderItem = OrderItems[i].toApiJSON();
      const product = productsDB.find(p=>p.id == orderItem.productId)
      const newStock = product.stock - orderItem.quantity;

      await this.productManager.updateStockProductSold(product.id, newStock);
    }

    await this.updateOrderUseCase.execute({
      orderId: order.toApiJSON().id,
      status: OrderStatus.PAID
    });
  }

  async findOrder(orderId: string, customerId: string): Promise<Order | null> {
    const order = await this.findOrderByIdUseCase.execute({ id: orderId, customerId });
    const orderItem = order.OrderItem.map(oi=> new OrderItem(oi))

    return order ? new Order({
      ...order,
      OrderItem: orderItem
    }) : null 
  }
}
