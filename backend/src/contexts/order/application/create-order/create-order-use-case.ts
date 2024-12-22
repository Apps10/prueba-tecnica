import { OrderShouldHaveItemsException } from "../../domain/exceptions/order.exception";
import { orderRepository } from "../../domain/repository/order.repository";
import { CreateOrderHttpDto } from "../../infraestructure/api/create-order/create-order.http-dto";
import { CreateOrderDto } from "./create-order-dto";

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: orderRepository,
    // private readonly orderRepository: orderRepository,
  ) {}

  async execute({items}: CreateOrderHttpDto){
    if(!items) throw new OrderShouldHaveItemsException()
    // // const products = await this.orderRepository.validateProductsId(items.map(i=>i.productId))

    // const totalAmount = items.reduce((acc, orderItem) => {
    //   // const price = products.find(product=> product.id == String(orderItem.productId)).price
    //   return price * orderItem.quantity + acc
    // }, 0);

    // const totalItems = items.reduce((acc, orderItem) => {
    //   return acc + orderItem.quantity 
    // }, 0);
    
    // // return this.orderRepository.create({})
  }
}