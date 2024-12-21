import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { PrimitiveUser, User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserDto } from './register-user.dto';
import { PasswordHasher } from '../../domain/services/password-hasher';
import { JWTService } from '../../domain/services/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserAlreadyExistException } from '../../domain/exceptions/user.exceptions';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JWTService,
  ) {}

  async execute(dto: RegisterUserDto): Promise<{ token: string }> {
    const userExist = await this.userRepository.getByEmail(dto.email)
    
    if (userExist) {
      throw new UserAlreadyExistException()
    }
    
    const passwordHashed =  await this.passwordHasher.hash(dto.password)
    
    const user = new User({
      id: uuidv4(),
      ...dto,
      password: passwordHashed 
    })

    await this.userRepository.create(user);
    return {
      token: await this.jwtService.sign({ id: user.id })
    };
  }
}
