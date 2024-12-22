import { UserToApiJSON } from "../../domain/entities/user";
import { UserUnauthorizedException  } from "../../domain/exceptions/user.exceptions";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JWTService } from "../../domain/services/jwt";
import { PasswordHasher } from "../../domain/services/password-hasher";
import { LoginUserDto } from "./login-user.dto";


export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JWTService
  ){}

  async execute(loginUserDto: LoginUserDto): Promise<{token: string, user: UserToApiJSON }> {
    const userExist = await this.userRepository.getByEmail(loginUserDto.email)

    if (
      !userExist || 
      !(await this.passwordHasher.compare(loginUserDto.password, userExist.password))
    ) {
      throw new UserUnauthorizedException(`password or email incorrect`)
    }

    return {
      token: await this.jwtService.sign({ id: userExist.id }),
      user: userExist.toApiJson()
    }

  }


}