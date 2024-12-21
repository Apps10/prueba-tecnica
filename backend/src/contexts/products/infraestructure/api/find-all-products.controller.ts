import { FindAllProductsUseCase } from "../../application/find-all-products/find-all-products-use-case";
import { FindAllProductsHttpDto } from "./find-all-products.http-dto";

export class FindAllProductsController {
  constructor(
    private findAllProductUseCase: FindAllProductsUseCase 
  ){}

  async run(dto: FindAllProductsHttpDto) {
    try{
      const product = await this.findAllProductUseCase.execute(dto)

      return {
        Product: product.map(p=>p.toApiJson())
      }
    }catch(error){
      throw new Error(error)
    }
  }
}