import { FindProductByIDUseCase } from "src/contexts/products/application/find-by-id/find-product-by-id-use-case";
import { FindByIdProductHttpDto } from "./find-by-id-product.htp-dto";
import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { Controller, Get, Param } from "@nestjs/common";

@Injectable()
@Controller('product')
export class FindByIdProductController {
  constructor(private findByIdProductUseCase: FindProductByIDUseCase) {}

  @Get("/:id")
  async run(@Param() {id }: FindByIdProductHttpDto) {
    try {
      const product = await this.findByIdProductUseCase.execute(id);

      return {
        Product: product.toApiJson(),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
