import { Product } from "../entities/product";
import { IFindAllProductsDto } from "../../application/find-all-products/find-all-products.interface";

export abstract class  ProductRepository {
  abstract updateStock(id: number, stock: number): Promise<Product>
  abstract findAll(params: IFindAllProductsDto): Promise<Product[] | null>
  abstract findById(id: number): Promise<Product | null>
  abstract countAvaliableProducts(): Promise<number>
}
