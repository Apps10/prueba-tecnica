export interface JWTService {
  sign(payload: { id }): Promise<string>;
  verify(password: string, hashed: string): Promise<boolean>;
}