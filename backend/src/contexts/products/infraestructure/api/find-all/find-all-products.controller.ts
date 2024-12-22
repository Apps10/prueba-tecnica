import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { FindAllProductsUseCase } from '../../../application/find-all-products/find-all-products-use-case';
import { FindAllProductsHttpDto } from './find-all-products.http-dto';
import { Controller, Get, Param } from '@nestjs/common';
import { CountAvaliableProductUseCase } from 'src/contexts/products/application/count-products/count-products-use-case';

@Injectable()
@Controller('/product')
export class FindAllProductsController {
  constructor(
    private findAllProductUseCase: FindAllProductsUseCase,
    private countAvailableProducts: CountAvaliableProductUseCase
  ) {}

  @Get("")
  async run(@Param() dto: FindAllProductsHttpDto) {
    try {
      const { limit, page } = dto
      const total = await this.countAvailableProducts.execute()
      const product = await this.findAllProductUseCase.execute(dto);
      const lastPage = Math.ceil(total / limit)
      
      return {
        Products: product.map((p) => p.toApiJson()),
        metadata: {
          currentPage: page,
          lastPage,
          totalCount: total
        }
      }
     
    } catch (error) {
      throw new Error(error);
    }
  }
}
