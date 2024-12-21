import { Module } from '@nestjs/common';
import { AuthenticationModule } from './contexts/authentication/infraestructure/authentication.module';
import { ProductModel } from './contexts/products/infraestructure/product.module';

@Module({
  imports: [
    AuthenticationModule, ProductModel
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
