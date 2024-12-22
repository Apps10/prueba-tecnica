import { Module } from '@nestjs/common';
import { AuthenticationModule } from './contexts/authentication/infraestructure/authentication.module';
import { ProductModel } from './contexts/products/infraestructure/product.module';
import { OrderModule } from './contexts/order/infraestructure/order.module';

@Module({
  imports: [
    AuthenticationModule, ProductModel, OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
