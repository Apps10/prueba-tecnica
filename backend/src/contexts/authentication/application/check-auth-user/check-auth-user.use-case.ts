import { UserToApiJSON } from "../../domain/entities/user";
import { UserNotFoundException, UserUnauthorizedException  } from "../../domain/exceptions/user.exceptions";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JWTService } from "../../domain/services/jwt";
import { PasswordHasher } from "../../domain/services/password-hasher";
import { LoginUserDto } from "./check-auth-user.dto";


export class CheckAuthUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ){}

  async execute(userId: string): Promise<{ user: UserToApiJSON  }>  {
    const user = await this.userRepository.getById(userId)

    if(!user) throw new UserUnauthorizedException()

    return {
      user: user.toApiJson()
    }

  }


}