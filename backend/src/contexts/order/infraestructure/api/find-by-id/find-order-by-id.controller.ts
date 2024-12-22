import { CreateOrderUseCase } from "src/contexts/order/application/create-order/create-order-use-case";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { AuthGuard } from "src/contexts/authentication/infraestructure/guards/AuthGuard";
import { User } from "src/contexts/authentication/infraestructure/decorators/user.decorator";
import { Token } from "src/contexts/authentication/infraestructure/decorators/token.decorator";
import { FindOrderByIdHttpDto } from "./find-order-by-id.http-dto";
import { FindOrderByIdUseCase } from "src/contexts/order/application/find-by-id/find-order-by-id-use-case";

@Controller('order')
@Injectable()
export class FindOrderByIdController {
  constructor(private readonly findOrderByIdUseCase:FindOrderByIdUseCase){}

  @Get("/:id")
  @UseGuards(AuthGuard)
  async run(@Param() { id }: FindOrderByIdHttpDto, @User() customerId: string){
      return this.findOrderByIdUseCase.execute({id, customerId})
  }

}