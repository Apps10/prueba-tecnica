import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { FindAllProductsDto } from "./find-all-products.dto";
import { Product } from "../../domain/entities/product";

@Injectable()

export class FindAllProductsUseCase  {
  constructor(
    public readonly productRepository: ProductRepository,
  ){}

  async execute(findAllProductDto: FindAllProductsDto) : Promise<Product[] >{
    return this.productRepository.findAll(findAllProductDto);
  }

}