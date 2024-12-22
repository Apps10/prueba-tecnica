import { Module } from '@nestjs/common';
import { FindAllProductsController } from './api/find-all/find-all-products.controller';
import { FindProductByIDUseCase } from '../application/find-by-id/find-product-by-id-use-case';
import { FindAllProductsUseCase } from '../application/find-all-products/find-all-products-use-case';
import { updateProductStockUseCase } from '../application/update-stock/update-product-stock-use-case';
import { PrismaService } from 'src/contexts/shared/config/prisma-client';
import { ProductSchemaPrisma } from './repositories/productSchema-prisma';
import { ProductRepository } from '../domain/repositories/product.repository';
import { FindByIdProductController } from './api/find-by-id/find-by-id-product.controller';
import { UpdateProductStockController } from './api/update-stock/update-product-stock.controller';
import { CountAvaliableProductUseCase } from '../application/count-products/count-products-use-case';

@Module({
  controllers: [
    FindAllProductsController, 
    FindByIdProductController, 
    UpdateProductStockController
  ],
  providers: [
    FindAllProductsUseCase,
    FindProductByIDUseCase,
    updateProductStockUseCase,
    CountAvaliableProductUseCase,
    ProductSchemaPrisma,
    PrismaService,
    {
      provide: ProductRepository,
      useExisting: ProductSchemaPrisma,
    },
    
  ],
  exports: [
    FindAllProductsUseCase,
    FindProductByIDUseCase,
    updateProductStockUseCase,
  ],
})
export class ProductModel {}
