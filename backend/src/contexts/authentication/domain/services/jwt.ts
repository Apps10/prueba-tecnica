export abstract class JWTService {
  abstract sign(payload: { id }): Promise<string>;
  abstract verify(token: string): Promise<{id: string}>;
}