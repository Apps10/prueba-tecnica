import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { User, PrimitiveUser } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<{ user: PrimitiveUser }> {
    const user = User.create(dto);

    await this.userRepository.create(user);

    return {
      user: user.toJson(),
    };
  }
}
