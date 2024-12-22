import { Module } from "@nestjs/common";
import { CreateOrderUseCase } from "../application/create-order/create-order-use-case";
import { UpdateOrderStatusUseCase } from "../application/update-status/update-order-status.use-case";
import { FindOrderByIdUseCase } from "../application/find-by-id/find-order-by-id-use-case";
import { AuthenticationModule } from "src/contexts/authentication/infraestructure/authentication.module";
import { CreateOrderController } from "./api/create-order/create-order.controller";
import { PrismaService } from "src/contexts/shared/config/prisma-client";
import { OrderSchemaPrisma } from "./repositories/orderSchema-prisma";
import { ProductRepository } from "src/contexts/products/domain/repositories/product.repository";
import { ProductSchemaPrisma } from "src/contexts/products/infraestructure/repositories/productSchema-prisma";
import { OrderRepository } from "../domain/repository/order.repository";
import { ProductModel } from "src/contexts/products/infraestructure/product.module";
import { FindOrderByIdController } from "./api/find-by-id/find-order-by-id.controller";

@Module({
  imports: [AuthenticationModule],
  controllers:[
    CreateOrderController,
    FindOrderByIdController
  ],
  providers:[
    CreateOrderUseCase,
    UpdateOrderStatusUseCase,
    FindOrderByIdUseCase,
    PrismaService,
    OrderSchemaPrisma,
    ProductSchemaPrisma,
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepository: OrderRepository, productRepository: ProductRepository) => 
        new CreateOrderUseCase(orderRepository, productRepository),
      inject: [OrderSchemaPrisma, ProductSchemaPrisma]
    },
    {
      provide: FindOrderByIdUseCase,
      useFactory: (orderRepository: OrderRepository, productRepository: ProductRepository) => 
        new FindOrderByIdUseCase(orderRepository, productRepository),
      inject: [OrderSchemaPrisma, ProductSchemaPrisma]
    },
    {
      provide: OrderRepository,
      useExisting: OrderSchemaPrisma
    },
    {
      provide: ProductRepository,
      useExisting: ProductSchemaPrisma
    },
  ],
  exports: [ 
    CreateOrderUseCase,
    UpdateOrderStatusUseCase,
    FindOrderByIdUseCase
  ]
})
export class OrderModule {}