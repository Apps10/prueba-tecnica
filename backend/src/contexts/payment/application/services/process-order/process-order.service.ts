import { Injectable } from '@nestjs/common';
import { PaymentServicePort } from '../../../domain/ports/payment-service.port';
import { ProcessOrderServiceDto } from './process-order.dto';
import { OrderServicePort } from 'src/contexts/order/domain/ports/order-service.port';
import { OrderAlreadyProcessedException, OrderNotFoundException } from 'src/contexts/order/domain/exceptions/order.exception';
import { ProductServicePort } from 'src/contexts/products/domain/ports/product-service.port';
import { OrderStatus } from 'src/contexts/order/domain/enum/orderStatus.enum';

@Injectable()
export class ProcessOrderService {
  constructor(
    private readonly paymentService: PaymentServicePort,
    private readonly orderServicePort: OrderServicePort,
    private readonly productServicePort: ProductServicePort,
    
  ) {}

  async execute(customerId: string, processOrderDto: ProcessOrderServiceDto) {
    const order = await this.orderServicePort.findOrder(processOrderDto.orderId, customerId)
    
    if (order.toJSON().status != OrderStatus.PENDING) throw new OrderAlreadyProcessedException()
    //hay stock de los productos
    const productsDB = await this.productServicePort.verifyStockProducts(order.toJSON().OrderItem);
    
    const Subtotal = (productsDB.reduce((acumulador, producto) => {
      const quantity = order.toApiJSON().OrderItem.find(oi=> oi.toApiJSON().productId == producto.id).toApiJSON().quantity

      const subtotal = producto.price *quantity;
      return acumulador + subtotal;
    }, 0)); 
  
    const Total = Math.round(((Subtotal) * 1.09))
    try{
      const { id, currency, status, created_at, orderId, totalAmount } = await this.paymentService.processPayment({
        ...processOrderDto,
        amount: Total
      });
      if (status == 'APPROVED') {
        await this.orderServicePort.markOrderAsSold({
          order,
          productsDB,
          paitAt: new Date(created_at),
          wompiChargeId: id,
        });
      }
      
      return { id, currency, status, created_at, orderId, totalAmount }
    } catch(err){
      return { 
        id: "NA", 
        currency:"COP", 
        status:"Error: we have a trouble with your pay, please contact with support", 
        created_at: new Date(), 
        orderId:order.toJSON().id, 
        totalAmount: Total
      }
    }
    
  }
}
