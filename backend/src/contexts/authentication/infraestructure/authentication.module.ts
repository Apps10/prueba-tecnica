import { Module } from '@nestjs/common';
import { RegisterUserController } from './api/register-user/register-user.controller';
import { RegisterUserUseCase } from '../application/register-user/register-user-use-case';
import { LoginUserUseCase } from '../application/login-user/login-user.use-case';
import { LoginUserController } from './api/login-user/login-user.controller';
import { UserPrismaSchema } from './repositories/userSchema-prisma';
import { BcryptPasswordHasherService } from './services/bcryptPasswordHasher';
import { AuthGuard } from './guards/AuthGuard';
import { UserRepository } from '../domain/repositories/user.repository';
import { PasswordHasher } from '../domain/services/password-hasher';
import { JWTService } from '../domain/services/jwt';
import { JwtAuthService } from './services/JwtAuthService';
import { PrismaService } from 'src/contexts/shared/config/prisma-client';

@Module({
  controllers: [
    RegisterUserController, LoginUserController, 
  ],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    UserPrismaSchema,
    BcryptPasswordHasherService,
    JwtAuthService,
    PrismaService,
    AuthGuard,
    {
      provide: UserRepository,
      useExisting: UserPrismaSchema,
    },
    {
      provide: PasswordHasher,
      useExisting: BcryptPasswordHasherService,
    },
    {
      provide: JWTService,
      useExisting: JwtAuthService,
    },

  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    AuthGuard
  ],
})
export class AuthenticationModule {}
