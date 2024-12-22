import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { LoginUserHttpDto } from './login-user.http-dto';
import { LoginUserUseCase } from 'src/contexts/authentication/application/login-user/login-user.use-case';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { UserUnauthorizedException } from 'src/contexts/authentication/domain/exceptions/user.exceptions';
@Injectable()
@Controller('auth/login')
export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  @Post()
  @HttpCode(200)
  async run(
    @Body() loginUserHttpDto: LoginUserHttpDto,
  ): Promise<{ token: string }> {
    return await this.loginUserUseCase.execute({
      ...loginUserHttpDto
    });
  }
}