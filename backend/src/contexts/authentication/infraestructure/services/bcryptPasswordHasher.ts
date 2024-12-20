import { PasswordHasher } from "../../domain/services/password-hasher";
import * as bcrypt from "bcrypt"


export class BcryptPasswordHasherService implements PasswordHasher {
  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed)
  }

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt)
  }

}