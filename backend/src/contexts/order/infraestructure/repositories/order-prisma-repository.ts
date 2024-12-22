import { PrismaService } from "src/contexts/shared/config/prisma-client";
import { CreateOrderDto } from "../../application/create-order/create-order-dto";
import { IFindOrderByIdDto } from "../../application/find-by-id/find-order-by-id.interface";
import { IUpdateOrderStatusDto } from "../../application/update-status/update-order-status.interface";
import { Order } from "../../domain/entities/order";
import { orderRepository } from "../../domain/repository/order.repository";
import { ProductNotFoundException } from "src/contexts/products/domain/exceptions/product.exceptions";

export class OrderPrismaRepository implements orderRepository{
  constructor(private readonly prisma: PrismaService) {}

  
  changeOrderStatus(updateOrderStatusDto: IUpdateOrderStatusDto): Promise<Order> {
    // return this.prisma.order.update({
    //   where: {id: updateOrderStatusDto.orderId },
    //   data: {
    //     status:updateOrderStatusDto.orderStatus
    //   },
    // })
  }

  create({ items }: CreateOrderDto): Promise<Order> {
    
  }

  findOne(orderPaginationDto: IFindOrderByIdDto): Promise<Order | null> {
    
  }

  async validateProductsId(ids: string[]): Promise<void> {
    ids: Array.from(new Set(ids)) //elimina los items duplicados

    const products = await this.prisma.order.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    })
    
    if (products.length !== ids.length ){
      throw new ProductNotFoundException( 'Some Products were not found')
    }
    
  }
}