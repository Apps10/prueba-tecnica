import { Module } from "@nestjs/common";
import { CreateOrderUseCase } from "../application/create-order/create-order-use-case";
import { UpdateOrderStatusUseCase } from "../application/update-status/update-order-status.use-case";
import { FindOrderByIdUseCase } from "../application/find-by-id/find-order-by-id-use-case";
import { AuthenticationModule } from "src/contexts/authentication/infraestructure/authentication.module";
import { CreateOrderController } from "./api/create-order/create-order.controller";
import { PrismaService } from "src/contexts/shared/config/prisma-client";

@Module({
  imports: [AuthenticationModule],
  controllers:[
    CreateOrderController
  ],
  providers:[
    CreateOrderUseCase,
    UpdateOrderStatusUseCase,
    FindOrderByIdUseCase,
    PrismaService,
    // {
    //   provide:,
    //   useExisting: ,
    // }
  ],
  exports: [ 
    CreateOrderUseCase,
    UpdateOrderStatusUseCase,
    FindOrderByIdUseCase
  ]
})
export class OrderModule {}