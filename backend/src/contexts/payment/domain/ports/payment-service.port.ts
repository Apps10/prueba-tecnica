import { ProcessOrderDto } from "../dto/process-order.dto";
import { IPaymentServiceDto } from "./payment-service.interface";



export abstract class  PaymentServicePort {
  abstract processPayment(processOrderDto: ProcessOrderDto): Promise<IPaymentServiceDto>
}
