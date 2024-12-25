import { Module } from '@nestjs/common';
import { AuthenticationModule } from './contexts/authentication/infraestructure/authentication.module';
import { ProductModel } from './contexts/products/infraestructure/product.module';
import { OrderModule } from './contexts/order/infraestructure/order.module';
import { PaymentModule } from './contexts/payment/infraestructure/payment.module';

@Module({
  imports: [
    AuthenticationModule, ProductModel, OrderModule, PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
