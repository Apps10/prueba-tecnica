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
import { CheckAuthUserController } from './api/check-auth-user/check-auth-user.controller';
import { CheckAuthUserUseCase } from '../application/check-auth-user/check-auth-user.use-case';

@Module({
  controllers: [
    RegisterUserController, LoginUserController, CheckAuthUserController
  ],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    CheckAuthUserUseCase,
    UserPrismaSchema,
    BcryptPasswordHasherService,
    JwtAuthService,
    PrismaService,
    AuthGuard,
    {
      provide: LoginUserUseCase,
      useFactory: (repository: UserRepository, passwordHasher: PasswordHasher, jwtService: JWTService ) => 
        new LoginUserUseCase(repository, passwordHasher, jwtService),
      inject: [UserPrismaSchema, BcryptPasswordHasherService, JwtAuthService]
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (repository: UserRepository, passwordHasher: PasswordHasher, jwtService: JWTService ) => 
        new RegisterUserUseCase(repository, passwordHasher, jwtService),
      inject: [UserPrismaSchema, BcryptPasswordHasherService, JwtAuthService]
    },
    {
      provide: CheckAuthUserUseCase,
      useFactory: (repository: UserRepository) => 
        new CheckAuthUserUseCase(repository),
      inject: [UserPrismaSchema]
    },
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    AuthGuard,
    JwtAuthService,
  ],
})
export class AuthenticationModule {}
