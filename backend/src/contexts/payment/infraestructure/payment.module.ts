import { Module } from '@nestjs/common';
import { WPaymentAdapter } from './adapters/w-payment.adapter';
import { ProcessOrderService } from '../application/services/process-order/process-order.service';
import { PaymentServicePort } from '../domain/ports/payment-service.port';
import { ProcessOrderController } from './api/process-order.controller';
import { OrderServicePort } from 'src/contexts/order/domain/ports/order-service.port';
import { AuthenticationModule } from 'src/contexts/authentication/infraestructure/authentication.module';
import { OrderRepositoryAdapter } from 'src/contexts/order/infraestructure/adapters/order-repository-adapter';
import { OrderModule } from 'src/contexts/order/infraestructure/order.module';
import { ProductModel } from 'src/contexts/products/infraestructure/product.module';
import { ProductServicePort } from 'src/contexts/products/domain/ports/product-service.port';
import { ProductRepository } from 'src/contexts/products/domain/repositories/product.repository';
import { ProductSchemaPrisma } from 'src/contexts/products/infraestructure/repositories/productSchema-prisma';
import { ProductRepositoryAdapter } from 'src/contexts/products/infraestructure/adapters/product-repository-adapter';
import { UpdateOrderUseCase } from 'src/contexts/order/application/update-order/update-order-use-case';
import { OrderRepository } from 'src/contexts/order/domain/repository/order.repository';
import { OrderSchemaPrisma } from 'src/contexts/order/infraestructure/repositories/orderSchema-prisma';

@Module({
  imports: [AuthenticationModule, OrderModule, ProductModel],
  controllers: [ProcessOrderController],
  providers: [
    ProcessOrderService,
    WPaymentAdapter,
    OrderRepositoryAdapter,
    ProductRepositoryAdapter,
    {
      provide: PaymentServicePort,
      useClass: WPaymentAdapter,
    },
    {
      provide: OrderServicePort,
      useClass: OrderRepositoryAdapter,
    },
    {
      provide: ProductServicePort,
      useExisting: ProductRepositoryAdapter,
    },
    {
      provide: ProductRepositoryAdapter,
      useFactory: (
        productRepository: ProductRepository
      ) => 
        new ProductRepositoryAdapter(productRepository),
      inject: [ProductSchemaPrisma],
    },
  ],
  exports: [ProcessOrderService],
})
export class PaymentModule {}
