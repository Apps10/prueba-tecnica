import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/contexts/authentication/application/create-user/create-user-use-case';
import { CreateUserHttpDto } from './create-user.http-dto';
import { PrimitiveUser } from 'src/contexts/authentication/domain/entities/user';

@Controller('user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async run(
    @Body() createUserHttpDto: CreateUserHttpDto,
  ): Promise<{ user: PrimitiveUser }> {
    return await this.createUserUseCase.execute({
      ...createUserHttpDto
    });
  }
}