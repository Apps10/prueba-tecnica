import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { ProductRepository } from "../../domain/repositories/product.repository";

@Injectable()
export class CountAvaliableProductUseCase  {
  constructor(
    private readonly productRepository: ProductRepository,
  ){}

  async execute() : Promise<number>{
    return this.productRepository.countAvaliableProducts();
  }

}