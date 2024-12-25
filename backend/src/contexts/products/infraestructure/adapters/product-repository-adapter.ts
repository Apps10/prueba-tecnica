import { OrderItem } from "src/contexts/order/domain/entities/orderItem";
import { Product } from "../../domain/entities/product";
import { ProductServicePort } from "../../domain/ports/product-service.port";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductWithoutStockException } from "../../domain/exceptions/product.exceptions";

export class ProductRepositoryAdapter implements ProductServicePort {
  constructor(
    private readonly productRepository:ProductRepository,
  ){}
  
  async updateStockProductSold(productId: number, stock: number) {
    await this.productRepository.updateStock(productId, stock)
  }

  findProductById(productId: number): Promise<Product | null> {
    return this.productRepository.findById(productId)
  }

  async verifyStockProducts(orderItems: OrderItem[]): Promise<Product[]> {
    const productsInMemory = [];
    for(let i=0; i<orderItems.length; i++){
      const { productId, quantity} = orderItems[i].toApiJSON()
      const product = await this.productRepository.findById(productId)
      if(product.stock < quantity){
        throw new ProductWithoutStockException('some products dont have stock, please verify the products')
      }
      productsInMemory.push(product)
    }
    return productsInMemory
  }
}