import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { IFindAllProductsDto } from '../../application/find-all-products/find-all-products.interface';
import { Product } from '../../domain/entities/product';
import { PrismaService } from 'src/contexts/shared/config/prisma-client';
import { ProductNotFoundException } from '../../domain/exceptions/product.exceptions';

@Injectable()
export class ProductSchemaPrisma implements ProductRepository 
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise< Product | null > {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? new Product(product) : null;
  }

  async findAll(params: IFindAllProductsDto): Promise<Product[] | null> {
    const { page, limit } = params
    const products = await  this.prisma.product
      .findMany({ 
        skip: ( page - 1 ) * limit, 
        take: limit,
      },);
    return products ? await products.map(p=> new Product(p)) : null
  }

  async updateStock(id: number, stock: number): Promise<Product> {
    const product = await this.prisma.product.update({
      where: {id},
      data: {
        stock
      } 
    });
    return new Product(product);
 }

 async countAvaliableProducts(): Promise<number> {
    return this.prisma.product.count({ where: { stock: {
      gte: 1
    } } })
 }

 async validateProductsId(ids: number[]): Promise<Product[]> {
  ids: Array.from(new Set(ids)) //elimina los items duplicados
  const products = await this.prisma.product.findMany({
    where: {
      id: {
        in: ids,

      }
    }
  })
  
  if (products.length !== ids.length ){
    throw new ProductNotFoundException('Some Products were not found')
  }

  return products.map(p=>new Product(p));
 }
 
}
