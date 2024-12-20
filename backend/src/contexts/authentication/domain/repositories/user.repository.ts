import { User } from '../entities/user';

export interface UserRepository {
  create(user: User): Promise<void>;
  getByEmail(email: string): Promise<User | null>;
}
