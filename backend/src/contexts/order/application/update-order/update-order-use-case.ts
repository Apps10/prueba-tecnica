import { OrderNotFoundException } from '../../domain/exceptions/order.exception';
import { OrderRepository } from '../../domain/repository/order.repository';
import { UpdateOrderDto } from './update-order.dto';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute( updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.updateOrder(updateOrderDto)
  }
}
