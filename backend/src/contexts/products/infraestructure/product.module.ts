import { Module } from "@nestjs/common";
import { FindAllProductsController } from "./api/find-all-products.controller";
import { FindProductByIDUseCase } from "../application/find-by-id/find-product-by-id-use-case";
import { FindAllProductsUseCase } from "../application/find-all-products/find-all-products-use-case";
import { updateProductStockUseCase } from "../application/update-stock/update-product-stock-use-case";
import { PrismaService } from "src/contexts/shared/config/prisma-client";
import { ProductSchemaPrisma } from "./repositories/productSchema-prisma";
import { ProductRepository } from "../domain/repositories/product.repository";

@Module({
  imports:[

  ],
  controllers: [
    FindAllProductsController,
  ],
  providers:[
    FindAllProductsUseCase,
    FindProductByIDUseCase,
    updateProductStockUseCase,
    PrismaService,
    {
      provide: ProductRepository,
      useValue: ProductSchemaPrisma
    }
  ],
  exports: [
    FindAllProductsUseCase,
    FindProductByIDUseCase,
    updateProductStockUseCase
  ]
})

export class ProductModel{}