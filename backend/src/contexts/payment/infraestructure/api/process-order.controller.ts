import { Controller, Post, Body, UseGuards, Res, NotFoundException } from '@nestjs/common';
import { ProcessOrderService } from '../../application/services/process-order/process-order.service';
import { ProcessOrderHttpDto } from './process-order.http-dto';
import { AuthGuard } from 'src/contexts/authentication/infraestructure/guards/AuthGuard';
import { User } from '../../../shared/decorators/user.decorator'
import { OrderNotFoundException } from 'src/contexts/order/domain/exceptions/order.exception';

@Controller('payment')
export class ProcessOrderController {
  constructor(private readonly processOrderUseCase: ProcessOrderService) {}

  @Post("/process")
  @UseGuards(AuthGuard)
  async processPayment(@User() customerId:string, @Body() processOrderHttpDto: ProcessOrderHttpDto) {
    // try{
      return await this.processOrderUseCase.execute(customerId, processOrderHttpDto);
    // }catch(error){
      // console.log(error);
      // if( error instanceof OrderNotFoundException ){
      //   return new NotFoundException()
      // }
      //OrderAlreadyProcessedException
      //throw new Error(error)
    // }
  }
}