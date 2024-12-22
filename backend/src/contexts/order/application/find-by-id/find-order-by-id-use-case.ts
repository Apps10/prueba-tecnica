import { OrderNotFoundException } from "../../domain/exceptions/order.exception";
import { orderRepository } from "../../domain/repository/order.repository";
import { FindOrderByIdDto } from "./find-order-by-id.dto";

export class FindOrderByIdUseCase {
  constructor(
    private readonly orderRepository: orderRepository
  ) {}

  async execute(findOrderByIdDto: FindOrderByIdDto){
    const order = await this.orderRepository.findOne(findOrderByIdDto)

    if(!order) throw new OrderNotFoundException()

    return order;
  }
}