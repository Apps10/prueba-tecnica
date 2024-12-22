import * as JWT from 'jsonwebtoken'
import envs from 'src/contexts/shared/config/envs';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

@Injectable()
export class JwtAuthService {
  constructor() {}

  public async sign(payload: { id: string; }): Promise<string> {
    return JWT.sign(payload, envs.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: "1hr"
    })    
  }

  public async verify(token: string): Promise<{ id: string; }> {
    const payload = await JWT.verify(token, envs.JWT_SECRET) 
    return payload as { id: string }
  }
}