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
    try{
      return await this.registerUserUseCase.execute({
        ...registerUserHttpDto,
      });
    } catch(error){
      if (
        error instanceof UserAlreadyExistException ||
        error instanceof UserNotFoundException
      ) {
        throw new BadRequestException(error)
      }
      if (error instanceof UserUnauthorizedException){
        throw new UnauthorizedException(error)
      }

      throw new Error(error)
    }
  }
}
