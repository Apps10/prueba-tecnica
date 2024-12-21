import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { Product } from "../../domain/entities/product";
import { ProductNotFoundException } from "../../domain/exceptions/product.exceptions";

@Injectable()

export class FindProductByIDUseCase  {
  constructor(
    private readonly productRepository: ProductRepository,
  ){}

  async execute(id: number) : Promise< Product >{
    const product = await this.productRepository.findById(id)

    if(!product) {
      throw new ProductNotFoundException()
    }
    return product;
  }

}