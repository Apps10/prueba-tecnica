import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract getById(user: string): Promise<User | null>;
}
