import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { UpdateProductStockDto } from "./update-product-stock.dto";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductNotFoundException, ProductWithoutStock } from "../../domain/exceptions/product.exceptions";

@Injectable()
export class updateProductStockUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ){}
  
  async execute({id, quantityToSubtract}: UpdateProductStockDto){
    const product = await this.productRepository.findById(id);

    if(!product) {
      throw new ProductNotFoundException()
    }

    const newStock = product.stock -  quantityToSubtract
    if (newStock < 0) {
      throw new ProductWithoutStock()
    }

    return this.productRepository.updateStock(id, newStock)
  }
}