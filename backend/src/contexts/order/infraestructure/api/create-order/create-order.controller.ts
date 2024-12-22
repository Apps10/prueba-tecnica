import { CreateOrderUseCase } from "src/contexts/order/application/create-order/create-order-use-case";
import { CreateOrderHttpDto } from "./create-order.http-dto";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { AuthGuard } from "src/contexts/authentication/infraestructure/guards/AuthGuard";
import { User } from "src/contexts/authentication/infraestructure/decorators/user.decorator";
import { Token } from "src/contexts/authentication/infraestructure/decorators/token.decorator";

@Controller('order')
@Injectable()
export class CreateOrderController {
  constructor(private readonly createOrderUseCase:CreateOrderUseCase){}

  @Post()
  @UseGuards(AuthGuard)
  async run(@Body() createOrderHttpDto: CreateOrderHttpDto, @User() userId: string){
      return this.createOrderUseCase.execute(createOrderHttpDto, userId)
  }

}