import {  BadRequestException , Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/contexts/authentication/application/register-user/register-user-use-case';
import { RegisterUserHttpDto } from './register-user.http-dto';
import {  PrimitiveUser } from 'src/contexts/authentication/domain/entities/user';
import { UserUnauthorizedException, UserAlreadyExistException, UserNotFoundException } from 'src/contexts/authentication/domain/exceptions/user.exceptions';

@Controller('auth/signin')
export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async run(
    @Body() registerUserHttpDto: RegisterUserHttpDto,
  ): Promise<{ token: string }> {
      return await this.registerUserUseCase.execute({
        ...registerUserHttpDto,
      });
    
  }
}
