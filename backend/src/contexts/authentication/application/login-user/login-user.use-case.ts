import { UnauthorizedException } from "../../domain/exceptions/user.exceptions";
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

  async excecute(loginUserDto: LoginUserDto): Promise<{token: string }> {
    const userExist = await this.userRepository.getByEmail(loginUserDto.email)

    if(!userExist) throw new UnauthorizedException(`password or email incorrect`)
    
    const { password: passwordEncripted, id } =  userExist.toJson()

    if(!this.passwordHasher.compare(loginUserDto.password, passwordEncripted)) {
      throw new UnauthorizedException(`password or email incorrect`)
    }

    return {
      token: await this.jwtService.sign({ id })
    }

  }


}