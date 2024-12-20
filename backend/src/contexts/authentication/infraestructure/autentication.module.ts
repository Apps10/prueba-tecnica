import { Module } from '@nestjs/common';
import { CreateUserController } from './api/create-user/create-user.controller';
import { CreateUserUseCase } from '../application/create-user/create-user-use-case';
import { LoginUserUseCase } from '../application/login-user/login-user.use-case';
import { UserRepository } from "../domain/repositories/user.repository"
import { LoginUserController } from './api/login-user/login-user.controller';
import { UserSchema } from './repositories/userSchema-prisma';

@Module({
  controllers: [
    CreateUserController,
    LoginUserController,
  ],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    {
      provide: UserRepository,
      useExisting: UserSchema,
    },
  ],
  exports: [
    CreateUserUseCase,
    LoginUserUseCase
  ],
})
export class PaymentModule {}
