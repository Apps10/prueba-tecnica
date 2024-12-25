import { PrismaService } from 'src/contexts/shared/config/prisma-client';
import { CreateOrderDto } from '../../application/create-order/create-order-dto';
import { IFindOrderByIdDto } from '../../application/find-by-id/find-order-by-id.interface';
import { IUpdateOrderDto } from '../../application/update-order/update-order.interface';
import { Order } from '../../domain/entities/order';
import { OrderRepository } from '../../domain/repository/order.repository';
import { ProductNotFoundException } from 'src/contexts/products/domain/exceptions/product.exceptions';
import { OrderItem } from '../../domain/entities/orderItem';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { Product } from 'src/contexts/products/domain/entities/product';

@Injectable()
export class OrderSchemaPrisma implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  updateOrder({ orderId, status, totalAmount, paitAt, wompiChargeId }: IUpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        totalAmount,
        wompiChargeId,
        paitAt
      },
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    const { items, totalAmount, itemsFromDb, customerId } = createOrderDto;

    const newOrder = await this.prisma.order.create({
      data: {
        totalAmount,
        customerId,
        OrderItem: {
          createMany: {
            data: items.map((item) => {
              const price = itemsFromDb.find(
                (p) => p.id == item.productId,
              ).price;
              return {
                price,
                productId: item.productId,
                quantity: item.quantity,
              };
            }),
          },
        },
      },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true,
          },
        },
      },
    });

    return {
      ...newOrder,
      OrderItem: newOrder.OrderItem.map((item) => ({
        ...item,
        name: itemsFromDb.find((idb) => idb.id == item.productId).name,
      })),
    };
  }

  async findOne({ id, customerId }: IFindOrderByIdDto) {
    //: Promise<Order | null>
    return await this.prisma.order.findUnique({
      where: {
        id,
        customerId,
      },
      include: {
        OrderItem: {
          select: {
            productId: true,
            quantity: true,
            price: true,
          },
        },
      },
    });
  }
}
