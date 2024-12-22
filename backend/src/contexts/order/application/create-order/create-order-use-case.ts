import { ProductRepository } from "src/contexts/products/domain/repositories/product.repository";
import { OrderShouldHaveItemsException } from "../../domain/exceptions/order.exception";
import { OrderRepository } from "../../domain/repository/order.repository";
import { CreateOrderHttpDto } from "../../infraestructure/api/create-order/create-order.http-dto";
import { CreateOrderDto } from "./create-order-dto";
import { Product } from "src/contexts/products/domain/entities/product";
import { OrderItem } from "../../domain/entities/orderItem";

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({items}: CreateOrderHttpDto, customerId: string){
    if(!items) throw new OrderShouldHaveItemsException()
    const products = (await this.productRepository
      .validateProductsId(items.map(i=>i.productId)))
      .map(p=>p.toApiJson())

    const totalAmount = items.reduce((acc, orderItem) => {
      const price = products.find(product=> product.id == orderItem.productId).price
      return price * orderItem.quantity + acc
    }, 0);

    const order=  await this.orderRepository.create({
      itemsFromDb: products,
      items,
      totalAmount,
      customerId
    })

    return order;
  }
}