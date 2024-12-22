import { OrderNotFoundException } from "../../domain/exceptions/order.exception";
import { OrderRepository } from "../../domain/repository/order.repository"
import { UpdateOrderStatusDto } from "./update-order-status.dto"

export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(updateOrderStatusDto: UpdateOrderStatusDto){
    // const order = await this.orderRepository.findOne({
    //   id: updateOrderStatusDto.orderId
    //   //customerId: updateOrderStatusDto.
    // })

    // if(!order) throw new OrderNotFoundException()

    // return this.orderRepository.changeOrderStatus(updateOrderStatusDto)
  }
} 