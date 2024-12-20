import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserHttpDto } from './login-user.http-dto';
import { LoginUserUseCase } from 'src/contexts/authentication/application/login-user/login-user.use-case';

@Controller('user/login')
export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  @Post()
  async run(
    @Body() loginUserHttpDto: LoginUserHttpDto,
  ): Promise<{ token: string }> {
    return await this.loginUserUseCase.execute({
      ...loginUserHttpDto
    });
  }
}