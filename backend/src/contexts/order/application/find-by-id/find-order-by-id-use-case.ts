import { ProductRepository } from "src/contexts/products/domain/repositories/product.repository";
import { OrderNotFoundException } from "../../domain/exceptions/order.exception";
import { OrderRepository } from "../../domain/repository/order.repository";
import { FindOrderByIdDto } from "./find-order-by-id.dto";

export class FindOrderByIdUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(findOrderByIdDto: FindOrderByIdDto) {
    const order = await this.orderRepository.findOne(findOrderByIdDto)
    if(!order) throw new OrderNotFoundException()

    const products = await this.productRepository.validateProductsId(order.OrderItem.map(p=>p.productId))

    return {
      ...order,
      OrderItem: order.OrderItem.map(item => ({
        name: products.find(idb => idb.id == item.productId).name,
        ...item
      })),
    };
  }
}