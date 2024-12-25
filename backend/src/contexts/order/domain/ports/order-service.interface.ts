import { Product } from 'src/contexts/products/domain/entities/product';
import { Order } from '../entities/order';

export class OrderSoldDto {
  paitAt?: Date;
  wompiChargeId?: String;
  order: Order;
  productsDB: Product[];
}
