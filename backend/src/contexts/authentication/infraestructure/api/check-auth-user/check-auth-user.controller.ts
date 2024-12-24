import { Body, Controller, Get, HttpCode, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CheckUserAuthHttpDto } from './check-auth-user.http-dto';
import { LoginUserUseCase } from 'src/contexts/authentication/application/login-user/login-user.use-case';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { UserUnauthorizedException } from 'src/contexts/authentication/domain/exceptions/user.exceptions';
import { AuthGuard } from '../../guards/AuthGuard';
import { User } from '../../decorators/user.decorator';
import { CheckAuthUserUseCase } from 'src/contexts/authentication/application/check-auth-user/check-auth-user.use-case';
import { UserToApiJSON } from 'src/contexts/authentication/domain/entities/user';
@Injectable()
@Controller('auth/check')
export class CheckAuthUserController {
  constructor(private checkUserAuthUseCase: CheckAuthUserUseCase) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async run(
    @User() userId
  ): Promise<{ user: UserToApiJSON }> {
    return await this.checkUserAuthUseCase.execute(userId);
  }
}